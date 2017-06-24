using System.Collections.Generic;

namespace SimpleRiskApp.Common.Helpers
{
    public interface IJsonMapper
    {
        List<T> MapCollectionFromJson<T>(string json, string token = "data");
        T MapFromJson<T>(string json, string parentToken = null);
        string Serialize(object data);
    }
}
