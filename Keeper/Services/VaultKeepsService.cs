namespace Keeper.Services
{
  public class VaultKeepsService
  {
    private readonly VaultKeepsRepository _repo;
    private readonly VaultsService vaultsService;
    private readonly KeepsService keepsService;

    public VaultKeepsService(VaultKeepsRepository repo, VaultsService vaultsService, KeepsService keepsService)
    {
      _repo = repo;
      this.vaultsService = vaultsService;
      this.keepsService = keepsService;
    }

    internal VaultKeep CreateVaultKeep(VaultKeep vaultKeepData)
    {
      Vault vault = vaultsService.GetOneVault(vaultKeepData.VaultId, vaultKeepData.CreatorId);
      if (vault.CreatorId != vaultKeepData.CreatorId)
      {
        throw new Exception("You can't add a keep to a vault that isn't yours!");
      }
      VaultKeep vaultKeep = _repo.CreateVaultKeep(vaultKeepData);
      return vaultKeep;
    }

    internal VaultKeep GetOneVaultKeep(int id)
    {
      VaultKeep vaultKeep = _repo.GetOneVaultKeep(id);
      return vaultKeep;
    }

    internal string DeleteVaultKeep(int id, string userId)
    {
      VaultKeep vaultKeep = this.GetOneVaultKeep(id);
      if (vaultKeep.CreatorId != userId)
      {
        throw new Exception("That's not your vaulted keep to delete!");
      }
      bool result = _repo.DeleteVaultKeep(id);
      if (!result)
      {
        throw new Exception("Something went wrong trying to delete that keep from your vault!");
      }
      return "Keep successfully deleted from your vault!";
    }
  }
}