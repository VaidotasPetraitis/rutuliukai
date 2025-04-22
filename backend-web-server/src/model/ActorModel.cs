namespace Model.Actor
{
    public class PlayerModel
    {
        public Color Color { get; private set; }
        public Dimension Dimension { get; private set; }
        public Trail Trail { get; private set; }
        public ActorSheetData SheetData { get; private set; }
        public PlayerModel(Color _color, Dimension _dimension, Trail _trail, ActorSheetData _sheet_data)
        {
            Color = _color;
            Dimension = _dimension;
            Trail = _trail;
            SheetData = _sheet_data;
        }
    };

    public class MonsterModel
    {
        public Color Color { get; private set; }
        public Dimension Dimension { get; private set; }
        public ActorSheetData SheetData { get; private set; }
        public OnDeath OnDeath { get; private set; }
        public Strategy Strategy { get; private set; }
        public MonsterModel(Color _color, Dimension _dimension, ActorSheetData _sheet_data, OnDeath _on_death, Strategy _strategy)
        {
            Color = _color;
            Dimension = _dimension;
            SheetData = _sheet_data;
            OnDeath = _on_death;
            Strategy = _strategy;
        }
    };

    public class WeaponModel
    {
        public string Type { get; private set; }
        public WeaponSheetData Sheet { get; private set; }
        public Color Color { get; private set; }
        public WeaponModel(string _type, WeaponSheetData _sheet, Color _color)
        {
            Type = _type;
            Sheet = _sheet;
            Color = _color;
        }
    };

    public record Dimension(int Width, int Height);
    public record Trail(int Len, double From = 0, decimal To = 1);
    public record ActorSheetData(double Damage, int Projectiles, int Hp, int Area, double MovementSpeed, int WeaponSpeed, double Cooldown);
    public record OnDeath(int Exp, int GoldMin, int GoldMax);
    public record Strategy(string MovementPattern, bool Shoot, bool Teleport);
    public record Color(string Body, string Trail);
    public record WeaponSheetData(int AttackRate, int TrailLength, int Bounce, int Orbit, int Damage, int Area, double WeaponSpeed, int Projectiles);
}
