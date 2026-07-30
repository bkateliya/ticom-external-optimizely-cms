import { ComponentRegistry } from "@/lib/ts/component-props";
import { ApplicationListing } from "./ApplicationListing/ApplicationListing";
import { ApplicationListingComponentType } from "./ApplicationListing/ApplicationListing.model";

export const applicationListingComponentRegistry: ComponentRegistry = {
  [ApplicationListingComponentType.key]: ApplicationListing,
};
