using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace FGOUtility.Models
{
    public class Data
    {
        public Dictionary<string, int> Inventory { get; set; }
        public Servant[] Servants { get; set; }

        public Data()
        {
            Inventory = new Dictionary<string, int>();
            Servants = new Servant[0];
        }
    }
}
