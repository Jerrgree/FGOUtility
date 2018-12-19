using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using FGOUtility.Models;
using Microsoft.AspNetCore.Authorization;

namespace FGOUtility.Controllers
{
    

    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DataController : ControllerBase
    {
        private const string file = "Data/data.json";

        [HttpGet("[action]")]
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

        [HttpPost("[action]")]
        public async Task Save(Data data)
        {
            var content = JsonConvert.SerializeObject(data, Formatting.Indented);

            await System.IO.File.WriteAllTextAsync(file, content);
        }

        [HttpGet("[action]")]
        public ActionResult Nuke()
        {
            System.IO.File.Delete(file);

            return Ok();
        }
    }
}