namespace Keeper.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class VaultsController : ControllerBase
  {
    private readonly VaultsService vaultsService;
    private readonly Auth0Provider _auth;

    public VaultsController(VaultsService vaultsService, Auth0Provider auth)
    {
      this.vaultsService = vaultsService;
      _auth = auth;
    }
  }
}