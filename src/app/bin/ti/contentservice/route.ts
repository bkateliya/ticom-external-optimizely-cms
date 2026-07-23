import { getClient } from "@optimizely/cms-sdk";
import "@/lib/opti/client-config";
import { ApplicationReferenceContract } from "@/components/cms/contracts/page-contacts/application-reference.model";
import { FamilyReferenceContract } from "@/components/cms/contracts/page-contacts/family-reference.model";
import { PageContentContract } from "@/components/cms/contracts/page-contacts/page-content.model";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");

  const familyid = request.nextUrl.searchParams.get("familyid");

  const applicationid = request.nextUrl.searchParams.get("applicationid");
  const client = getClient();
  let query: string;
  let vars;
  if (category === "family" || category === "application") {
    query = GOLDEN_SOURCED_EXISTS_QUERY;
    vars = { isGoldenSourced: true };
  } else if (category === "other") {
    query = GOLDEN_SOURCED_EXISTS_QUERY;
    vars = { isGoldenSourced: false };
  } else if (familyid) {
    const results = (await client.request(FAMILY_ID_QUERY, {
      id: familyid,
    })) as MetaDataKeyResult;
    const familyKey = results.data.items[0]?._metadata.key;

    if (!familyKey) {
      return Response.json([]);
    }
    query = GOLDEN_SOURCED_KEY_QUERY;
    vars = { key: familyKey };
  } else if (applicationid) {
    const results = (await client.request(APPLICATION_ID_QUERY, {
      id: applicationid,
    })) as MetaDataKeyResult;
    const application = results.data.items[0]?._metadata.key;

    if (!application) {
      return Response.json([]);
    }
    query = GOLDEN_SOURCED_KEY_QUERY;
    vars = { key: application };
  } else {
    query = ALL_PAGE_QUERY;
    vars = undefined;
  }
  const results = (await client.request(query, vars)) as MetaDataKeyResult;
  if (category === "family") {
    results.data.items = results.data.items.filter(
      (x) => x.goldenSourcedData?.familyId !== undefined,
    );
  }
  if (category === "application") {
    results.data.items = results.data.items.filter(
      (x) => x.goldenSourcedData?.applicationId !== undefined,
    );
  }
  const keys = results.data.items.map((x) => x._metadata.key);
  const dataResults = (await client.request(DATA_QUERY, {
    keys,
  })) as DataResult;

  const finalResult: ContentServiceResult[] = dataResults.data.items.map(
    (x) => ({
      applicationid: x.applicationId || "",
      displayorder: -1,
      familyid: x.familyId || "",
      hideinnavigation: false,
      language: x._metadata.locale.replace(/\-\w+\-/, "_").replace("-", "_"),
      navigationtitle:
        x.navigationTitle || x.pageTitle || x._metadata.displayName,
      pagename: x.pageTitle || x._metadata.displayName,
      pagetype: x._itemMetadata.type,
      tags: [],
      url: `${x._metadata.url.base}${x._metadata.url.hierarchical}`,
    }),
  );
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

interface MetaDataKeyResult {
  data: {
    items: {
      _metadata: {
        key: string;
      };
      goldenSourcedData?: {
        familyId?: string;
        applicationId?: string;
      };
    }[];
  };
}

const GOLDEN_SOURCED_EXISTS_QUERY = `query ($isGoldenSourced: Boolean) {
  data: TI_GoldenSourcedData_Contract(
    where: { goldenSourcedData: { _itemMetadata: { key: { exist: $isGoldenSourced } } } }
  ) {
    items {
      _metadata {
        key
      }
      goldenSourcedData {
        ... on TI_ProductFamily_Data {
          familyId
        }
        ... on TI_Application_Data {
          applicationId
        }
      }
    }
  }
}`;

const GOLDEN_SOURCED_KEY_QUERY = `query ($key: String) {
  data: TI_GoldenSourcedData_Contract(
    where: { goldenSourcedData: { _itemMetadata: { key: { eq: $key } } } }
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;

const APPLICATION_ID_QUERY = `query ($id: String) {
  data: TI_Application_Data(
    where: { applicationId: { eq: $id } }
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;

const FAMILY_ID_QUERY = `query ($id: String) {
  data: TI_ProductFamily_Data(
    where: { familyId: { eq: $id } }
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;

const ALL_PAGE_QUERY = `query {
  data: _Content(
    where: {
      _and: [
        {
          _metadata: { types: { in: "_Page" } }
        }
      ]
    }
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`;

interface DataResult {
  data: {
    items: {
      _itemMetadata: {
        type: string;
      };
      _metadata: {
        locale: string;
        displayName: string;
        url: {
          base: string;
          hierarchical: string;
        };
      };
      navigationTitle: string;
      pageTitle: string;
      applicationId: string;
      familyId: string;
    }[];
  };
}

const DATA_QUERY = `query PageData($keys: [String]) {
  data: _Content(
    where: { _itemMetadata: { key: { in: $keys } } }
  ) {
    items {
      ... on ${PageContentContract.key} {
        _modified
        navigationTitle
        pageTitle
      }
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
      }
      ... on ${ApplicationReferenceContract.key} {
        applicationId
      }
      ... on ${FamilyReferenceContract.key} {
        familyId
      }
    }
  }
}`;
