using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.EntityFrameworkCore;
using Domain.Entities;

namespace Domain
{
    public class FGODomainContext : DbContext
    {
        public DbSet<Servant> Servants;
        public DbSet<Goal> Goals;
        public DbSet<Item> Items;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                // TODO: Move connection to config
                optionsBuilder.UseSqlServer(@"CONNECTION_STRING");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Servant>(entity =>
            {
                entity.HasAlternateKey(e => e.Name);

                entity.HasMany(s => s.Goals)
                    .WithOne(g => g.Servant)
                    .HasForeignKey(g => g.Servant_Id)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Goal_Servant");
            });

            modelBuilder.Entity<Goal>(entity =>
            {
                entity.HasAlternateKey(e => new { e.Name, e.Servant_Id });

                entity.HasMany(g => g.Items)
                    .WithOne(i => i.Goal)
                    .HasForeignKey(i => i.Goal_Id)
                    .OnDelete(DeleteBehavior.Restrict)
                    .HasConstraintName("FK_Item_Goal");
            });

            modelBuilder.Entity<Item>(entity =>
            {
                entity.HasAlternateKey(e => new { e.Name, e.Goal_Id });
            });
        }
    }
}