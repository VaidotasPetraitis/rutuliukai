namespace Model.Html
{
    record PlayerInterface(int Width, int Scale);
    record SkillInterface(int Width, int Scale, int Slots);
    public record UpgraderHtml(int Id, int Len, string Text, string Operator, string Sign, string Factor, string Color);
    public record UpgradeHtmlDynamic(int Len, object Text, object Operator, object Sign, object Factor, object Color);
};