using DBUtils;

namespace DBServices {
    public class HighscoreDBServices : IDBServicesBase
    {
        public void Create()
        {
            string sql = $"""
                CREATE TABLE IF NOT EXISTS {Db.TBL_HIGHSCORE} (
                    score INTEGER
                );
            """;

            Db.Execute(sql);
        }
        public void Drop()
        {
            string sql = $"""
                DROP TABLE IF EXISTS {Db.TBL_HIGHSCORE};
            """;

           Db.Execute(sql);
        }
    };
}