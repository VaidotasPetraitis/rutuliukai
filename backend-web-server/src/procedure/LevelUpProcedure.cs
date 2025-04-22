using Model.LevelUp;
using Procedure.Utils.JsonParser;
using System.Text.Json;

namespace Procedure.LevelUp
{
    public class LevelUpProcedure
    {
        public static string ExpSettings()
        {
            var result = new ExpSettings(1, 5, 0);
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
        public static string ExpGain()
        {
            var result = new List<ExpGain>(){
                { new ExpGain(1, 21, 10)},
                { new ExpGain(21, 41, 13)},
                { new ExpGain(41, int.MaxValue, 16)},
            };

            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }

        public static string ExpMulti()
        {
            var result = new ExpMulti(0.5, 1.5);
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}