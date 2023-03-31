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
    internal string DeleteKeep(int id, string userId)
    {
      Keep keep = this.GetOneKeep(id, userId);
      if (keep.CreatorId != userId)
      {
        throw new Exception("Hey, that's not your Keep!");
      }
      bool result = _repo.DeleteKeep(id);
      if (!result)
      {
        throw new Exception($"Something went wrong trying to delete the {keep.Name} Keep at the {keep.Id} Id. Dang.");
      }
      return $"Successfully deleted the {keep.Name} keep!";
    }
  }
}