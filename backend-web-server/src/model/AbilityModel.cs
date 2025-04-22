namespace Model.Ability
{
    public class AbilityModel
    {
        public int Cooldown { get; private set; } = 0;
        public int Value { get; private set; } = 0;
        public int Effect { get; private set; } = 0;
        public string Img { get; private set; }
        public string Rarity { get; private set; }
        public AbilityModel(string _img, string _rarity)
        {
            Img = _img;
            Rarity = _rarity;
        }
    }

    public class Teleport : AbilityModel
    {
        public Teleport(string _img, string _rarity = "common")
            : base(_img, _rarity) { }
    }

    public class Run : AbilityModel
    {
        public Run(string _img, string _rarity = "common")
            : base(_img, _rarity) { }
    }

    public class Heal : AbilityModel
    {
        public Heal(string _img, string _rarity = "common")
            : base(_img, _rarity) { }
    }

    public class Placeholder : AbilityModel
    {
        public Placeholder(string _img, string _rarity = "common")
            : base(_img, _rarity) { }
    }
};