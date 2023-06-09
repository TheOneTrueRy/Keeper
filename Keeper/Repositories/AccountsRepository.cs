namespace Keeper.Repositories;

public class AccountsRepository
{
  private readonly IDbConnection _db;

  public AccountsRepository(IDbConnection db)
  {
    _db = db;
  }

  internal Account GetByEmail(string userEmail)
  {
    string sql = "SELECT * FROM accounts WHERE email = @userEmail";
    return _db.QueryFirstOrDefault<Account>(sql, new { userEmail });
  }

  internal Account GetById(string id)
  {
    string sql = "SELECT * FROM accounts WHERE id = @id";
    return _db.QueryFirstOrDefault<Account>(sql, new { id });
  }

  internal Account Create(Account newAccount)
  {
    string sql = @"
            INSERT INTO accounts
              (name, picture, email, id)
            VALUES
              (@Name, @Picture, @Email, @Id)";
    _db.Execute(sql, newAccount);
    return newAccount;
  }

  internal int Edit(Account update)
  {
    string sql = @"
            UPDATE accounts
            SET 
              name = @Name,
              picture = @Picture,
              coverImage = @CoverImage
            WHERE id = @Id;";
    int rows = _db.Execute(sql, update);
    return rows;
  }

  internal List<Vault> GetMyVaults(string userId)
  {
    string sql = @"
      SELECT
      *
      FROM vaults
      WHERE creatorId = @userId;
      ";
    List<Vault> vaults = _db.Query<Vault>(sql, new { userId }).ToList();
    return vaults;
  }
}

