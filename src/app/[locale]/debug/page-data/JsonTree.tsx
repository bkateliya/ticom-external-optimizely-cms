/**
 * Collapsible JSON tree for the page-data inspector.
 *
 * Built on native `<details>` so it stays a server component — expand/collapse
 * works with no client bundle, and the browser's find-in-page still reaches
 * anything that's open. `openDepth` decides how much is expanded on load; the
 * page drives it from the `expand` query param so "expand/collapse all" is just
 * a link.
 */

export type JsonValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | JsonValue[]
  | { [key: string]: JsonValue };

/** Strings longer than this collapse behind their own disclosure. */
const LONG_STRING = 160;

/** Everything expanded — CMS content nests deeply but never this deep. */
export const EXPAND_ALL_DEPTH = 999;

function isRecord(value: JsonValue): value is { [key: string]: JsonValue } {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function entriesOf(value: JsonValue[] | { [key: string]: JsonValue }) {
  return Array.isArray(value)
    ? value.map((item, index) => [String(index), item] as const)
    : (Object.entries(value) as (readonly [string, JsonValue])[]);
}

function Label({ name }: { name: string }) {
  return <span className="text-sky-800">{name}: </span>;
}

/** Shape summary shown on a collapsed branch, e.g. `{7} TI_Hero_Component`. */
function Summary({
  value,
}: {
  value: JsonValue[] | { [key: string]: JsonValue };
}) {
  if (Array.isArray(value)) {
    return (
      <span className="text-gray-500">
        [{value.length}
        {value.length === 1 ? " item" : " items"}]
      </span>
    );
  }

  // The content type is the single most useful thing to see without expanding.
  const typename =
    typeof value.__typename === "string" ? value.__typename : null;
  return (
    <>
      <span className="text-gray-500">{`{${Object.keys(value).length}}`}</span>
      {typename && <span className="ml-2 text-indigo-700">{typename}</span>}
    </>
  );
}

function Scalar({ value }: { value: Exclude<JsonValue, object> }) {
  if (value === null) return <span className="text-gray-500 italic">null</span>;
  if (value === undefined)
    return <span className="text-gray-500 italic">undefined</span>;
  if (typeof value === "boolean")
    return <span className="text-purple-700">{String(value)}</span>;
  if (typeof value === "number")
    return <span className="text-blue-700">{value}</span>;
  return (
    <span className="break-words text-green-700">&quot;{value}&quot;</span>
  );
}

export function JsonNode({
  name,
  value,
  depth,
  openDepth,
}: {
  name: string;
  value: JsonValue;
  depth: number;
  openDepth: number;
}) {
  // Rich text and JSON blobs run to thousands of characters — preview them, and
  // put the rest behind a disclosure so one field can't bury the whole tree.
  if (typeof value === "string" && value.length > LONG_STRING) {
    return (
      <details open={depth < openDepth}>
        <summary className="cursor-pointer">
          <Label name={name} />
          <span className="text-green-700">
            &quot;{value.slice(0, LONG_STRING)}…&quot;
          </span>
          <span className="ml-2 text-gray-500">
            ({value.length.toLocaleString()} chars)
          </span>
        </summary>
        <div className="ml-2 border-l border-gray-200 pl-3 break-words whitespace-pre-wrap text-green-700">
          {value}
        </div>
      </details>
    );
  }

  if (!Array.isArray(value) && !isRecord(value)) {
    return (
      <div>
        <Label name={name} />
        <Scalar value={value} />
      </div>
    );
  }

  const entries = entriesOf(value);

  if (entries.length === 0) {
    return (
      <div>
        <Label name={name} />
        <span className="text-gray-500">
          {Array.isArray(value) ? "[]" : "{}"}
        </span>
      </div>
    );
  }

  return (
    <details open={depth < openDepth}>
      <summary className="cursor-pointer">
        <Label name={name} />
        <Summary value={value} />
      </summary>
      <div className="ml-2 border-l border-gray-200 pl-3">
        {entries.map(([key, child]) => (
          <JsonNode
            key={key}
            name={key}
            value={child}
            depth={depth + 1}
            openDepth={openDepth}
          />
        ))}
      </div>
    </details>
  );
}

export function JsonTree({
  data,
  openDepth,
}: {
  data: { [key: string]: JsonValue };
  openDepth: number;
}) {
  return (
    <div className="font-mono text-xs leading-6">
      {Object.entries(data).map(([key, value]) => (
        <JsonNode
          key={key}
          name={key}
          value={value as JsonValue}
          depth={0}
          openDepth={openDepth}
        />
      ))}
    </div>
  );
}
