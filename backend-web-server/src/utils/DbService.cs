using System.Data.SQLite;

namespace Procedure.Utils.DbService
{
    public class Db
    {
        public static string CONTEXT = "Data Source=../data/data.db;Version=3";

        public static SQLiteDataReader ExecuteReader(string sql, SQLiteConnection con)
        {
            using var cmd_select = new SQLiteCommand(sql, con);
            return cmd_select.ExecuteReader();
        }

        public static void ExecuteNonQuery(string sql)
        {
            using var connection = new SQLiteConnection(CONTEXT);
            connection.Open();
            using var command = new SQLiteCommand(sql, connection);
            command.ExecuteNonQuery();
        }

        public static string SqlShelfItem(string where_condition)
        {
            return $"""
                    SELECT 
                        a.ability_id, 
                        a.img,
                        a.name,
                        ar.rarity,
                        ar.value,
                        ar.cooldown,
                        ar.effect
                    FROM abilities as a
                    INNER JOIN abilities_rarity as ar ON a.ability_id = ar.ability_id
                    WHERE ar.rarity = "{where_condition}"
                    ORDER BY RANDOM()
                    LIMIT 1;              
                """;
        }

        public static string SqlUpgrades()
        {
            return $"""
                    SELECT *
                    FROM upgrades;
                """;
        }

        public static string SqlUpgradesLegendary()
        {
            return $"""
                    SELECT *
                    FROM upgrades_legendary;
                """;
        }

        public static string SqlUpgradesWeapon()
        {
            return $"""
                    SELECT *
                    FROM upgrades_weapon;
                """;
        }
        public static string SqlUpgradesTier()
        {
            return $"""
                    SELECT 
                        upgrade_id,
                        rarity,
                        value
                    FROM upgrades_tiers;
                """;
        }

        public static string SqlUpgradesHtml()
        {
            return $"""
                    SELECT *
                    FROM upgrades_tiers_html;
                """;
        }
        public static string SqlHighscore()
        {
            return $"""
                    SELECT MAX(score) AS score 
                    FROM highscore;
                """;
        }

        public static string SqlHighscoreInsert(int score)
        {
            return $"""
                    INSERT INTO highscore (score) VALUES ({score})
                """;
        }
    }
}