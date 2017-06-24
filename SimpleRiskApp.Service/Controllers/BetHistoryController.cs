using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace SimpleRiskApp.Service.Controllers
{
    [Route("api/[controller]")]
    public class BetHistoryController : Controller
    {
        public BetHistoryController()
        {

        }

        // GET api/bethistory
        [HttpGet]
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

    }
}
