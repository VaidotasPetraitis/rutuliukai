using Model.Enums;

namespace Model.Report
{
    public class ReportModel
    {
        public Dictionary<WeaponType, ReportWeaponData> Weapons { get; private set; }
        public ReportStats Stats { get; private set; }

        public ReportModel(Dictionary<WeaponType, ReportWeaponData> _weapons, ReportStats _stats)
        {
            Weapons = _weapons;
            Stats = _stats;
        }
    }

    public record ReportWeaponData(int Damage = 0, int Time = 0, string FormatDuration = "", int Duration = 0, int Dps = 0);
    public record ReportStats(int[] Upgrades, int Kills = 0, int GoldEarned = 0, int? Time = null, string? TimeFormatted = null, int Level = 0, int DamageTaken = 0);
}