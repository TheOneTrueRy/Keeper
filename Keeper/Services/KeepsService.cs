namespace Keeper.Services
{
  public class KeepsService
  {
    private readonly KeepsRepository _repo;

    public KeepsService(KeepsRepository repo)
    {
      _repo = repo;
    }

    internal Keep CreateKeep(Keep keepData)
    {
      Keep keep = _repo.CreateKeep(keepData);
      return keep;
    }

    internal List<Keep> GetAllKeeps()
    {
      List<Keep> keeps = _repo.GetAllKeeps();
      return keeps;
    }

    internal Keep GetOneKeep(int id, string userId)
    {
      Keep keep = _repo.GetOneKeep(id);
      if (keep == null)
      {
        throw new Exception("There is no keep at that Id!");
      }
      if (keep.CreatorId != userId)
      {
        keep.Views++;
        _repo.UpdateKeep(keep);
      }
      return keep;
    }

    internal Keep UpdateKeep(Keep keepData)
    {
      Keep original = this.GetOneKeep(keepData.Id, keepData.CreatorId);
      original.Name = keepData.Name != null ? keepData.Name : original.Name;
      original.Description = keepData.Description != null ? keepData.Description : original.Description;
      original.Img = keepData.Img != null ? keepData.Img : original.Img;
      _repo.UpdateKeep(original);
      return original;
    }
  }
}