using Microsoft.EntityFrameworkCore;

namespace Domain.Models
{
    public class Servant
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public DbSet<Goal> Goals { get; set; }
    }
}
