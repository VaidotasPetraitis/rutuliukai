namespace Procedure.Utils.EnumService {
    public class EnumService
    {
        public static string GetEnumValueAsString<T>(T value) where T : Enum
        {
            return value.ToString();
        }

        public static Dictionary<string, string> GetEnumValues<T>()
        {
            Array enumValues = Enum.GetValues(typeof(T));
            var enumDictionary = new Dictionary<string, string>();
            foreach (object value in enumValues)
            {
                string? stringValue = value?.ToString();
                if (stringValue != null)
                {
                    enumDictionary.Add(stringValue, stringValue);
                };
            };
            return enumDictionary;
        }
    }
}