import { OptimizelyComponent } from "@optimizely/cms-sdk/react/server";
import { ComponentProps } from "react";

export type OptimizelyContentProps = ComponentProps<
  typeof OptimizelyComponent
>["content"];

export interface ExtendedOptimizelyComponentProps extends Omit<
  ComponentProps<typeof OptimizelyComponent>,
  "content"
> {
  content?: OptimizelyContentProps | null;
  parentField?: string;
}
/**
 * Allows us to pass additional props without TypeScript complaining.
 * Note: The underlying OptimizelyComponent is async, so this is marked as async as well.
 * @param props - The props for the ExtendedOptimizelyComponent
 * @returns The ExtendedOptimizelyComponent
 */
export async function ExtendedOptimizelyComponent({
  content,
  ...props
}: ExtendedOptimizelyComponentProps) {
  if (!content) {
    return null;
  }
  return <OptimizelyComponent {...props} content={content} />;
}
