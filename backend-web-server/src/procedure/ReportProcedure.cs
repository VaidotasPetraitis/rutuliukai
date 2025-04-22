using Model.Report;
using Model.Enums;
using Procedure.Utils.JsonParser;
using System.Text.Json;

namespace Procedure.Report
{
    public class ReportProcedure
    {
        public static string Report()
        {
            var result = new ReportModel(
                new Dictionary<WeaponType, ReportWeaponData>(){
                    { WeaponType.Spiral, new ReportWeaponData()},
                    { WeaponType.Wave, new ReportWeaponData()},
                    { WeaponType.Ricochet, new ReportWeaponData()},
                },
                new ReportStats([])
            );
            return JsonSerializer.Serialize(result, Json.JsonOptions());
        }
    }
}