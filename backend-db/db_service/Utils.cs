using System.Data.SQLite;

namespace DBUtils {
    public class Db
    {
        public static string TBL_HIGHSCORE = "highscore";
        public  static string TBL_UPGRADES = "upgrades";
        public  static string TBL_UPGRADES_LEGENDARY = "upgrades_legendary";
        public  static string TBL_UPGRADES_WEAPON = "upgrades_weapon";
        public  static string TBL_UPGRADES_TIER = "upgrades_tiers";
        public  static string TBL_UPGRADES_TIER_HTML = "upgrades_tiers_html";
        public static string TBL_ABILITIES = "abilities";
        public static string TBL_ABILITIES_RARITY = "abilities_rarity";
        public static string DB_CONTEXT = "Data Source=../data/data.db;Version=3";

        public static void Execute(string sql)
        {
            using var connection = new SQLiteConnection(Db.DB_CONTEXT);
            connection.Open();
            using var command = new SQLiteCommand(sql, connection);
            command.ExecuteNonQuery();
        }
    };

    public interface IDBServicesBase
    {
        public void Create();
        public void Drop();
    };

    public interface IAbilityDBServices : IDBServicesBase
    {
        public void Insert(List<Ability> abilities);
        public void Insert(List<AbilityRarity> abilities_rarity);
    };

    public interface IUpgradeDBServices : IDBServicesBase
    {
        public void Insert(List<Upgrade> upgrades, List<Upgrade> upgrades_legendary);
        public void Insert(List<UpgradeWeapon> upgrades_weapon);
        public void Insert(List<UpgradeTier> upgrades_tier);
    };
}