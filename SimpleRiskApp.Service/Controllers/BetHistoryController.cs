using System;
using Microsoft.AspNetCore.Mvc;
using SimpleRiskApp.Business;
using Microsoft.AspNetCore.Cors;

namespace SimpleRiskApp.Service.Controllers
{
    [EnableCors("AllowAnyPolicy")]
    [Route("api/[controller]")]
    public class BetHistoryController : Controller
    {
        private IBetHistoryLogic _betHistoryLogic;
        public BetHistoryController(IBetHistoryLogic betHistoryLogic)
        {
            _betHistoryLogic = betHistoryLogic;
        }

        // GET api/bethistory
        [HttpGet]
        public ActionResult Get()
        {
            try
            {
                var betHistory = _betHistoryLogic.GetBetHistory().GetAwaiter().GetResult();

                if (betHistory == null)
                {
                    return BadRequest("Failed to get Bet History.");
                }

                return Json(betHistory);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
