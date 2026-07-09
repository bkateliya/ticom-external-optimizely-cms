import type { contentType, ContentTypes } from "@optimizely/cms-sdk";

/** Lets us use a contract as a component type for TypeScript support. */
export type ContractContentType<
  T extends ContentTypes.Contract | ContentTypes.Contract[],
> = ReturnType<
  typeof contentType<{
    key: string;
    displayName: string;
    baseType: "_component";
    extends: T extends ContentTypes.Contract ? [T] : T;
  }>
>;
