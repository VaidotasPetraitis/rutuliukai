namespace Procedure.Utils.TypeCoversion {
    public class TypeConvertion {
        public static object StringToIntObject(string value)
        {
            if (value.StartsWith("[") && value.EndsWith("]"))
            {
                var stringElements = value.Trim('[', ']').Split(',');
                return stringElements.Select(double.Parse).ToArray();
            }
            else
            {
                return double.Parse(value);
            }
        }

        public static object StringToStringObject(string value)
        {
            if (value.Contains(',') && value.Length > 0)
            {
                var stringElements = value.Split(',');
                return stringElements.ToArray();
            }
            else
            {
                return value;
            }
        }
    }
}