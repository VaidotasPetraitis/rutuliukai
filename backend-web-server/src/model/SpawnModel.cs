namespace Model.Spawn
{
    record SpawnBulk(double Chance, int Number);
    record SpawnStream(int? Freq, int Bulk);
};