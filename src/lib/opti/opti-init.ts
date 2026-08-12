import "./client-config";
import { bootstrap } from "global-agent";
import { initContentTypeRegistry } from "@optimizely/cms-sdk";
import { initReactComponentRegistry } from "@optimizely/cms-sdk/react/server";
import { experienceRegistry } from "@/components/cms/experiences";
import { pageRegistry } from "@/components/cms/pages/registry";
import { componentRegistry } from "@/components/cms/components/registry";
import { elementRegistry } from "@/components/cms/elements/registry";
import { sectionRegistry } from "@/components/cms/sections/registry";
import { contractComponentRegistry } from "@/components/cms/contracts/component-contracts/registry";
import { structuralComponentRegistry } from "@/components/cms/structural-components/registry";
import { dataRegistry } from "@/components/cms/data/registry";
import { getAllTypesUpdated } from "./opti-init-utils";

bootstrap();

const allTypes = getAllTypesUpdated();

initContentTypeRegistry(allTypes);

initReactComponentRegistry({
  resolver: {
    ...pageRegistry,
    ...experienceRegistry,
    ...componentRegistry,
    ...dataRegistry,
    ...structuralComponentRegistry,
    ...elementRegistry,
    ...sectionRegistry,
    ...contractComponentRegistry,
    // Empty component should return null
    _Content: () => null,
  },
});
