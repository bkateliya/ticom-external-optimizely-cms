export const DEFAULT_VALUE = "DEFAULT";
export function undefinedIfDefault<T>(value: T) {
    if (!value || value === DEFAULT_VALUE) {
        return undefined;
    }
    return value;
}