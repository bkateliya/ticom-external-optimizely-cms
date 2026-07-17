import "./client-config";
import { bootstrap } from 'global-agent';
import { initContentTypeRegistry } from "@optimizely/cms-sdk";
import { initReactComponentRegistry } from "@optimizely/cms-sdk/react/server";
import {
  experienceRegistry,
  experienceTypes,
} from "@/components/cms/experiences";
import { pageTypes } from "@/components/cms/pages/types";
import { pageRegistry } from "@/components/cms/pages/registry";
import { allComponentTypes } from "@/components/cms/components/types";
import { componentRegistry } from "@/components/cms/components/registry";
import { elementTypes } from "@/components/cms/elements/types";
import { elementRegistry } from "@/components/cms/elements/registry";
import { sectionTypes } from '@/components/cms/sections/types';
import { sectionRegistry } from '@/components/cms/sections/registry';
import { contractComponentTypes } from '@/components/cms/contracts/component-contracts/types';
import { contractComponentRegistry } from '@/components/cms/contracts/component-contracts/registry';
import { structuralComponentTypes } from "@/components/cms/structural-components/types";
import { structuralComponentRegistry } from "@/components/cms/structural-components/registry";


bootstrap();
// Configure Optimizely Graph client

initContentTypeRegistry([
  ...experienceTypes,
  ...pageTypes,
  ...allComponentTypes,
  ...structuralComponentTypes,
  ...elementTypes,
  ...sectionTypes,
  ...contractComponentTypes]);

initReactComponentRegistry({
  resolver: {
    ...pageRegistry,
    ...experienceRegistry,
    ...componentRegistry,
    ...structuralComponentRegistry,
    ...elementRegistry,
    ...sectionRegistry,
    ...contractComponentRegistry,
    // Empty component should return null
    _Content: () => null,
  },
});