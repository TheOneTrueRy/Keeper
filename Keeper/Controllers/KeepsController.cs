namespace Keeper.Controllers
{
  [ApiController]
  [Route("api/[controller]")]
  public class KeepsController : ControllerBase
  {
    private readonly KeepsService keepsService;
    private readonly Auth0Provider _auth;

    public KeepsController(KeepsService keepsService, Auth0Provider auth)
    {
      this.keepsService = keepsService;
      _auth = auth;
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Keep>> CreateKeep([FromBody] Keep keepData)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        keepData.CreatorId = userInfo.Id;
        Keep keep = keepsService.CreateKeep(keepData);
        keep.Creator = userInfo;
        return Ok(keep);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet]
    public ActionResult<List<Keep>> GetAllKeeps()
    {
      try
      {
        List<Keep> keeps = keepsService.GetAllKeeps();
        return Ok(keeps);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Keep>> GetOneKeep(int id)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        Keep keep = keepsService.GetOneKeep(id, userInfo?.Id);
        return Ok(keep);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<ActionResult<Keep>> UpdateKeep([FromBody] Keep keepData, int id)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        keepData.CreatorId = userInfo.Id;
        keepData.Id = id;
        Keep keep = keepsService.UpdateKeep(keepData);
        return Ok(keep);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<ActionResult<string>> DeleteKeep(int id)
    {
      try
      {
        Account userInfo = await _auth.GetUserInfoAsync<Account>(HttpContext);
        string message = keepsService.DeleteKeep(id, userInfo.Id);
        return Ok(message);
      }
      catch (Exception e)
      {
        return BadRequest(e.Message);
      }
    }
  }
}