using System;
using System.Collections.Generic;
using System.Text;

namespace SimpleRiskApp.Common.Models
{
    public class BetHistory
    {
        public int Customer { get; set; }
        public int RiskStatus { get; set; }
        public List<SettledBet> SettledBets { get; set; }
        public List<UnsettledBet> UnsettledBets { get; set; }
    }
}
