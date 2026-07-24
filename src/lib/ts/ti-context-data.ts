import { ContextData } from "@optimizely/cms-sdk/react/server";

export interface TiContextData extends ContextData {
  gtmId: string;
  favIcon: string;
}