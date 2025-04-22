using Model.Upgrade;
using Procedure.Utils.JsonParser;
using Procedure.Utils.DbService;
using Procedure.Utils.TypeCoversion;
using System.Text.Json;
using System.Data.SQLite;

namespace Procedure.Upgrade
{
    public class UpgradeProcedure
    {
        public static string UpgradeConfig()
        {
            var result = new UpgradeRarityModel(
                new Dictionary<string, UpgradeRarity>() {
                    {"common", new UpgradeRarity("192,192,192", 1.0)},
                    {"magic", new UpgradeRarity("80,107,211", 0.3)},
                    {"epic", new UpgradeRarity("172,30,223", 0.1)},
                    {"legendary", new UpgradeRarity("240,104,21", 0.05)},
                    {"unique", new UpgradeRarity("192, 0, 73", 0.3)}
                },
                new UpgradeSettings(10, 4, 0.6, 0.3)
            );
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }

        public static string DbUpgradesWeapon()
        {
            using var db_connection = new SQLiteConnection(Db.CONTEXT);
            db_connection.Open();

            var result_json = new List<CardWeapon>();
            using var result_select = Db.ExecuteReader(Db.SqlUpgradesWeapon(), db_connection);

            while (result_select.Read())
            {
                result_json.Add(new CardWeapon(
                    result_select.GetInt32(0),
                    result_select.GetString(1),
                    result_select.GetString(2),
                    result_select.GetString(3),
                    result_select.GetString(4),
                    result_select.GetInt32(5),
                    result_select.GetInt32(6),
                    result_select.GetString(7),
                    result_select.GetString(8)
                ));
            }

            return JsonSerializer.Serialize(result_json, Json.JsonOptions());
        }

        public static string DbUpgradesLegendary()
        {
            using var db_connection = new SQLiteConnection(Db.CONTEXT);
            db_connection.Open();

            var result_json = new List<Card>();
            using var result_select = Db.ExecuteReader(Db.SqlUpgradesLegendary(), db_connection);

            while (result_select.Read())
            {
                result_json.Add(new Card(
                    result_select.GetInt32(0),
                    result_select.GetString(1),
                    result_select.GetString(2),
                    result_select.GetString(3),
                    result_select.GetString(4),
                    result_select.GetInt32(5),
                    result_select.GetInt32(6),
                    result_select.GetString(7),
                    result_select.GetString(8)
                ));
            }

            return JsonSerializer.Serialize(result_json, Json.JsonOptions());
        }

        public static string DbUpgradesBasic()
        {
            using var db_connection = new SQLiteConnection(Db.CONTEXT);
            db_connection.Open();

            var result_json = new List<Card>();
            using var result_select = Db.ExecuteReader(Db.SqlUpgrades(), db_connection);

            while (result_select.Read())
            {
                result_json.Add(new Card(
                    result_select.GetInt32(0),
                    result_select.GetString(1),
                    result_select.GetString(2),
                    result_select.GetString(3),
                    result_select.GetString(4),
                    result_select.GetInt32(5),
                    result_select.GetInt32(6),
                    result_select.GetString(7),
                    result_select.GetString(8)
                ));
            }

            return JsonSerializer.Serialize(result_json, Json.JsonOptions());
        }

        public static string DbUpgradesTier()
        {
            using var db_connection = new SQLiteConnection(Db.CONTEXT);
            db_connection.Open();

            var result_json = new List<dynamic>();
            using var result_select = Db.ExecuteReader(Db.SqlUpgradesTier(), db_connection);

            while (result_select.Read())
            {
                result_json.Add(new CardTier(
                    result_select.GetInt32(0),
                    result_select.GetString(1),
                    result_select.GetString(2)
                ));
            }
            var dictionary = new Dictionary<int, List<CardTierDynamic>>();

            foreach (var item in result_json)
            {
                int id = item.id;
                string rarity = item.rarity;
                object parsedValue = TypeConvertion.StringToIntObject(item.value);

                if (!dictionary.ContainsKey(id))
                {
                    dictionary[id] = new List<CardTierDynamic>();
                }

                dictionary[id].Add(new CardTierDynamic(rarity, parsedValue));
            }

            var result = dictionary;

            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}