using Model.Actor;
using Model.Enums;
using Procedure.Utils.JsonParser;
using Procedure.Utils.EnumService;
using System.Text.Json;

namespace Procedure.Actor
{
    public class ActorProcedure
    {
        public static string Player()
        {
            var result = new PlayerModel(
                new Color("RGBA(255,255,255,0.8)", "RGBA(255,255,255,0.4)"),
                new Dimension(10, 10),
                new Trail(15),
                new ActorSheetData(1, 0, 100, 1, 2, 1, 1)
            );
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }

        public static string Enemies()
        {
            var result = new Dictionary<string, MonsterModel>(){
                {"swarm", new MonsterModel(
                    new Color("RGBA(254,242,0,0.6)","0,0,0,0"),
                    new Dimension(15, 15),
                    new ActorSheetData(2, 0, 8, 1, 2, 1, 1),
                    new OnDeath(3,0,2),
                    new Strategy(EnumService.GetEnumValueAsString(MonsterPattern.Line) , false, false))
                },
                {"archer", new MonsterModel(
                    new Color("RGBA(0,124,127,0.8)", "RGBA(0,0,0,0)"),
                    new Dimension(15, 15),
                    new ActorSheetData(1, 0, 4, 1, 0.1, 1, 1),
                    new OnDeath(4,0,2),
                    new Strategy(EnumService.GetEnumValueAsString(MonsterPattern.Line) , true, false))
                },
                {"jumper", new MonsterModel(
                    new Color("RGBA(255,0,128,0.6)","0,0,0,0"),
                    new Dimension(15, 15),
                    new ActorSheetData(1, 0, 12, 1, 0.8, 1, 1),
                    new OnDeath(3,0,2),
                    new Strategy(EnumService.GetEnumValueAsString(MonsterPattern.Jiggly) , false, true))
                }
            };

            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }

        public static string Weapons()
        {
            var result = new Dictionary<string, WeaponModel>() {
                {"spiral", new WeaponModel(
                    EnumService.GetEnumValueAsString(WeaponType.Spiral),
                    new WeaponSheetData(1000, 8, 0, 0, 3, 5, 0.07, 1),
                    new Color("RGBA(34,170,84,1)", "RGBA(34,170,84,0.5)"))
                },
                {"wave", new WeaponModel(
                    EnumService.GetEnumValueAsString(WeaponType.Wave),
                    new WeaponSheetData(1000, 10, 0, 0, 4, 15, 3, 1),
                    new Color("RGBA(255,90,8,0.8)", "RGBA(255,90,8,0.5)"))
                },
                {"ricochet", new WeaponModel(
                    EnumService.GetEnumValueAsString(WeaponType.Ricochet),
                    new WeaponSheetData(1000, 30, 10, 0, 4, 8, 3, 1),
                    new Color("RGBA(23,111,193,1)", "RGBA(23,111,193,0.5)"))
                },
                {"ray", new WeaponModel(
                    "",
                    new WeaponSheetData(1000, 5, 0, 0, 5, 4, 6, 1),
                    new Color("RGBA(0,124,127,0.8)", "RGBA(0,124,127,0.5)"))
                }
            };
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}