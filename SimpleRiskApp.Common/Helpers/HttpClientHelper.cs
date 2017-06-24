using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Text;
using System.Threading.Tasks;

namespace SimpleRiskApp.Common.Helpers
{
    public class HttpClientHelper : IDisposable, IHttpClientHelper
    {
        private IJsonMapper _jsonMapper;

        public HttpClientHelper(IJsonMapper jsonMapper)
        {
            _jsonMapper = jsonMapper;
        }

        bool disposed;
        protected virtual void Dispose(bool disposing)
        {
            if (!disposed)
            {
                if (disposing)
                {
                    if (_hcHelper != null)
                    {
                        _hcHelper.Dispose();
                    }

                    if (HcHelper != null)
                    {
                        HcHelper.Dispose();
                    }
                }

                disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        HttpClient _hcHelper;
        public HttpClient HcHelper
        {
            get
            {
                if (_hcHelper != null)
                {
                    if (!string.IsNullOrEmpty(AuthenticationToken) && !string.IsNullOrEmpty(AuthenticationPrefix))
                    {
                        _hcHelper.DefaultRequestHeaders.Authorization = new AuthenticationHeaderValue(AuthenticationPrefix, AuthenticationToken);
                    }
                    return _hcHelper;
                }

                _hcHelper = new HttpClient();
                _hcHelper.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
                _hcHelper.Timeout = new TimeSpan(0, 0, 120);

                _hcHelper.DefaultRequestHeaders.Authorization = (!string.IsNullOrEmpty(AuthenticationToken) && !string.IsNullOrEmpty(AuthenticationPrefix)) ?
                new AuthenticationHeaderValue(AuthenticationPrefix, AuthenticationToken) :
                new AuthenticationHeaderValue("Basic", "MjAwMDE2NDI4NTo1NDZEQjhGOTAwN0RDNjA2");

                return _hcHelper;
            }
            set
            {
                _hcHelper = value;
            }
        }

        public string AuthenticationPrefix { get; set; }
        public string AuthenticationToken { get; set; }


        public async Task<T> Get<T>(string url) where T : class
        {
            try
            {
                if (!string.IsNullOrWhiteSpace(url))
                {
                    var result = await HcHelper.GetAsync(url).Result.Content.ReadAsStringAsync();
                    return _jsonMapper.MapFromJson<T>(result);
                }

                return default(T);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message, ex.InnerException);
            }
        }


    }
}
