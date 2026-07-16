
export interface OptiEnumValue {
  value: string;
  displayName: string;
}

export function enumToOptions(enumObject: (Record<string, string> | readonly string[]), withAuto?: boolean): OptiEnumValue[] {
  const values = Array.isArray(enumObject) ?
    enumObject.map((key) => ({ value: key, displayName: key, })) :
    Object.entries(enumObject).map(([key, value]) => ({ displayName: key, value }));
  if (withAuto) {
    return [
      {
        value: "auto",
        displayName: "Auto",
      },
      ...values
    ];
  }
  return values;
}


export function getEnumOrUndefinedForAuto<TEnum extends string>(value: string | null | undefined) {
  const enumValue = (!value || value === "auto") ? undefined : value as TEnum;
  return enumValue;
}
