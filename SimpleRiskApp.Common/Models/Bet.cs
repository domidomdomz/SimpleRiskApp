using System;
using System.Collections.Generic;
using System.Text;

namespace SimpleRiskApp.Common.Models
{
    public class Bet
    {
        public int Customer { get; set; }
        public int Event { get; set; }
        public int Participant { get; set; }
        public decimal Stake { get; set; }
    }
}
