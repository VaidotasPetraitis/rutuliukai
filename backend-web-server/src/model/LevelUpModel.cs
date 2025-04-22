namespace Model.LevelUp
{
    record ExpGain(int Min, int Max, int MaxGain);
    record ExpMulti(double Min, double Max);
    record ExpSettings(int Current, int ExpRequired, int ExpCurrent);
}