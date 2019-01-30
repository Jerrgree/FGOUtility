using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Common.Models;

namespace Common.Interfaces
{
    public interface IData
    {
        Task<Data> Load();

        Task Save(Data data);
    }
}
