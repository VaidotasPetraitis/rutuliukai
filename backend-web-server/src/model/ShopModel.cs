using Model.Enums;

namespace Model.Shop
{
    public class ShopModel
    {
        public string Img { get; private set; }
        public string Name { get; private set; }
        public string Rarity { get; private set; }
        public int Value { get; private set; }
        public int Cooldown { get; private set; }
        public int Gold { get; private set; }
        public int Effect { get; private set; }

        public ShopModel(string img, string name, string rarity, int value, int cooldown, int effect)
        {
            Img = img;
            Name = name;
            Rarity = rarity;
            Value = value;
            Cooldown = cooldown;
            Gold = SetCost(rarity);
            Effect = effect;
        }

        public int SetCost(string db_item_rarity)
        {
            var random = new Random();
            if (UpgradeRarityType.Common.ToString().ToLower() == db_item_rarity)
            {
                return random.Next(50, 100);
            }
            else if (UpgradeRarityType.Magic.ToString().ToLower() == db_item_rarity)
            {
                return random.Next(150, 250);
            }
            else if (UpgradeRarityType.Epic.ToString().ToLower() == db_item_rarity)
            {
                return random.Next(350, 600);
            };

            return 0;
        }
    }
};
