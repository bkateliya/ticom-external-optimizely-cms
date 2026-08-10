import { getClient } from "@optimizely/cms-sdk";
import { InferredContentReference } from "@/lib/ts/field-props";
import { deepSearch } from "@/lib/utils/object-utils";
import { getContext } from "@optimizely/cms-sdk/react/server";

export function getBynderImageFromContext(
  content: InferredContentReference,
): BynderImage | undefined {
  const { bynderImages } = getContext() ?? {};
  if (!bynderImages) {
    throw new Error(
      "Bynder images not found in context, ensure that findAllBynderAssetsOnPage has been called",
    );
  }
  return bynderImages?.[content?.key ?? ""];
}
export function getBynderDocumentFromContext(
  content: InferredContentReference,
): BynderDocument | undefined {
  const { bynderDocuments } = getContext() ?? {};
  if (!bynderDocuments) {
    throw new Error(
      "Bynder documents not found in context, ensure that findAllBynderAssetsOnPage has been called",
    );
  }
  return bynderDocuments?.[content?.key ?? ""];
}
export function getBynderVideoFromContext(
  content: InferredContentReference,
): BynderVideo | undefined {
  const { bynderVideos } = getContext() ?? {};
  if (!bynderVideos) {
    throw new Error(
      "Bynder videoss not found in context, ensure that findAllBynderAssetsOnPage has been called",
    );
  }
  return bynderVideos?.[content?.key ?? ""];
}

export async function findAllBynderAssetsOnPage(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  page: any,
) {
  const client = getClient();

  const { ids: imageIds, sourceRefs: imageRefs } = getRefIds(
    page,
    "BynderImage",
  );

  const { ids: documentIds, sourceRefs: documentRefs } = getRefIds(
    page,
    "BynderDocument",
  );

  const { ids: videoIds, sourceRefs: videoRefs } = getRefIds(
    page,
    "BynderVideo",
  );

  const response = (await client.request(BynderImageQuery, {
    imageIds: imageIds,
    documentIds,
    videoIds,
  })) as BynderQueryResult;

  const bynderImageMap = getResourceMap(
    imageRefs,
    response.BynderImage.items,
    "BynderImage",
  );

  const bynderDocumentMap = getResourceMap(
    documentRefs,
    response.BynderDocument.items,
    "BynderDocument",
  );

  const bynderVideoMap = getResourceMap(
    videoRefs,
    response.BynderVideo.items,
    "BynderVideo",
  );

  return { bynderImageMap, bynderDocumentMap, bynderVideoMap };
}

const BynderImageQuery = `
    query GetBynderImage($imageIds: [String], $documentIds: [String], $videoIds: [String]) {
      BynderImage(ids: $imageIds) {
        items {
          ...IAssetFields
          id
          _imageMetadata {
            height
            width
          }
          description
          isPublic
          original
          property_alt_text
          property_employee_title
          property_people
          transformBaseUrl
        }
      }
      BynderDocument(ids: $documentIds) {
        items {
          ...IAssetFields
          id
          description
          isPublic
          original
        }
      }
      BynderVideo(ids: $videoIds) {
        items {
          ...IAssetFields
          id
          description
          isPublic
          original
          videoPreviewURL
        }
      }
    }
    fragment IAssetFields on _IAssetItem {
      _assetMetadata {
        url
      }
      _id
      _itemMetadata {
        displayName
      }
    }
  `;

type BynderAssetType = "BynderImage" | "BynderDocument" | "BynderVideo";

interface BynderQueryResult {
  BynderImage: {
    items: BynderImage[];
  };
  BynderDocument: {
    items: BynderDocument[];
  };
  BynderVideo: {
    items: BynderVideo[];
  };
}

export interface IAssetItem {
  _id: string;
  _assetMetadata: {
    url: string;
  };
  _itemMetadata: {
    key: string;
    displayName: string;
    type: string;
  };
}
export interface BynderImage extends IAssetItem {
  id: string;
  _imageMetadata: {
    height: number;
    width: number;
  };
  description: string;
  isPublic: 0 | 1;
  original: string;
  extension: string;
  property_alt_text: string;
  property_employee_title: string;
  property_people: string;
  transformBaseUrl: string;
}

export interface BynderDocument extends IAssetItem {
  id: string;
  _imageMetadata: {
    height: number;
    width: number;
  };
  description: string;
  isPublic: 0 | 1;
  original: string;
}

export interface BynderVideo extends IAssetItem {
  id: string;
  _imageMetadata: {
    height: number;
    width: number;
  };
  description: string;
  isPublic: 0 | 1;
  original: string;
  videoPreviewURL: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function getRefIds(root: any, type: BynderAssetType) {
  const sourceRefs = deepSearch<InferredContentReference>(
    root,
    (x) => !!x?.url?.graph?.startsWith(`graph://ocp/${type}/`),
  );

  const ids = sourceRefs.map((x) => x?.url.graph?.split(`/${type}/`)[1]);
  return { ids, sourceRefs };
}

function getResourceMap<T extends BynderDocument | BynderImage | BynderVideo>(
  sourceRefs: InferredContentReference[],
  resources: T[],
  type: BynderAssetType,
) {
  const resourceMap = sourceRefs.reduce(
    (acc, x) => {
      if (!x?.key) {
        return acc;
      }
      const item = resources.find(
        (y) => y.id === x?.url.graph?.split(`/${type}/`)[1],
      );

      if (item) {
        acc[x.key] = item;
      }
      return acc;
    },
    {} as Record<string, T>,
  );

  return resourceMap;
}
