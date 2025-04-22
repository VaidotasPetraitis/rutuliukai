using System.Text.Json;

namespace Procedure.Utils.JsonParser
{
    public class Json
    {
        public static JsonSerializerOptions JsonOptions(){
            return new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
                WriteIndented = true
            };
        }

        public static JsonSerializerOptions JsonOptionsUnsafe()
        {
            return new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.SnakeCaseLower,
                Encoder = System.Text.Encodings.Web.JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
                WriteIndented = true
            };
        }
    }
}