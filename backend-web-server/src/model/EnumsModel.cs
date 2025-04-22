namespace Model.Enums
{
    public enum MonsterType { Swarm, Archer, Jumper };
    public enum MonsterPattern { Line, None, Jiggly };
    public enum Modifier { Area, Cooldown, Damage, Hp, Projectiles, MovementSpeed, WeaponSpeed, AttackRate, TrailLength, Bounce, Orbit };
    public enum ModifierType { Additive, Multiplier };
    public enum WeaponType { Ricochet, Spiral, Wave };
    public enum BulletBehaviour { Closest, Random, Player, None };
    public enum UpgradeType { Ricochet, Spiral, Wave, Player, Weapon };
    public enum SceneList { Menu, Arena };
    public enum UpgradeRarityType { Common, Magic, Epic };
    public enum AbilityType { Teleport, Run, Heal };
};