namespace Keeper.Repositories
{
  public class VaultsRepository
  {

    private readonly IDbConnection _db;

    public VaultsRepository(IDbConnection db)
    {
      _db = db;
    }

    internal Vault CreateVault(Vault vaultData)
    {
      string sql = @"
      INSERT INTO vaults
      (creatorId, name, description, img, isPrivate)
      VALUES
      (@creatorId, @name, @description, @img, @isPrivate);
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, vaultData);
      vaultData.Id = id;
      return vaultData;
    }


    internal Vault GetOneVault(int id)
    {
      string sql = @"
      SELECT
      vault.*,
      acct.*
      FROM vaults vault
      JOIN accounts acct ON vault.creatorId = acct.id
      WHERE vault.id = @id;
      ";
      Vault vault = _db.Query<Vault, Profile, Vault>(sql, (vault, profile) =>
      {
        vault.Creator = profile;
        return vault;
      }, new { id }).FirstOrDefault();
      return vault;
    }

    internal int UpdateVault(Vault original)
    {
      string sql = @"
      UPDATE vaults
      SET
      name = @name,
      description = @description,
      img = @img,
      isPrivate = @isPrivate
      WHERE id = @id;
      ";
      int rows = _db.Execute(sql, original);
      return rows;
    }
    internal bool DeleteVault(int id)
    {
      string sql = @"
      DELETE FROM vaults WHERE id = @id;
      ";
      int rows = _db.Execute(sql, new { id });
      return rows == 1;
    }

    internal List<VaultedKeep> GetKeepsInVault(int vaultId)
    {
      string sql = @"
      SELECT
      k.*,
      vk.*,
      creator.*
      FROM vaultkeeps vk
      JOIN keeps k ON  vk.keepId = k.id
      JOIN accounts creator ON k.creatorId = creator.id
      WHERE vk.vaultId = @vaultId;
      ";
      List<VaultedKeep> vaultedKeeps = _db.Query<VaultedKeep, VaultKeep, Profile, VaultedKeep>(sql, (vaultedKeep, vaultKeep, creator) =>
      {
        vaultedKeep.VaultKeepId = vaultKeep.Id;
        vaultedKeep.Creator = creator;
        return vaultedKeep;
      }, new { vaultId }).ToList();
      return vaultedKeeps;
    }
  }
}