using System;
using System.ComponentModel.DataAnnotations;
using Microsoft.EntityFrameworkCore;

namespace Domain.Entities
{
    public class Goal
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [MaxLength(50)]
        public string Name { get; set; }

        public int Servant_Id { get; set; }
        public Servant Servant { get; set; }

        public DbSet<Item> Items { get; set; }
    }
}