using System.Threading.Tasks;

namespace SimpleRiskApp.Common.Helpers
{
    public interface IHttpClientHelper
    {
        Task<T> Get<T>(string url) where T : class;
    }
}
