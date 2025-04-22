using DBServices;

var ability_db_services = new AbilityDBServices();
ability_db_services.Drop();
ability_db_services.Create();

var ability_list = new List<Ability>() {
    new Ability(0,"./asset/img/teleport2.png", AbilityName.Teleport),
    new Ability(1,"./asset/img/run2.png", AbilityName.Run),
    new Ability(2,"./asset/img/heal2.png", AbilityName.Heal)
};
ability_db_services.Insert(ability_list);

var ability_rarity_list = new List<AbilityRarity>() {
    new AbilityRarity(0, 0, "epic", 8000, 300, 0),
    new AbilityRarity(1, 0, "magic", 10000, 200, 0),
    new AbilityRarity(2, 0, "common", 15000, 100, 0),
    new AbilityRarity(3, 1, "epic", 4000, 3, 2000),
    new AbilityRarity(4, 1, "magic", 5000, 2, 1500),
    new AbilityRarity(5, 1, "common", 6000, 1, 1000),
    new AbilityRarity(6, 2, "epic", 16000, 80, 0),
    new AbilityRarity(7, 2, "magic", 20000, 60, 0),
    new AbilityRarity(8, 2, "common", 30000, 40, 0)
};
ability_db_services.Insert(ability_rarity_list);

var upgrade_db_services = new UpgradeDBServices();
upgrade_db_services.Drop();
upgrade_db_services.Create();

var upgrade_list = new List<Upgrade>()
{
    new Upgrade(1, "Orbit", "WeaponSpeed", "Additive", "Player", 0, 5, "Bullets fly faster, turning your weapons into lightning-fast instruments of destruction.", "./asset/img/player-logo2.png"),
    new Upgrade(2, "Eyes", "Projectiles", "Additive", "Player", 0, 2, "Unleash a storm of bullets, overwhelming enemies with relentless firepower.", "./asset/img/player-logo2.png"),
    new Upgrade(3, "Murder", "Damage", "Additive", "Player", 0, 5, "Deal devastating damage, turning each shot into a lethal blow.", "./asset/img/player-logo2.png"),
    new Upgrade(4, "Rewind", "Cooldown", "Additive", "Player", 0, 5, "Fire faster than ever, overwhelming foes with a relentless barrage.", "./asset/img/player-logo2.png"),
    new Upgrade(5, "Bolt", "MovementSpeed", "Additive", "Player", 0, 3, "Move with lightning speed, outmaneuvering and outpacing your enemies.", "./asset/img/player-logo2.png"),
    new Upgrade(6, "Size", "Area", "Additive", "Player", 0, 5, "Expand your attack range, crushing enemies beneath a wave of destruction.", "./asset/img/player-logo2.png"),
    new Upgrade(7, "Earthquake", "Projectiles", "Additive", "Wave", 0, 2, "Unleash a barrage of projectiles, turning each wave into a devastating storm.", "./asset/img/wave-logo2.png"),
    new Upgrade(8, "Grit", "AttackRate", "Additive", "Wave", 0, 5, "Increase your attack speed, overwhelming enemies with sheer firepower.", "./asset/img/wave-logo2.png"),
    new Upgrade(9, "Colossal", "Area", "Additive", "Wave", 0, 5, "Crush foes with massive area damage, dominating the battlefield.", "./asset/img/wave-logo2.png"),
    new Upgrade(10, "Hourglass", "AttackRate", "Additive", "Ricochet", 0, 5, "Increase your ricochet speed, turning each shot into a whirlwind of destruction.", "./asset/img/reco-logo2.png"),
    new Upgrade(11, "Rampage", "Bounce", "Additive", "Ricochet", 0, 5, "Bounce from enemy to enemy, leaving a trail of devastation in your wake.", "./asset/img/reco-logo2.png"),
    new Upgrade(12, "Relentless", "WeaponSpeed", "Additive", "Ricochet", 0, 5, "Shoot faster than ever, turning each ricochet into an unstoppable missile.", "./asset/img/reco-logo2.png"),
    new Upgrade(13, "Alien", "Projectiles", "Additive", "Spiral", 0, 2, "Launch a barrage of projectiles, turning each spiral into a cosmic storm.", "./asset/img/spiral-logo2.png"),
    new Upgrade(14, "Universe", "Orbit,Projectiles", "Additive", "Spiral", 0, 5, "Command cosmic forces, increasing your spiral range and adding more projectiles to your arsenal.", "./asset/img/spiral-logo2.png")
};

var upgrade_legendary_list = new List<Upgrade>()
{
    new Upgrade(41, "Lightning", "Bounce,WeaponSpeed", "Additive", "Ricochet", 0, 1, "Harness the power of lightning, increasing bounce count and weapon speed to electrify the battlefield.", "./asset/img/reco-logo2.png"),
    new Upgrade(42, "Fool", "Area,WeaponSpeed", "Additive", "Spiral", 0, 1, "Embrace the unpredictable with Fool, expanding attack range while sacrificing bullet speed, creating chaotic patterns to confound your foes.", "./asset/img/spiral-logo2.png"),
    new Upgrade(43, "Rain", "Area,Projectiles", "Additive", "Wave", 0, 1, "Summon a torrential downpour of destruction with Rain, reducing bullet size while unleashing a deluge of smaller but deadlier projectiles.", "./asset/img/wave-logo2.png")
};
upgrade_db_services.Insert(upgrade_list, upgrade_legendary_list);

var upgrade_weapons_list = new List<UpgradeWeapon>()
{
    new UpgradeWeapon(31, "Wave", "NewWeapon", "Weapon", "Wave", 0, 1, "Unleash the Wave, a devastating weapon that pierces through enemies in a straight line, leaving destruction in its wake.", "./asset/img/weapon-logo2.png"),
    new UpgradeWeapon(32, "Ricochet", "NewWeapon", "Weapon", "Ricochet", 0, 1, "Harness the power of Ricochet, a versatile weapon that bounces between enemies, delivering death from unexpected angles.", "./asset/img/weapon-logo2.png"),
    new UpgradeWeapon(33, "Spiral", "NewWeapon", "Weapon", "Spiral",0, 1, "Master the Spiral, a dynamic weapon that spins around the player, shredding enemies with its relentless onslaught.", "./asset/img/spiral-logo2.png")
};
upgrade_db_services.Insert(upgrade_weapons_list);

var upgrade_tier_list = new List<UpgradeTier>(){
    new UpgradeTier(1, 1,"epic", "0.10"),
    new UpgradeTier(2, 1,"magic", "0.08"),
    new UpgradeTier(3, 1,"common", "0.06"),
    new UpgradeTier(4, 2,"epic", "2"),
    new UpgradeTier(5, 2,"magic", "1"),
    new UpgradeTier(6, 3,"epic", "0.10"),
    new UpgradeTier(7, 3,"magic", "0.08"),
    new UpgradeTier(8, 3,"common", "0.06"),
    new UpgradeTier(9, 4,"epic", "-0.10"),
    new UpgradeTier(10, 4,"magic", "-0.08"),
    new UpgradeTier(11, 4,"common", "-0.04"),
    new UpgradeTier(12, 5,"epic", "1.5"),
    new UpgradeTier(13, 5,"magic", "0.8"),
    new UpgradeTier(14, 6,"epic", "0.25"),
    new UpgradeTier(15, 6,"magic", "0.18"),
    new UpgradeTier(16, 6,"common", "0.12"),
    new UpgradeTier(17, 7,"epic", "2"),
    new UpgradeTier(18, 7,"magic", "1"),
    new UpgradeTier(19, 8,"epic", "-100"),
    new UpgradeTier(20, 8,"magic", "-80"),
    new UpgradeTier(21, 8,"common", "-60"),
    new UpgradeTier(22, 9,"epic", "5"),
    new UpgradeTier(23, 9,"magic", "4"),
    new UpgradeTier(24, 9,"common", "3"),
    new UpgradeTier(25, 10,"epic", "-100"),
    new UpgradeTier(26, 10,"magic", "-80"),
    new UpgradeTier(27, 10,"common", "-60"),
    new UpgradeTier(28, 11,"epic", "4"),
    new UpgradeTier(29, 11,"magic", "3"),
    new UpgradeTier(30, 11,"common", "2"),
    new UpgradeTier(31, 12,"epic", "2.5"),
    new UpgradeTier(32, 12,"magic", "1.8"),
    new UpgradeTier(33, 12,"common", "1.2"),
    new UpgradeTier(34, 13,"epic", "3"),
    new UpgradeTier(35, 13,"magic", "2"),
    new UpgradeTier(36, 13,"common", "1"),
    new UpgradeTier(37, 14,"epic", "[8, 3]"),
    new UpgradeTier(38, 14,"magic", "[7, 2]"),
    new UpgradeTier(39, 14,"common", "[6, 1]"),
    new UpgradeTier(40, 41,"legendary", "[30, 3]"),
    new UpgradeTier(41, 42,"legendary", "[20, -0.05]"),
    new UpgradeTier(42, 43,"legendary", "[-14, 10]"),
    new UpgradeTier(43, 31,"unique", "0"),
    new UpgradeTier(44, 32,"unique", "0"),
    new UpgradeTier(45, 33,"unique", "0")
};

upgrade_db_services.Insert(upgrade_tier_list);

var c_green = "#00C800";
var c_red = "#C80000";

var upgrade_tier_html_list = new List<UpgradeTierHTML>(){
    new UpgradeTierHTML(1, 1, "Weapon Speed", "+", "%", "100", c_green),
    new UpgradeTierHTML(2, 1, "Projectiles", "+", "", "1", c_green),
    new UpgradeTierHTML(3, 1, "Damage", "+", "%", "100", c_green),
    new UpgradeTierHTML(4, 1, "Cooldown", "", "%", "100", c_green),
    new UpgradeTierHTML(5, 1, "Movement Speed", "+", "m/s", "1", c_green),
    new UpgradeTierHTML(6, 1, "Area", "+", "%", "100", c_green),
    new UpgradeTierHTML(7, 1, "Projectiles", "+", "", "1", c_green),
    new UpgradeTierHTML(8, 1, "Attack Rate", "", "ms", "1", c_green),
    new UpgradeTierHTML(9, 1, "Area", "+", "m", "1", c_green),
    new UpgradeTierHTML(10, 1, "Attack Rate", "", "ms", "1", c_green),
    new UpgradeTierHTML(11, 1, "Bounce", "+", "", "1", c_green),
    new UpgradeTierHTML(12, 1, "Weapon Speed", "+", "m/s", "1", c_green),
    new UpgradeTierHTML(13, 1, "Projectiles", "+", "", "1", c_green),
    new UpgradeTierHTML(14, 2, "Orbit,Weapon Speed"   ,"+,+" , "m,", "[1, 1]"  , $"{c_green}, {c_green}"),
    new UpgradeTierHTML(31, 0, "", "", "", "[0, 0]", ""),
    new UpgradeTierHTML(32, 0, "", "", "", "[0, 0]", ""),
    new UpgradeTierHTML(33, 0, "", "", "", "[0, 0]", ""),
    new UpgradeTierHTML(41, 2, "Bounce,Weapon Speed"   , "+,+"  ," ,m/s"  , "[1, 1]"  , $"{c_green}, {c_green} "),
    new UpgradeTierHTML(42, 2, "Area,Weapon Speed"     , "+,"   ,"m,m/s"  , "[1, 100]", $"{c_green}, {c_red} "),
    new UpgradeTierHTML(43, 2, "Area,Projectiles"      , ",+"   ,"m,"     , "[1, 1]"  , $"{c_red}, {c_green} ")
};
upgrade_db_services.Insert(upgrade_tier_html_list);

var highscore_db_services = new HighscoreDBServices();
highscore_db_services.Drop();
highscore_db_services.Create();

public record Ability(int id, string img, AbilityName name);
public record Upgrade(int id, string name, string modifier, string modifier_type, string type, int lv, int lv_max, string description, string img);
public record UpgradeTier(int pk_id, int fk_id, string rarity, string value);
public record UpgradeTierHTML(int FkId, int Len, string Text, string Operator, string Sign, string Factor, string Color);
public record UpgradeWeapon(int id, string name, string modifier, string type, string weapon, int lv, int lv_max, string description, string img);
public record AbilityRarity(int id, int fk_id, string rarity, int cooldown, int value, int effect);
public enum AbilityName { Run, Teleport, Heal};