using Microsoft.Extensions.Configuration;
using SimpleRiskApp.Common.Helpers;
using SimpleRiskApp.Common.Models;
using System.Linq;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleRiskApp.Business
{
    public class BetHistoryLogic : IBetHistoryLogic
    {
        private IConfiguration _configuration;
        private IHttpClientHelper _httpClientHelper;

        public BetHistoryLogic(IConfiguration configuration, IHttpClientHelper httpClientHelper)
        {
            _configuration = configuration;
            _httpClientHelper = httpClientHelper;
        }

        public async Task<List<BetHistory>> GetBetHistory()
        {
            var whBetsApiUrl = _configuration.GetValue<string>("WhBetsApiUrl");
            var settledBets = await _httpClientHelper.Get<List<SettledBet>>($"{whBetsApiUrl}settled");
            var unsettledBets = await _httpClientHelper.Get<List<UnsettledBet>>($"{whBetsApiUrl}unsettled");

            var settledBetHistory = settledBets.GroupBy(x => x.Customer).Select(bet => new BetHistory { Customer = bet.Key, SettledBets = bet.ToList() }).ToList();
            var unsettledBetHistory = unsettledBets.GroupBy(x => x.Customer).Select(bet => new BetHistory { Customer = bet.Key, UnsettledBets = bet.ToList() }).ToList();

            var betHistoryMerged = (from settled in settledBetHistory
                                    join unsettled in unsettledBetHistory on settled.Customer equals unsettled.Customer
                                    select new BetHistory
                                    {
                                        Customer = settled.Customer,
                                        RiskStatus = 0,
                                        SettledBets = settled.SettledBets,
                                        UnsettledBets = unsettled.UnsettledBets
                                    }).ToList();




            betHistoryMerged.ForEach(customerBetHistory =>
            {
                var averageStakeSettledBets = customerBetHistory.SettledBets.Average(settledBet => settledBet.Stake);
                var averageStakeUnsettledBets = customerBetHistory.UnsettledBets.Average(settledBet => settledBet.Stake);
                var averageStake = (averageStakeSettledBets + averageStakeUnsettledBets) / 2;

                if (IsWinningUnusualRate(customerBetHistory.SettledBets))
                    customerBetHistory.RiskStatus += 1;

                if (HasUnusuallyHighStake(customerBetHistory.UnsettledBets, averageStake * 10))
                    customerBetHistory.RiskStatus += 1;

                if (HasUnusuallyHighStake(customerBetHistory.UnsettledBets, averageStake * 30))
                    customerBetHistory.RiskStatus += 2;

                if (HasBetWithHighPotentialWinning(customerBetHistory.UnsettledBets))
                    customerBetHistory.RiskStatus += 1;

            });

            return betHistoryMerged;
        }

        private bool IsWinningUnusualRate(List<SettledBet> settledBetHistory)
        {
            var totalSettledBets = settledBetHistory.Count();
            var totalWins = settledBetHistory.Where(bet => bet.Win > 0).Count();

            var winPercentage = totalSettledBets > 0 ? (((decimal)totalWins / totalSettledBets) * 100) : 0;

            return winPercentage > decimal.Parse("60");
        }

        private bool HasUnusuallyHighStake(List<UnsettledBet> unsettledBetHistory, decimal averageStake)
        {
            return unsettledBetHistory.Where(x => x.Stake > averageStake).Count() > 0;
        }

        private bool HasBetWithHighPotentialWinning(List<UnsettledBet> unsettledBetHistory)
        {
            return unsettledBetHistory.Where(bet => bet.ToWin >= 1000).Count() > 0;
        }
    }
}
