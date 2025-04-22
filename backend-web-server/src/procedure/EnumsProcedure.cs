using Model.Enums;
using Procedure.Utils.EnumService;
using Procedure.Utils.JsonParser;
using System.Text.Json;

namespace Procedure.Enums
{
    public class EnumsProcedume
    {
        public static string Enums()
        {
            var result = new Dictionary<string, Dictionary<string, string>>(){
                { "MonsterType", EnumService.GetEnumValues<MonsterType>()},
                { "MonsterPattern", EnumService.GetEnumValues<MonsterPattern>()},
                { "Modifier", EnumService.GetEnumValues<Modifier>()},
                { "ModifierType", EnumService.GetEnumValues<ModifierType>()},
                { "WeaponType", EnumService.GetEnumValues<WeaponType>()},
                { "BulletBahviour", EnumService.GetEnumValues<BulletBehaviour>()},
                { "UpgradeType", EnumService.GetEnumValues<UpgradeType>()},
                { "UpgradeRarity", EnumService.GetEnumValues<BulletBehaviour>()},
                { "SceneList", EnumService.GetEnumValues<SceneList>()},
                { "AbilityType", EnumService.GetEnumValues<AbilityType>()}
            };
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}