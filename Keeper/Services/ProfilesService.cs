namespace Keeper.Services
{
  public class ProfilesService
  {
    private readonly ProfilesRepository _repo;

    public ProfilesService(ProfilesRepository repo)
    {
      _repo = repo;
    }

    internal Profile GetProfile(string id)
    {
      Profile profile = _repo.GetProfile(id);
      return profile;
    }

    internal List<Vault> GetUsersVaults(string id)
    {
      List<Vault> vaults = _repo.GetUsersVaults(id);
      return vaults;
    }


    internal List<Keep> GetUsersKeeps(string id)
    {
      List<Keep> keeps = _repo.GetUsersKeeps(id);
      return keeps;
    }
  }
}