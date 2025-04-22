using Model.Highscore;
using System.Text.Json;
using Procedure.Utils.DbService;
using Procedure.Utils.JsonParser;
using System.Data.SQLite;

namespace Procedure.Highscore
{
    public class HighscoreProcedure()
    {
        public static string Get()
        {
            using var db_connection = new SQLiteConnection(Db.CONTEXT);
            db_connection.Open();

            int? result = null;

            using var reader = Db.ExecuteReader(Db.SqlHighscore(), db_connection);
            
            reader.Read();
            if (!reader.IsDBNull(0))
            {
                result = reader.GetInt32(0);
            }
            else
            {
                result = 0;
            }

            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }

        public static void Post(HighscoreModel highscore)
        {
            Db.ExecuteNonQuery(Db.SqlHighscoreInsert(highscore.score));
        }
    }
}