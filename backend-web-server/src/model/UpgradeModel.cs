namespace Model.Upgrade
{
    public class UpgradeRarityModel
    {
        public Dictionary<string, UpgradeRarity> Rarity { get; private set; }
        public UpgradeSettings Settings { get; private set; }
        public UpgradeRarityModel(Dictionary<string, UpgradeRarity> _rarity, UpgradeSettings _settings)
        {
            Rarity = _rarity;
            Settings = _settings;
        }
    };

    public record Card(int id, string name, string modifier, string modifier_type, string type, int lv, int lv_max, string description, string img);
    public record CardTier(int id, string rarity, string value);
    public record CardTierDynamic(string rarity, object value);
    public record CardWeapon(int id, string name, string modifier, string type, string weapon, int lv, int lv_max, string description, string img);
    public record UpgradeSettings(int UpgradesSlotsMax, int UpgradesChoicesMax, double UpgradesFromEquipped, double UpgradesFromPool);
    public record UpgradeRarity(string Color, double Chance);
}