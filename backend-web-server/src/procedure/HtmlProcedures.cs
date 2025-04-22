using Model.Html;
using Procedure.Utils.JsonParser;
using Procedure.Utils.DbService;
using Procedure.Utils.TypeCoversion;
using System.Text.Json;
using System.Data.SQLite;

namespace Procedure.Html
{
    public class HtmlProcedure
    {
        public static string PlayerInterfaceSize()
        {
            var result = new PlayerInterface(100, 4);
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
        public static string SkillInterfaceSize()
        {
            var result = new SkillInterface(50, 4, 3);
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }

        public static string DbUpgradeHtml()
        {
            using var db_connection = new SQLiteConnection(Db.CONTEXT);
            db_connection.Open();

            var result_json = new List<dynamic>();
            var result_select = Db.ExecuteReader(Db.SqlUpgradesHtml(), db_connection);

            while (result_select.Read())
            {
                result_json.Add(new UpgraderHtml(
                    result_select.GetInt32(0),
                    result_select.GetInt32(1),
                    result_select.GetString(2),
                    result_select.GetString(3),
                    result_select.GetString(4),
                    result_select.GetString(5),
                    result_select.GetString(6)
                ));
            }

            var dictionary = new Dictionary<int, UpgradeHtmlDynamic>();

            foreach (var item in result_json)
            {
                int id = item.Id;
                int len = item.Len;
                object text = TypeConvertion.StringToStringObject(item.Text);
                object oper = TypeConvertion.StringToStringObject(item.Operator);
                object sign = TypeConvertion.StringToStringObject(item.Sign);
                object factor = TypeConvertion.StringToIntObject(item.Factor);
                object color = TypeConvertion.StringToStringObject(item.Color);

                if (!dictionary.ContainsKey(id))
                {
                    dictionary[id] = new UpgradeHtmlDynamic(len, text, oper, sign, factor, color);
                }
            }

            var result = dictionary;

            return JsonSerializer.Serialize(result, Json.JsonOptionsUnsafe());
        }
    }
}