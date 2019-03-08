namespace Domain.Models
{
    public class Material
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public uint Quantity { get; set; }

        public int GoalId { get; set; }
        public Goal Goal { get; set; }
    }
}
