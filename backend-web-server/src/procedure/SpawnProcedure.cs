using Model.Spawn;
using Model.Enums;
using Procedure.Utils.EnumService;
using System.Text.Json;
using Procedure.Utils.JsonParser;

namespace Procedure.Spawn
{
    public class SpawnProcedure
    {
        public static string Bulk()
        {
            var result = new Dictionary<string, SpawnBulk>(){
                { EnumService.GetEnumValueAsString(MonsterType.Swarm), new SpawnBulk(0.001, 15)},
                { EnumService.GetEnumValueAsString(MonsterType.Archer), new SpawnBulk(0.0002, 2)},
                { EnumService.GetEnumValueAsString(MonsterType.Jumper), new SpawnBulk(0.001, 7)},
            };
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }

        public static string Stream()
        {
            var result = new Dictionary<MonsterType, Dictionary<string, SpawnStream>>(){
                { MonsterType.Swarm, new Dictionary<string, SpawnStream>(){
                    {"00", new SpawnStream(4000, 3)},
                    {"01", new SpawnStream(3600, 4)},
                    {"02", new SpawnStream(3200, 5)},
                    {"03", new SpawnStream(2800, 6)},
                    {"04", new SpawnStream(2400, 7)},
                    {"05", new SpawnStream(2000, 8)},
                    {"06", new SpawnStream(1600, 9)},
                    {"07", new SpawnStream(1200, 10)},
                    {"08", new SpawnStream(800, 11)},
                    {"09", new SpawnStream(400, 12)},
                    {"10", new SpawnStream(1, 1)},
                }},
                { MonsterType.Archer, new Dictionary<string, SpawnStream>(){
                    {"00", new SpawnStream(null, 0)},
                    {"01", new SpawnStream(6000, 1)},
                    {"02", new SpawnStream(5400, 1)},
                    {"03", new SpawnStream(4800, 1)},
                    {"04", new SpawnStream(4200, 2)},
                    {"05", new SpawnStream(3600, 2)},
                    {"06", new SpawnStream(3000, 2)},
                    {"07", new SpawnStream(2400, 3)},
                    {"08", new SpawnStream(2000, 3)},
                    {"09", new SpawnStream(2000, 3)},
                    {"10", new SpawnStream(100, 1)},
                }},
                { MonsterType.Jumper, new Dictionary<string, SpawnStream>(){
                    {"00", new SpawnStream(null, 0)},
                    {"01", new SpawnStream(null, 0)},
                    {"02", new SpawnStream(3000, 3)},
                    {"03", new SpawnStream(2600, 4)},
                    {"04", new SpawnStream(2200, 5)},
                    {"05", new SpawnStream(1800, 6)},
                    {"06", new SpawnStream(1400, 6)},
                    {"07", new SpawnStream(1000, 7)},
                    {"08", new SpawnStream(600, 7)},
                    {"09", new SpawnStream(200, 8)},
                    {"10", new SpawnStream(1, 1)},
                }}
            };

            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}