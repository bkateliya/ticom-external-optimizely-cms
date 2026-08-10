
export function envToBool(value?: string) {
  const lowercaseValue = value?.toLocaleLowerCase();
  if (lowercaseValue === "true" || lowercaseValue === "1") {
    return true;
  }
  return false;
}
