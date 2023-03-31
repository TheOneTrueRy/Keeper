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
  }
}