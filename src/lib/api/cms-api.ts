import { cache } from "react";
import { SERVER_ENV_VARS } from "../env/server-env";

const BASE = !!SERVER_ENV_VARS.CMS_API_DOMAIN
  ? `${SERVER_ENV_VARS.CMS_API_DOMAIN}/cmsapi`
  : SERVER_ENV_VARS.WEB_SERVICE_DOMAIN;

const getBearerToken = cache(async function () {
  if (SERVER_ENV_VARS.CMS_API_BEARER_TOKEN) {
    return SERVER_ENV_VARS.CMS_API_BEARER_TOKEN;
  }
  const response = await fetch(
    `${SERVER_ENV_VARS.ACCESS_TOKEN_URL}?grant_type=client_credentials`,
    {
      headers: {
        Authorization: `Basic ${btoa(`${SERVER_ENV_VARS.ACCESS_TOKEN_CLIENT_ID}:${SERVER_ENV_VARS.ACCESS_TOKEN_CLIENT_SECRET}`)}`,
      },
      method: "POST",
    },
  );

  const body = await response.json();

  if (!body.access_token) {
    console.error("Invalid Token Response", body);
    throw new Error(`Access token could not be retrieved`);
  }
  return body.access_token;
});

export const getProductFamily = cache(async function (familyId: string) {
  const url = `${BASE}/productfamily/${familyId}/all`;
  const headers = {
    Authorization: `Bearer ${await getBearerToken()}`,
  };
  const response = await fetch(url, { headers });

  return (await response.json()) as Family;
});

export const getSilos = cache(async function (language?: string) {
  const url = `${BASE}/productfamily/silofamilies`;
  const headers = {
    Authorization: `Bearer ${await getBearerToken()}`,
    ...(language && { "Content-Language": language }),
  };
  const response = await fetch(url, { headers });

  const responseJson = (await response.json()) as { content: SiloFamily[] };
  return responseJson.content;
});

export const getApplication = cache(async function (
  applicationId: string,
  language?: string,
) {
  const url = `${BASE}/application/id/${applicationId}/all`;
  const headers = {
    Authorization: `Bearer ${await getBearerToken()}`,
    ...(language && { "Content-Language": language }),
  };
  const response = await fetch(url, { headers });

  const responseJson = (await response.json()) as ApplicationResponse;
  return responseJson;
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
