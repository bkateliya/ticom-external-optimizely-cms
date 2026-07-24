import "@/lib/opti/client-config";
import { getClient } from "@optimizely/cms-sdk";
import { PageContentContract } from "@/components/cms/contracts/page-contacts/page-content.model";
import { NextRequest } from "next/server";
import { GoldenSourcedDataContract } from "@/components/cms/contracts/page-contacts/golden-sourced.model";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  const familyid = request.nextUrl.searchParams.get("familyid");

  const applicationid = request.nextUrl.searchParams.get("applicationid");

  const { applicationIdToKeyMap, applicationKeyToIdMap } =
    await getAllApplications();

  const { familyIdToKeyMap, familyKeyToIdMap } = await getAllFamilies();

  let query: string;
  let vars;
  if (category === "family") {
    query = GOLDEN_SOURCED_FAMILY_QUERY;
    vars = null;
  } else if (category === "application") {
    query = GOLDEN_SOURCED_APPLICATION_QUERY;
    vars = null;
  } else if (category === "other") {
    query = GOLDEN_SOURCED_OTHER_QUERY;
    vars = null;
  } else if (familyid) {
    query = GOLDEN_SOURCED_KEY_QUERY;
    const key = familyIdToKeyMap[familyid];
    if (!key) {
      return Response.json([]);
    }
    vars = { key: key };
  } else if (applicationid) {
    query = GOLDEN_SOURCED_KEY_QUERY;
    const key = applicationIdToKeyMap[applicationid];
    if (!key) {
      return Response.json([]);
    }
    vars = { key: key };
  } else {
    query = ALL_PAGE_QUERY;
    vars = undefined;
  }

  const results = await getPaginatedResults(query, vars);
  const keys = results.map((x) => x._metadata.key);

  const finalItems = await getPaginatedResults<PageContentResult>(DATA_QUERY, {
    keys,
  });

  // We unfortunately cannot do this in a single query because they are different contracts
  const gsItems = await getPaginatedResults<GoldenSourcedResult>(
    GOLDEN_SOURCED_QUERY,
    {
      keys,
    },
  );

  const finalResult: ContentServiceResult[] = finalItems.map((x) => ({
    applicationid:
      applicationKeyToIdMap[
        gsItems.find((y) => y._metadata.key === x._metadata.key)?.application
          ?.key ?? ""
      ] || "",
    displayorder: -1,
    familyid:
      familyKeyToIdMap[
        gsItems.find((y) => y._metadata.key === x._metadata.key)?.productFamily
          ?.key ?? ""
      ] || "",
    hideinnavigation: x.hideInNavigation ?? false,
    language: x._metadata.locale.replace(/\-\w+\-/, "_").replace("-", "_"),
    navigationtitle:
      x.navigationTitle || x.pageTitle || x._metadata.displayName,
    pagename: x.pageTitle || x._metadata.displayName,
    pagetype: x._itemMetadata.type,
    tags: [],
    url: `${x._metadata.url.base}${x._metadata.url.hierarchical}`,
  }));

  return Response.json(finalResult);
}

interface ContentServiceResult {
  applicationid: string;
  displayorder: number;
  familyid: string;
  hideinnavigation: boolean;
  language: string;
  navigationtitle: string;
  pagename: string;
  pagetype: string;
  tags: string[];
  url: string;
}

const COMMON_QUERY = `$cursor: String, $limit: Int = 100`;
const COMMON_FILTER = `limit: $limit, cursor: $cursor`;
const GOLDEN_SOURCED_FAMILY_QUERY = `query(${COMMON_QUERY}) {
  data: TI_GoldenSourcedData_Contract(
    where: { productFamily: { key: { exist: true } } } 
    ${COMMON_FILTER}
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;

const GOLDEN_SOURCED_APPLICATION_QUERY = `query(${COMMON_QUERY}) {
  data: TI_GoldenSourcedData_Contract(
    where: { application: { key: { exist: true } } } 
    ${COMMON_FILTER}
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;

const GOLDEN_SOURCED_OTHER_QUERY = `query(${COMMON_QUERY}) {
  data: TI_GoldenSourcedData_Contract(
    where: { 
      application: { key: { exist: false } }
      productFamily: { key: { exist: false } }
    } 
    ${COMMON_FILTER}
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;

const GOLDEN_SOURCED_KEY_QUERY = `query ($key: String, ${COMMON_QUERY}) {
  data: TI_GoldenSourcedData_Contract(
    where: { 
    _or: [
        { application: { key: { eq: $key } } }
        { productFamily: { key: { eq: $key } } }
      ]
    }
    ${COMMON_FILTER}
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;

const ALL_PAGE_QUERY = `query(${COMMON_QUERY}) {
  data: _Content(
    where: {
      _and: [
        {
          _metadata: { types: { in: "_Page" } }
        }
      ]
    }
    ${COMMON_FILTER}
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;

const GET_ALL_FAMILIES = `query (${COMMON_QUERY}) {
  data: TI_ProductFamily_Data(${COMMON_FILTER}) {    
    items {
      _metadata {
        displayName
        key
      }
      familyId
    }
    cursor
  }
}`;
interface FamilyResult extends ResultWithKey {
  familyId: string;
}
async function getAllFamilies() {
  const familyKeyToIdMap: Record<string, string> = {};
  const familyIdToKeyMap: Record<string, string> = {};

  const items = await getPaginatedResults<FamilyResult>(GET_ALL_FAMILIES);
  items.forEach((x) => {
    familyIdToKeyMap[x.familyId] = x._metadata.key;
    familyKeyToIdMap[x._metadata.key] = x.familyId;
  });

  return { familyKeyToIdMap, familyIdToKeyMap };
}

const GET_ALL_APPLICATIONS = `query (${COMMON_QUERY}) {
  data: TI_Application_Data(${COMMON_FILTER}) {    
    items {
      _metadata {
        displayName
        key
      }
      applicationId
    }
    cursor
  }
}`;

interface ApplicationResult extends ResultWithKey {
  applicationId: string;
}

async function getAllApplications() {
  const applicationKeyToIdMap: Record<string, string> = {};
  const applicationIdToKeyMap: Record<string, string> = {};

  const items =
    await getPaginatedResults<ApplicationResult>(GET_ALL_APPLICATIONS);
  items.forEach((x) => {
    applicationIdToKeyMap[x.applicationId] = x._metadata.key;
    applicationKeyToIdMap[x._metadata.key] = x.applicationId;
  });

  return { applicationKeyToIdMap, applicationIdToKeyMap };
}

interface ResultWithKey {
  _metadata: {
    key: string;
  };
}
interface PaginatedResult<T extends ResultWithKey = ResultWithKey> {
  data: {
    items: ({
      _metadata: {
        key: string;
      };
    } & T)[];
    cursor: string | undefined;
  };
}
async function getPaginatedResults<TResult extends ResultWithKey>(
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

interface PageContentResult extends ResultWithKey {
  _itemMetadata: {
    type: string;
  };
  _metadata: {
    key: string;
    locale: string;
    displayName: string;
    url: {
      base: string;
      hierarchical: string;
    };
  };
  navigationTitle: string;
  pageTitle: string;
  hideInNavigation: boolean;

  application?: { key: string };
  family?: { key: string };
}

interface GoldenSourcedResult extends ResultWithKey {
  application?: { key: string };
  productFamily?: { key: string };
}

const DATA_QUERY = `query PageData($keys: [String], ${COMMON_QUERY}) {
  data: ${PageContentContract.key}(
    where: { _itemMetadata: { key: { in: $keys } } }
    ${COMMON_FILTER}
  ) {
    cursor
    items {
      _itemMetadata {
        type
      }
      _metadata {
        locale
        displayName
        url {
          base
          hierarchical
        }
        types
        key
      }
        ... on ${PageContentContract.key} {
        navigationTitle
        pageTitle
        hideInNavigation
      }
    }
  }
}`;

const GOLDEN_SOURCED_QUERY = `query PageData($keys: [String], ${COMMON_QUERY}) {
  data: ${GoldenSourcedDataContract.key}(
    where: { _itemMetadata: { key: { in: $keys } } }
    ${COMMON_FILTER}
  ) {
    cursor
    items {    
      _metadata {
        key
      }
      ... on ${GoldenSourcedDataContract.key} {
        application {
          key          
        }
        productFamily {
          key
        }
      }
    }
  }
}`;
