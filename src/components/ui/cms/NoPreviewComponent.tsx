import { OptiComponentProps } from "@/lib/ts/component-props";
import { ContentTypes } from "@optimizely/cms-sdk";

export function NoPreviewComponent({
  content,
}: OptiComponentProps<ContentTypes.ComponentContentType>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { _metadata, __typename, _id, __context, ...rest } = content ?? {};
  return (
    <div>
      <h2>Data</h2>
      <pre>{JSON.stringify(rest, null, 2)}</pre>
      <h3>Meta Data</h3>
      <pre>{JSON.stringify(_metadata, null, 2)}</pre>
    </div>
  );
}
