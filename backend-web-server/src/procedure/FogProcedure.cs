using Model.Fog;
using Procedure.Utils.JsonParser;
using System.Text.Json;

namespace Procedure.Fog
{
    public class FogProcedure
    {
        public static string Fog()
        {
            var result = new FogModel(
                new FogSettings(2, new FogStrength(0.4, 1.0), new FogRGBA([0, 0, 0, 0], [0, 0, 0, 1])),
                new FogScaling(0.25, 0, 5)
            );
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}