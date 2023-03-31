namespace Keeper.Services
{
  public class VaultsService
  {
    private readonly VaultsRepository _repo;

    public VaultsService(VaultsRepository repo)
    {
      _repo = repo;
    }

    internal Vault CreateVault(Vault vaultData)
    {
      Vault vault = _repo.CreateVault(vaultData);
      return vault;
    }


    internal Vault GetOneVault(int id, string userId)
    {
      Vault vault = _repo.GetOneVault(id);
      if (vault.isPrivate == true && vault.CreatorId != userId)
      {
        throw new Exception("No vault found at that Id");
      }
      if (vault == null)
      {
        throw new Exception("No vault found at that Id");
      }
      return vault;
    }

    internal Vault UpdateVault(Vault vaultData)
    {
      Vault original = this.GetOneVault(vaultData.Id, vaultData.CreatorId);
      if (original.CreatorId != vaultData.CreatorId)
      {
        throw new Exception("That's not your vault to edit!");
      }
      original.Name = vaultData.Name != null ? vaultData.Name : original.Name;
      original.Description = vaultData.Description != null ? vaultData.Description : original.Description;
      original.Img = vaultData.Img != null ? vaultData.Img : original.Img;
      original.isPrivate = vaultData.isPrivate != null ? vaultData.isPrivate : original.isPrivate;
      _repo.UpdateVault(original);
      return original;
    }
    internal string DeleteVault(int id, string userId)
    {
      Vault vault = this.GetOneVault(id, userId);
      if (userId != vault.CreatorId)
      {
        throw new Exception("That's not your vault!");
      }
      bool result = _repo.DeleteVault(id);
      if (!result)
      {
        throw new Exception($"Something went wrong trying to delete the {vault.Name} vault at the {vault.Id} Id.");
      }
      return $"Successfully deleted the {vault.Name} vault!";
    }
  }
}