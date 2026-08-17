import { getClient } from "@optimizely/cms-sdk";

export const COMMON_PAGINATION_QUERY = `$cursor: String, $limit: Int = 100`;
export const COMMON_PAGINATION_FILTER = `limit: $limit, cursor: $cursor`;

export async function getPaginatedResults<TResult extends ResultWithKey>(
  query: string,
  params?: Record<string, unknown> | null,
) {
  //($cursor: String, $limit: Int = 100)
  //(limit: $limit, cursor: $cursor)
  if (!query.includes("cursor: $cursor")) {
    throw Error(`Query does not contain cursor: $cursor.  ${query}`);
  }
  const client = getClient();
  let hasNext = true;
  let cursor = null;
  const results: TResult[] = [];
  let loopCount = 0;
  while (hasNext) {
    const dataResults = (await client.request(query, {
      ...params,
      cursor,
    })) as PaginatedResult<TResult>;
    cursor = dataResults.data.cursor;
    hasNext = !!dataResults.data.cursor && dataResults.data.items.length > 0;
    results.push(...dataResults.data.items);
    loopCount++;
    if (loopCount > 10) {
      throw Error("Possible infinite loop");
    }
  }
  return results;
}

export interface ResultWithKey {
  _metadata: {
    key: string;
  };
}
export interface PaginatedResult<T extends ResultWithKey = ResultWithKey> {
  data: {
    items: ({
      _metadata: {
        key: string;
      };
    } & T)[];
    cursor: string | undefined;
  };
}
