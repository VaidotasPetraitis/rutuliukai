using Model.Ability;
using Procedure.Utils.JsonParser;
using System.Text.Json;

namespace Procedure.Ability
{
    public class AbilityProcedure
    {
        public static string Abilities()
        {
            var result = new Dictionary<string, AbilityModel>() {
            { "teleport", new Teleport("./asset/img/teleport2.png")},
            { "run", new Run("./asset/img/run2.png")},
            { "heal", new Heal("./asset/img/heal2.png")},
            { "placeholder", new Placeholder("./asset/img/placeholder2.png")}
        };
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}