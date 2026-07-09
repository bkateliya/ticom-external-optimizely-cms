import { ContentProps, ContentTypes } from "@optimizely/cms-sdk";

export type OptiComponentProps<T extends ContentTypes.AnyContentType> = {
  content?: ContentProps<T>;
  parentField?: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentRegistry = Record<string, React.ComponentType<any>>;
