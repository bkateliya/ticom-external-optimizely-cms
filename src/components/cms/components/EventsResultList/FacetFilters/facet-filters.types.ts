// Generic facet shapes, shared by any list that refines itself with checkboxes.

export interface FacetOption {
  value: string;
  displayName: string;
  count: number;
}

export interface FacetGroup {
  id: string;
  label: string;
  options: FacetOption[];
}

export type SelectedFacets = Record<string, Set<string>>;

export type FacetChangeHandler = (
  facetId: string,
  value: string,
  checked: boolean,
) => void;

export type FacetLayout = "rail" | "dialog";
