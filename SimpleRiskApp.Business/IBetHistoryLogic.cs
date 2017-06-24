using SimpleRiskApp.Common.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleRiskApp.Business
{
    public interface IBetHistoryLogic
    {
        Task<List<BetHistory>> GetBetHistory();
    }
}