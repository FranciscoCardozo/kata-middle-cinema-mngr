export default class UtilsValidations{
    public static validationMapper(key: string, value: any) {
        if (typeof value === "string") return { [key]: { S: value } };
        if (typeof value === "number") return { [key]: { N: value.toString() } };
        if (Array.isArray(value)) return { [key]: { L: value.map(v => ({ S: v.toString() })) } };
        return { [key]: { S: value.toString() } };
    }

    public static assignDefinedProperties(instance: any, object: any) {
        Object.entries(object).forEach(([key, value]) => {
            if (value !== undefined) {
                instance[key] = value;
            }
        });
    }
}