namespace Model.Fog 
{
    public class FogModel{
        public FogSettings Settings { get; private set; }
        public FogScaling Scaling { get; private set; }
        public FogModel(FogSettings _settings, FogScaling _scaling){
            Settings = _settings;
            Scaling = _scaling;
        }
    };

    public record FogSettings (int Size, FogStrength Strength, FogRGBA Rgba);
    public record FogScaling (double Alpha, int Red, int Size);
    public record FogStrength (double From, double To);
    public record FogRGBA ( int[] From, int[] To);
};

