using Model.Shop;
using Procedure.Utils.JsonParser;
using Procedure.Utils.DbService;
using System.Text.Json;
using System.Data.SQLite;

namespace Procedure.Shop
{
    public class ShopProcedure
    {
        public static string DbShop()
        {
            using var db_connection = new SQLiteConnection(Db.CONTEXT);
            db_connection.Open();

            var random = new Random();
            var result = new List<ShopModel>();

            for (int i = 0; i < 5; i++)
            {
                double next = random.NextDouble();
                string where_condition;

                where_condition = next switch
                {
                    <= 0.10 => "epic",
                    <= 0.30 => "magic",
                    _ => "common"
                };

                string sql_select = Db.SqlShelfItem(where_condition);
                using var cmd_select = new SQLiteCommand(sql_select, db_connection);
                var result_select = cmd_select.ExecuteReader();
                while (result_select.Read())
                {
                    result.Add(new ShopModel(
                        result_select.GetString(1),
                        result_select.GetString(2),
                        result_select.GetString(3),
                        result_select.GetInt32(4),
                        result_select.GetInt32(5),
                        result_select.GetInt32(6)
                    ));
                }
            }

            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}