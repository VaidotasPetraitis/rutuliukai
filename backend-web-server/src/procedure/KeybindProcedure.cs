using Model.Keybind;
using Procedure.Utils.JsonParser;
using System.Text.Json;

namespace Procedure.Keybind
{
    public class KeybindProcedure
    {
        public static string Movement()
        {
            var result = new Movement('w', 's', 'a', 'd');
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }

        public static string Abilities()
        {
            var result = new Abilities('j', 'k', 'l');
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}