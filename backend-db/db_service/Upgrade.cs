using DBUtils;

namespace DBServices {
public class UpgradeDBServices : IUpgradeDBServices
    {
        public void Create()
        {
            string sql = $"""
                CREATE TABLE IF NOT EXISTS {Db.TBL_UPGRADES} (
                    upgrade_id INTEGER PRIMARY KEY,
                    name TEXT, 
                    modifier TEXT,
                    modifier_type TEXT,
                    type TEXT,
                    lv INTEGER,
                    lv_max INTEGER,
                    description TEXT,
                    img TEXT
                );

                CREATE TABLE IF NOT EXISTS {Db.TBL_UPGRADES_LEGENDARY} (
                    upgrade_id INTEGER PRIMARY KEY,
                    name TEXT, 
                    modifier TEXT,
                    modifier_type TEXT,
                    type TEXT,
                    lv INTEGER,
                    lv_max INTEGER,
                    description TEXT,
                    img TEXT
                );

                CREATE TABLE IF NOT EXISTS {Db.TBL_UPGRADES_WEAPON} (
                    upgrade_id INTEGER PRIMARY KEY,
                    name TEXT, 
                    modifier TEXT,
                    type TEXT,
                    weapon TEXT,
                    lv INTEGER,
                    lv_max INTEGER,
                    description TEXT,
                    img TEXT
                );

                CREATE TABLE IF NOT EXISTS {Db.TBL_UPGRADES_TIER} (
                    upgrade_id INTEGER,
                    tier_id INTEGER PRIMARY KEY,
                    rarity TEXT,
                    value TEXT
                );

                CREATE TABLE IF NOT EXISTS {Db.TBL_UPGRADES_TIER_HTML} (
                    upgrade_id INTEGER,
                    len INTEGER,
                    text TEXT,
                    operator TEXT,
                    sign TEXT,
                    factor TEXT,
                    color TEXT
                );
            """;

            Db.Execute(sql);
        }

        public void Insert(List<Upgrade> upgrades, List<Upgrade> upgrades_legendary)
        {
            foreach (var upgrade in upgrades)
            {
                string sql = $"""
                    INSERT INTO {Db.TBL_UPGRADES} (upgrade_id, name, modifier, modifier_type, type, lv, lv_max, description, img) VALUES 
                    ({upgrade.id}, "{upgrade.name}", "{upgrade.modifier}", "{upgrade.modifier_type}", "{upgrade.type}", {upgrade.lv}, {upgrade.lv_max}, "{upgrade.description}", "{upgrade.img}")
                """;
                Db.Execute(sql);
            };

            foreach (var upgrade in upgrades_legendary)
            {
                string sql = $"""
                    INSERT INTO {Db.TBL_UPGRADES_LEGENDARY} (upgrade_id, name, modifier, modifier_type, type, lv, lv_max, description, img) VALUES 
                    ({upgrade.id}, "{upgrade.name}", "{upgrade.modifier}", "{upgrade.modifier_type}", "{upgrade.type}", {upgrade.lv}, {upgrade.lv_max}, "{upgrade.description}", "{upgrade.img}")
                """;
                Db.Execute(sql);
            };
        }

        public void Insert(List<UpgradeWeapon> upgrades_weapon)
        {
            foreach (var upgrade in upgrades_weapon)
            {
                string sql = $"""
                    INSERT INTO {Db.TBL_UPGRADES_WEAPON} (upgrade_id, name, modifier, type, weapon, lv, lv_max, description, img) VALUES 
                    ({upgrade.id}, "{upgrade.name}", "{upgrade.modifier}", "{upgrade.type}", "{upgrade.weapon}", {upgrade.lv}, {upgrade.lv_max}, "{upgrade.description}", "{upgrade.img}")
                """;
                Db.Execute(sql);
            };
        }

        public void Insert(List<UpgradeTier> upgrades_tier)
        {
            foreach (var upgrade in upgrades_tier)
            {
                string sql = $"""
                    INSERT INTO {Db.TBL_UPGRADES_TIER} (upgrade_id, tier_id, rarity, value) VALUES 
                    ({upgrade.fk_id},{upgrade.pk_id},"{upgrade.rarity}", "{upgrade.value}")
                """;
                Db.Execute(sql);
            };
        }

        public void Insert(List<UpgradeTierHTML> upgrades_tier_html)
        {
            foreach (var upgrade in upgrades_tier_html)
            {
                string sql = $"""
                    INSERT INTO {Db.TBL_UPGRADES_TIER_HTML} (upgrade_id, len, text, operator, sign, factor, color) VALUES 
                    ({upgrade.FkId},{upgrade.Len}, "{upgrade.Text}", "{upgrade.Operator}", "{upgrade.Sign}", "{upgrade.Factor}", "{upgrade.Color}")
                """;
                Db.Execute(sql);
            };
        }

        public void Drop()
        {
            string sql = $"""
                DROP TABLE IF EXISTS {Db.TBL_UPGRADES};
                DROP TABLE IF EXISTS {Db.TBL_UPGRADES_LEGENDARY};
                DROP TABLE IF EXISTS {Db.TBL_UPGRADES_WEAPON};
                DROP TABLE IF EXISTS {Db.TBL_UPGRADES_TIER};
                DROP TABLE IF EXISTS {Db.TBL_UPGRADES_TIER_HTML};
            """;

            Db.Execute(sql);
        }
    };
}