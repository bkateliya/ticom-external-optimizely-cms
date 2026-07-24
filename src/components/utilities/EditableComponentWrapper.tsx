import {
  ComponentContainerProps,
  getPreviewUtils,
} from "@optimizely/cms-sdk/react/server";

export function EditableComponentWrapper({
  children,
  node,
}: ComponentContainerProps) {
  return children;
  const { pa } = getPreviewUtils(node);

  const properties = pa(node);
  const blockId = properties["data-epi-block-id"];
  return (
    <div {...properties} key={blockId}>
      {children}
    </div>
  );
}
