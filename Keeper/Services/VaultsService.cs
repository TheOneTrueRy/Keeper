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
  }
}