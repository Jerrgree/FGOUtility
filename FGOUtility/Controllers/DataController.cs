using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Common.Models;
using Common.Interfaces;
using Microsoft.AspNetCore.Authorization;
using JSONDataService;

namespace FGOUtility.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class DataController : ControllerBase
    {
        IData DataService;
        
        public DataController()
        {
            DataService = new JSONDataService.JSONDataService();
        }

        [HttpGet("[action]")]
        public async Task<Data> Load()
        {
            return await DataService.Load();
        }

        [HttpPost("[action]")]
        public async Task Save(Data data)
        {
            await DataService.Save(data);
        }
    }
}