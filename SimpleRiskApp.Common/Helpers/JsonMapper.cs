using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Linq;
using System.Collections.Generic;
using System.IO;

namespace SimpleRiskApp.Common.Helpers
{
    public class JsonMapper : IJsonMapper
    {
        private static JsonReader CreateReader(string json, string parentToken)
        {
            if (string.IsNullOrEmpty(parentToken))
            {
                return new JsonTextReader(new StringReader(json));
            }
            else
            {
                var token = JToken.Parse(json).SelectToken(parentToken);
                return token == null ? null : token.CreateReader();
            }
        }

        public List<T> MapCollectionFromJson<T>(string json, string token = "data")
        {
            var list = new List<T>();

            var jObject = JObject.Parse(json);

            var allTokens = jObject.SelectToken(token);

            foreach (var tkn in allTokens)
            {
                list.Add(MapFromJson<T>(tkn.ToString()));
            }

            return list;
        }

        public T MapFromJson<T>(string json, string parentToken = null)
        {
            var settings = new JsonSerializerSettings
            {
                NullValueHandling = NullValueHandling.Ignore,
                DefaultValueHandling = DefaultValueHandling.IgnoreAndPopulate,
                Converters = new[] { new StringEnumConverter() }
            };

            using (var reader = CreateReader(json, parentToken))
            {
                if (reader == null) return default(T);
                return JsonSerializer.CreateDefault(settings).Deserialize<T>(reader);
            }
        }

        public string Serialize(object data)
        {
            if (data != null)
            {
                var settings = new JsonSerializerSettings
                {
                    NullValueHandling = NullValueHandling.Ignore,
                    DefaultValueHandling = DefaultValueHandling.IgnoreAndPopulate,
                    Converters = new[] { new StringEnumConverter() }
                };
                return JsonConvert.SerializeObject(data, settings);
            }

            return string.Empty;
        }
    }
}
