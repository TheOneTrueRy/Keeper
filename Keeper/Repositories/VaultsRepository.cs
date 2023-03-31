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
  }
}