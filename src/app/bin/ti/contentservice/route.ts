import { getClient } from "@optimizely/cms-sdk";
import '@/lib/opti/client-config';
import { ApplicationReferenceContract } from "@/components/cms/contracts/page-contacts/application-reference.model";
import { FamilyReferenceContract } from "@/components/cms/contracts/page-contacts/family-reference.model";
import { PageContentContract } from "@/components/cms/contracts/page-contacts/page-content.model";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    const category = request.nextUrl.searchParams.get('category');

    const familyid = request.nextUrl.searchParams.get('familyid');

    const applicationid = request.nextUrl.searchParams.get('applicationid');
    const client = getClient()
    let query: string;
    let vars;
    if (category === "family") {
        query = FAMILY_QUERY;
        vars = undefined;
    } else if (category === "application") {
        query = APPLICATION_QUERY;
        vars = undefined;
    } else if (category === "other") {
        query = OTHER_PAGE_QUERY;
        vars = undefined;
    } else if (familyid) {
        query = FAMILY_ID_QUERY;
        vars = { "id": familyid };
    } else if (applicationid) {
        query = APPLICATION_ID_QUERY;
        vars = { "id": applicationid };
    } else {
        query = ALL_PAGE_QUERY;
        vars = undefined;
    }
    const results = (await client.request(query, vars)) as MetaDataKeyResult;
    const keys = results.data.items.map(x => x._metadata.key);
    const dataResults = (await client.request(DATA_QUERY, { keys })) as DataResult;

    const finalResult: ContentServiceResult[] = dataResults.data.items.map(x => ({
        applicationid: x.applicationId || "",
        displayorder: -1,
        familyid: x.familyId || "",
        hideinnavigation: false,
        language: x._metadata.locale.replace(/\-\w+\-/, '_').replace('-', '_'),
        navigationtitle: x.navigationTitle || x.pageTitle || x._metadata.displayName,
        pagename: x.pageTitle || x._metadata.displayName,
        pagetype: x._itemMetadata.type,
        tags: [],
        url: `${x._metadata.url.base}${x._metadata.url.hierarchical}`
    }))
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
            }
        }[]
    }
}

const APPLICATION_QUERY = `query {
  data: TI_ApplicationReference_Contract(
    where: { applicationId: { exist: true } }
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`

const FAMILY_QUERY = `query {
  data: TI_FamilyReference_Contract(
    where: { familyId: { exist: true } }
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`

const APPLICATION_ID_QUERY = `query ($id: String) {
  data: TI_ApplicationReference_Contract(
    where: { applicationId: { eq: $id } }
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`

const FAMILY_ID_QUERY = `query ($id: String) {
  data: TI_FamilyReference_Contract(
    where: { familyId: { eq: $id } }
  ) {
    items {
      _metadata {
        key
      }
    }
  }
}`

const OTHER_PAGE_QUERY = `query {
  data: _Content(
    where: {
      _and: [
        {
          _metadata: { types: { in: "_Page", notIn: ["${ApplicationReferenceContract.key}", "${FamilyReferenceContract.key}"] } }
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
}`

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
}`

interface DataResult {
    data: {
        items: {
            _itemMetadata: {
                type: string;
            }
            _metadata: {
                locale: string;
                displayName: string;
                url: {
                    base: string;
                    hierarchical: string;
                }
            }
            navigationTitle: string;
            pageTitle: string;
            applicationId: string;
            familyId: string;
        }[]
    }
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
}`