export const nameofFactory =
  <T>() =>
  (name: keyof T) =>
    name;
export const nameof = <T>(name: keyof T) => name;
