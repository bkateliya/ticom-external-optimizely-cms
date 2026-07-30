import { Family, getProductFamily, getSilos, SiloFamily } from "../cms-api";

export interface FamilyWithSiblings extends Family {
  siblings: Family[];
}

export interface FamilyInfo extends FamilyWithSiblings {
  ancestors: FamilyWithSiblings[];
  children: Family[];
  silos: SiloFamily[];
}

export async function getNormalizedFamilyInfo(familyId: string) {
  const familyResponse = await getProductFamily(familyId);
  const silos = await getSilos();

  const result: FamilyInfo = {
    ...familyResponse,
    ancestors: [],
    siblings: [],
    children: [],
    silos,
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
