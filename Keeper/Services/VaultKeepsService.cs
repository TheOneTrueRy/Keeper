namespace Keeper.Services
{
  public class VaultKeepsService
  {
    private readonly VaultKeepsRepository _repo;
    private readonly VaultsService vaultsService;

    public VaultKeepsService(VaultKeepsRepository repo, VaultsService vaultsService)
    {
      _repo = repo;
      this.vaultsService = vaultsService;
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
  }
}