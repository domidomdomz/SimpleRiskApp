using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.TestTools.UnitTesting;
using Moq;
using SimpleRiskApp.Business;
using SimpleRiskApp.Common.Models;
using SimpleRiskApp.Service.Controllers;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace SimpleRiskApp.Service.Tests
{
    [TestClass]
    public class BetHistoryControllerTest
    {
        private Mock<IBetHistoryLogic> _betHistoryLogic;
        [TestInitialize]
        public void TestInit()
        {
            _betHistoryLogic = new Mock<IBetHistoryLogic>();
        }

        [TestMethod]
        public void ShouldReturnBetHistorySuccessfully()
        {
            //Arrange
            var mockResult = GetMockResult();

            _betHistoryLogic.Setup(x => x.GetBetHistory()).Returns(Task.FromResult(mockResult));

            var controller = new BetHistoryController(_betHistoryLogic.Object);

            //Act
            var result = controller.Get();

            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(JsonResult));
        }

        [TestMethod]
        public void ShouldThrowBadRequestIfLogicLayerReturnsNull()
        {
            //Arrange
            var mockResult = GetMockResult();

            _betHistoryLogic.Setup(x => x.GetBetHistory()).Returns(Task.FromResult<List<BetHistory>>(null));

            var controller = new BetHistoryController(_betHistoryLogic.Object);

            //Act
            var result = controller.Get();
            var badRequestResult = result as BadRequestObjectResult;
            
            //Assert
            Assert.IsNotNull(result);
            Assert.IsInstanceOfType(result, typeof(BadRequestObjectResult));
            Assert.AreEqual(badRequestResult.StatusCode, 400);
            Assert.AreEqual(badRequestResult.Value, "Failed to get Bet History.");
        }

        #region Private Methods
        private List<BetHistory> GetMockResult()
        {
            var settledBets = new List<SettledBet>
            {
                new SettledBet { Customer = 1, Event = 1, Participant = 10, Stake = 10, Win = 0},
                new SettledBet { Customer = 1, Event = 1, Participant = 10, Stake = 5, Win = 0},
                new SettledBet { Customer = 1, Event = 2, Participant = 15, Stake = 10, Win = 12}
            };

            var unsettledBets = new List<UnsettledBet>
            {
                new UnsettledBet { Customer = 1, Event = 1, Participant = 10, Stake = 10, ToWin = 11},
                new UnsettledBet { Customer = 1, Event = 1, Participant = 10, Stake = 5, ToWin = 6},
                new UnsettledBet { Customer = 1, Event = 2, Participant = 15, Stake = 10, ToWin = 12}
            };

            var result = new List<BetHistory>()
            {
               new BetHistory
               {
                   Customer = 1,
                   RiskStatus = 2,
                   SettledBets = settledBets,
                   UnsettledBets = unsettledBets
               },
               new BetHistory
               {
                   Customer = 2,
                   RiskStatus = 1,
                   SettledBets = settledBets,
                   UnsettledBets = unsettledBets
               }
            };

            return result;
        }
        #endregion

    }
}
