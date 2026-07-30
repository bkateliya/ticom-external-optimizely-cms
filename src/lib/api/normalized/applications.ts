import { Application, getApplication } from "../cms-api";

export const DEFAULT_APPLICATION_ID = "120";

export interface ApplicationWithSiblings extends Application {
  siblings: Application[];
}

export interface ApplicationWithChildrenAndParent extends Application {
  parent?: Application;
  children: ApplicationWithChildrenAndParent[];
}
export interface ApplicationInfo extends ApplicationWithSiblings {
  ancestors: ApplicationWithSiblings[];
  children: ApplicationWithChildrenAndParent[];
}

/**
 * Get the application data in a normalized way that populates the ancestors and children
 * @param applicationId
 * @returns
 */
export async function getNormalizedApplicationInfo(applicationId: string) {
  const applicationResponse = await getApplication(applicationId);

  const itemMap = applicationResponse.AppHierarchyList.reduce(
    (prev, curr) => {
      prev[curr.childId] = curr;
      return prev;
    },
    {} as Record<number, Application>,
  );

  const parentMap = applicationResponse.AppHierarchyList.reduce(
    (prev, curr) => {
      // Support both parentAppId and virtualParentId
      const parentIds = [curr.parentAppId, curr.virtualParentId];
      parentIds.forEach((parentId) => {
        if (!parentId) {
          return prev;
        }
        prev[parentId] = prev[parentId] ?? [];
        prev[parentId]!.push(curr);
      });
      return prev;
    },
    {} as Record<number, Application[] | undefined>,
  );

  const currentItem = itemMap[applicationResponse.appId];

  const result: ApplicationInfo = {
    ...currentItem,
    ancestors: [],
    siblings: [],
    children: [],
  };

  result.siblings = parentMap[currentItem.parentAppId ?? -1] ?? [];

  result.children = recursiveGetChildren(parentMap, currentItem);

  applicationResponse.ancestors.forEach((ancestory) => {
    const ancestoryItem = itemMap[ancestory.childId];
    const newItem: ApplicationWithSiblings = {
      ...itemMap[ancestoryItem.childId],
      siblings: applicationResponse.AppHierarchyList.filter(
        (x) => x.parentAppId == ancestoryItem.parentAppId,
      ),
    };

    result.ancestors.push(newItem);
  });

  return result;
}

function recursiveGetChildren(
  parentMap: Record<number, Application[] | undefined>,
  currentItem: Application,
): ApplicationWithChildrenAndParent[] {
  const childrenResult: ApplicationWithChildrenAndParent[] = [];

  const children = parentMap[currentItem.childId] ?? [];

  children.forEach((child) => {
    const childResult: ApplicationWithChildrenAndParent = {
      ...child,
      children: recursiveGetChildren(parentMap, child),
    };
    childrenResult.push(childResult);
  });
  return childrenResult;
}
