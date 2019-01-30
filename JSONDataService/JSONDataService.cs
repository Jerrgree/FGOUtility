using System;
using System.Threading.Tasks;
using Common.Interfaces;
using Common.Models;
using Newtonsoft.Json;

namespace JSONDataService
{
    public class JSONDataService : IData
    {
        private readonly string file;

        public JSONDataService()
        {
            file = "Data/data.json";
        }

        public JSONDataService(string file)
        {
            this.file = file;
        }

        public async Task<Data> Load()
        {
            if (System.IO.File.Exists(file))
            {
                var content = await System.IO.File.ReadAllTextAsync(file);

                return JsonConvert.DeserializeObject<Data>(content);
            }
            else
            {
                return new Data();
            }
        }

        public async Task Save(Data data)
        {
            var content = JsonConvert.SerializeObject(data, Formatting.Indented);

            await System.IO.File.WriteAllTextAsync(file, content);
        }
    }
}
