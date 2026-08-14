import { Family, getProductFamily } from "../cms-api";

export interface FamilyWithSiblings extends Family {
  siblings: Family[];
}

export interface FamilyInfo extends FamilyWithSiblings {
  ancestors: FamilyWithSiblings[];
  children: Family[];
}

export async function getNormalizedFamilyInfo(familyId: string) {
  const familyResponse = await getProductFamily(familyId);

  if (!familyResponse) {
    return null;
  }
  const result: FamilyInfo = {
    ...familyResponse,
    ancestors: [],
    siblings: [],
    children: [],
  };

  familyResponse.ancestors.forEach((item) => {
    const newItem: FamilyWithSiblings = {
      ...item,
      siblings: familyResponse.tree.filter((x) => x.parentId == item.parentId),
    };
    result.ancestors.push(newItem);
  });

  return result;
}
