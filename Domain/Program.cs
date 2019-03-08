using Microsoft.EntityFrameworkCore;
using System;

namespace Domain
{
    internal class Program
    {
        private static void Main(string[] args)
        {
            var context = new FGODomainContext();
            context.Database.Migrate();
        }
    }
}