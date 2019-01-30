using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Common.Models
{
    public class Servant
    {
        public string Name { get; set; }
        public Goal[] Goals { get; set; }
        
        public Servant()
        {
            Goals = new Goal[0];
        }
    }
}
