import { getLocale } from "next-intl/server";
import { cache } from "react";
import { SERVER_ENV_VARS } from "../env/server-env";
import { DEFAULT_LOCALE } from "@/constants/locales";

const BASE = !!SERVER_ENV_VARS.CMS_API_DOMAIN
  ? `${SERVER_ENV_VARS.CMS_API_DOMAIN}/cmsapi`
  : SERVER_ENV_VARS.WEB_SERVICE_DOMAIN;

export const getProductFamily = cache(async function (familyId: string) {
  const url = `${BASE}/productfamily/${familyId}/all`;

  return await fetchData<Family>(url);
});

export const getSilos = cache(async function () {
  const url = `${BASE}/productfamily/silofamilies`;

  const result = await fetchData<{ content: SiloFamily[] }>(url);
  return result?.content;
});

export const getApplication = cache(async function (applicationId: string) {
  const url = `${BASE}/application/id/${applicationId}/all`;

  return await fetchData<ApplicationResponse>(url);
});

function formatLanguageForFeaturedProducts(language: string) {
  if (!language) language = DEFAULT_LOCALE;
  const [part1, part2] = language.split("-", 2);
  return `${part1.toLowerCase()}-${part2.toUpperCase()}`;
}

export interface GetFeaturedProductsParams {
  language: string;
  familyId?: number | null;
}
export const getFeaturedProducts = cache(async function ({
  language,
  familyId,
}: GetFeaturedProductsParams) {
  language = formatLanguageForFeaturedProducts(language);
  const hasFamily = !!familyId && !isNaN(+familyId);
  const url = hasFamily
    ? `${BASE}/featuredproducts/featuredProducts/family/${familyId}?language=${encodeURIComponent(language)}`
    : `${BASE}/featuredproducts/featuredProducts?language=${encodeURIComponent(language)}`;

  const result = await fetchData<FeaturedProductsResponse>(url);
  if (!result || (result.featuredProductInfo.errorList?.length ?? 0) > 0) {
    console.warn(result?.featuredProductInfo.errorList?.join("\n"));
  }
  return result;
});

async function fetchData<T>(url: string, optionsOverride: RequestInit = {}) {
  try {
    const baseOptions = await getRequestOptions();
    const response = await fetch(url, { ...baseOptions, ...optionsOverride });

    const responseJson = (await response.json()) as T;
    return responseJson;
  } catch (err) {
    console.error(`Error loading ${url}:`);
    console.error(err);
    return null;
  }
}

async function getRequestOptions(): Promise<RequestInit> {
  const headers = {
    Authorization: `Bearer ${await getBearerToken()}`,
    "Content-Language": await getLocale(),
  };
  return {
    headers,
    signal: AbortSignal.timeout(SERVER_ENV_VARS.CMS_API_TIMEOUT_MS),
  };
}

const getBearerToken = cache(async function () {
  // If we already have a bearer token, we don't need to fetch one
  if (SERVER_ENV_VARS.CMS_API_BEARER_TOKEN) {
    return SERVER_ENV_VARS.CMS_API_BEARER_TOKEN;
  }
  const body = await fetchData<{ access_token?: string }>(
    `${SERVER_ENV_VARS.ACCESS_TOKEN_URL}?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${btoa(`${SERVER_ENV_VARS.ACCESS_TOKEN_CLIENT_ID}:${SERVER_ENV_VARS.ACCESS_TOKEN_CLIENT_SECRET}`)}`,
      },
      method: "POST",
    },
  );

  if (!body?.access_token) {
    console.error("Invalid Token Response", body);
  }
  return body?.access_token;
});

export interface SiloFamily {
  familyId: number;
  parentId: number;
  familyName: string;
  sortOrder: number;
  familyUrl: string;
  enFamilyName: string;
}
export type Y_N = "N" | "Y";
export interface Family {
  familyId: number;
  parentId: number;
  familyName: string;
  treelevel: number;
  familyAliasId: number;
  parentFamilyId: number;
  deviceCount: number;
  militaryDeviceCount: string;
  automotiveDeviceCount: number;
  shortAliasName: string;
  virtualUrl: null | string;
  isVirtual: Y_N;
  isLastLeaf: Y_N;
  isLeaf: Y_N;
  isVirtualNode: Y_N;
  sortOrder: number;
  inputMode: "YES";
  isTopLevelFamily: Y_N;
  topLevelFamilyId: string | null;
  topLevelFamilyName: string | null;
  topLevelFamilyUrl: string | null;
  altProductTreeFlag: Y_N;
  selToolUrl: string | null;
  productNodeUrl: string | null;
  rootFamily: string | null;
  enFamilyName: string;
  ancestors: Family[];
  children: Family[];
  tree: Family[];
}

export interface Application {
  appUrl: string | null;
  childId: number;
  navAvailability: Y_N;
  navLink: Y_N;
  parentAppId: number | null;
  parentId: null;
  parentSortOrder: number;
  sectionName: string;
  sortOrder: number;
  typeLevel: number;
  enSectionName: string;
  virtualParentId: number | null;
}

export interface Literature {
  conciseDescription: string;
  docSubTypeId: number;
  documentCategory: {
    docCategoryId: number;
    docCategory: string;
    docCategoryDirectory: string;
    sortOrder: number;
  };
  documentType: string;
  isProtected: number;
  litHitCount: number;
  litWebFileAvailability: {
    fileExtension: string;
    byteSize: number;
  }[];

  literatureId: number;
  literatureNumber: string | null;
  literatureZipFileDesc: string | null;
  localeId: string | null;
  originationDate: number;
  revisionDate: string | null;
  webFileName: string | null;
  productGroup: string | null;
  processType: string | null;
}
export interface ApplicationResponse {
  AppHierarchyList: Application[];
  appAreaEndEquipAssoc: string | null;
  appAreaName: string | null;
  appId: number;
  parentId: string | null;
  appUrl: string | null;
  bdBlockDiagram: string | null;
  description: string;
  eeqShortUrl: null;
  literatureGet: Literature[];
  teamSiteContentId: number;
  teamSitePath: string | null;
  typeId: number;
  parentAppAreaName: string | null;
  parentAppAreaURL: string | null;
  ancestors: Application[];
  children: Application[];
  similarAppList: Application[];
}
export interface FeaturedProductsPartNumberInformation {
  id: number;
  genericPartId: number;
  genericPartNumber: string;
  familyId: string;
  familyName: string;
  famileNameEn: string;
  treeLevel: number;
  deviceDescription: string;
  releaseDate: string;
  marketingStatusId: number;
  marketingStatus: string;
  marketingStatusDescription: string;
  newFlag: boolean;
  partImageAvailable: boolean;
  partImageUrl: string;
  selectionToolUrl: string;
  currency: string;
  approximatePrice: number | null;
  displayQuantity: string;
  datasheetAvailable: boolean;
  datasheetUrl: string;
  language: string;
  gpnUrl: string;
}
export interface FeaturedProductsResponse {
  featuredProductInfo: {
    errorList?: string[] | null;
    partNumberInformation?: FeaturedProductsPartNumberInformation[] | null;
  };
}
