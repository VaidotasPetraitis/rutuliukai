using Procedure.Actor;
using Procedure.Keybind;
using Procedure.Ability;
using Procedure.Shop;
using Procedure.Fog;
using Procedure.Report;
using Procedure.LevelUp;
using Procedure.Spawn;
using Procedure.Enums;
using Procedure.Upgrade;
using Procedure.Html;
using Procedure.Highscore;
using Model.Highscore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(policyBuilder => policyBuilder.AddDefaultPolicy(policy => policy.WithOrigins("*").AllowAnyHeader().AllowAnyHeader()));

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors();

app.MapGet("/api/actor/player", () => ActorProcedure.Player()).WithOpenApi();
app.MapGet("/api/actor/enemies", () => ActorProcedure.Enemies()).WithOpenApi();
app.MapGet("/api/actor/weapons", () => ActorProcedure.Weapons()).WithOpenApi();

app.MapGet("/api/keybind/movement", () => KeybindProcedure.Movement()).WithOpenApi();
app.MapGet("/api/keybind/ability", () => KeybindProcedure.Abilities()).WithOpenApi();

app.MapGet("/api/ability", () => AbilityProcedure.Abilities()).WithOpenApi();
app.MapGet("/api/ability/db/shop", () => ShopProcedure.DbShop()).WithOpenApi();

app.MapGet("/api/fog", () => FogProcedure.Fog()).WithOpenApi();

app.MapGet("/api/report", () => ReportProcedure.Report()).WithOpenApi();

app.MapGet("/api/level/settings", () => LevelUpProcedure.ExpSettings()).WithOpenApi();
app.MapGet("/api/level/gain", () => LevelUpProcedure.ExpGain()).WithOpenApi();
app.MapGet("/api/level/multi", () => LevelUpProcedure.ExpMulti()).WithOpenApi();

app.MapGet("/api/spawn/bulk", () => SpawnProcedure.Bulk()).WithOpenApi();
app.MapGet("/api/spawn/stream", () => SpawnProcedure.Stream()).WithOpenApi();

app.MapGet("/api/enums", () => EnumsProcedume.Enums()).WithOpenApi();

app.MapGet("/api/upgrade", () => UpgradeProcedure.UpgradeConfig()).WithOpenApi();
app.MapGet("/api/upgrade/db/basic", () => UpgradeProcedure.DbUpgradesBasic()).WithOpenApi();
app.MapGet("/api/upgrade/db/legendary", () => UpgradeProcedure.DbUpgradesLegendary()).WithOpenApi();
app.MapGet("/api/upgrade/db/weapon", () => UpgradeProcedure.DbUpgradesWeapon()).WithOpenApi();
app.MapGet("/api/upgrade/db/tier", () => UpgradeProcedure.DbUpgradesTier()).WithOpenApi();

app.MapGet("/api/html/player", () => HtmlProcedure.PlayerInterfaceSize()).WithOpenApi();
app.MapGet("/api/html/skill", () => HtmlProcedure.SkillInterfaceSize()).WithOpenApi();
app.MapGet("/api/html/db/upgrade", () => HtmlProcedure.DbUpgradeHtml()).WithOpenApi();

app.MapGet("/api/highscore/get", () => HighscoreProcedure.Get()).WithOpenApi();
app.MapPost("/api/highscore/post", (HighscoreModel highscore) => HighscoreProcedure.Post(highscore)).WithOpenApi();

app.Run();