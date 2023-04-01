namespace Keeper.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class ProfilesController : ControllerBase
  {
    private readonly ProfilesService profilesService;
    private readonly Auth0Provider _auth;

    public ProfilesController(ProfilesService profilesService, Auth0Provider auth)
    {
      this.profilesService = profilesService;
      _auth = auth;
    }

    [HttpGet("{id}")]
    public ActionResult<Profile> GetProfile(string id)
    {
      try
      {
        Profile profile = profilesService.GetProfile(id);
        return Ok(profile);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{id}/keeps")]
    public ActionResult<List<Keep>> GetUsersKeeps(string id)
    {
      try
      {
        List<Keep> keeps = profilesService.GetUsersKeeps(id);
        return keeps;
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{id}/vaults")]
    public ActionResult<List<Vault>> GetUsersVaults(string id)
    {
      try
      {
        List<Vault> vaults = profilesService.GetUsersVaults(id);
        return vaults;
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}