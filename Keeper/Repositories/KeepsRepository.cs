namespace Keeper.Repositories
{
  public class KeepsRepository
  {

    private readonly IDbConnection _db;

    public KeepsRepository(IDbConnection db)
    {
      _db = db;
    }

    internal Keep CreateKeep(Keep keepData)
    {
      string sql = @"
      INSERT INTO keeps
      (creatorId, name, description, img)
      VALUES
      (@creatorId, @name, @description, @img);
      SELECT LAST_INSERT_ID();
      ";
      int id = _db.ExecuteScalar<int>(sql, keepData);
      keepData.Id = id;
      return keepData;
    }

    internal List<Keep> GetAllKeeps()
    {
      string sql = @"
      SELECT
      keep.*,
      COUNT(vk.id) AS kept,
      acct.*
      FROM keeps keep
      LEFT JOIN vaultkeeps vk ON vk.keepId = keep.id
      JOIN accounts acct ON keep.creatorId = acct.id
      GROUP BY keep.id;
      ";
      List<Keep> keeps = _db.Query<Keep, Profile, Keep>(sql, (keep, profile) =>
      {
        keep.Creator = profile;
        return keep;
      }).ToList();
      return keeps;
    }

    internal Keep GetOneKeep(int id)
    {
      string sql = @"
      SELECT
      keep.*,
      COUNT(vk.id) AS kept,
      acct.*
      FROM keeps keep
      LEFT JOIN vaultkeeps vk ON vk.keepId = keep.id
      JOIN accounts acct on keep.creatorId = acct.id
      WHERE keep.id = @id
      GROUP BY keep.id;
      ";
      Keep keep = _db.Query<Keep, Profile, Keep>(sql, (keep, profile) =>
      {
        keep.Creator = profile;
        return keep;
      }, new { id }).FirstOrDefault();
      return keep;
    }

    internal int UpdateKeep(Keep keepData)
    {
      string sql = @"
      UPDATE keeps
      SET

      name = @name,
      description = @description,
      img = @img,
      views = @views

      WHERE id = @id;
      ";
      int rows = _db.Execute(sql, keepData);
      return rows;
    }

    internal bool DeleteKeep(int id)
    {
      string sql = @"
      DELETE FROM keeps WHERE id = @id;
      ";
      int rows = _db.Execute(sql, new { id });
      return rows == 1;
    }
  }
}