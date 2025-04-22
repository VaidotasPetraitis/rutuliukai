using DBUtils;

namespace DBServices {
    public class AbilityDBServices : IAbilityDBServices
    {
        public void Create()
        {
            string sql = $"""
                CREATE TABLE IF NOT EXISTS {Db.TBL_ABILITIES} (
                    ability_id INTEGER PRIMARY KEY,
                    img TEXT, 
                    name TEXT
                );

                CREATE TABLE IF NOT EXISTS {Db.TBL_ABILITIES_RARITY} (
                    ability_id INTEGER,
                    rarity_id INTEGER PRIMARY KEY,    
                    rarity TEXT, 
                    value INTEGER,     
                    cooldown INTEGER, 
                    effect INTEGER,    
                    FOREIGN KEY (ability_id) REFERENCES abilities (ability_id)
                );
            """;

            Db.Execute(sql);
        }

        public void Insert(List<Ability> abilities)
        {

            foreach (var ability in abilities)
            {
                string sql = $"""
                    INSERT INTO {Db.TBL_ABILITIES} (ability_id, img, name) VALUES ({ability.id}, "{ability.img}", "{ability.name}")
                """;
                Db.Execute(sql);
            };
        }

        public void Insert(List<AbilityRarity> abilities_rarity)
        {
            foreach (var ability in abilities_rarity)
            {
                string sql = $"""
                    INSERT INTO {Db.TBL_ABILITIES_RARITY} (ability_id, rarity_id, rarity, value, cooldown, effect) VALUES
                        ({ability.fk_id}, {ability.id}, "{ability.rarity}", {ability.value}, {ability.cooldown}, {ability.effect})
                """;
                Db.Execute(sql);
            };
        }

        public void Drop()
        {
            string sql = $"""
                DROP TABLE IF EXISTS {Db.TBL_ABILITIES};
                DROP TABLE IF EXISTS {Db.TBL_ABILITIES_RARITY};        
            """;

           Db.Execute(sql);
        }
    };
}