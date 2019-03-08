using Microsoft.EntityFrameworkCore;

namespace Domain.Models
{
    public class Goal
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DbSet<Material> Materials { get; set; }

        public int ServantId { get; set; }
        public Servant Servant { get; set; }
    }
}
