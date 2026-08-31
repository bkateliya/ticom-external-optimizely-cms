import type { ShipToItem } from '@ticom/header-components/dist/types/components/header-ship-to-selection/header-ship-to-selection.interface';
import type { CurrencyFormat } from '@ticom/header-components/dist/types/global/currency-format';
import type { User } from '@ticom/header-components/dist/types/global/user';
import type { UserPreferences } from '@ticom/header-components/dist/types/global/user-preferences';

declare global {
  // Extend window interface with com.TI globals
  // These become available after header-components finish loading
  interface Window {
    com?: {
      TI: {
        UserPreferences: typeof UserPreferences;
        User: typeof User;
        CurrencyFormat: typeof CurrencyFormat;
        ShipToList: ShipToItem[];
      };
    };
  }

  /** Dispatched by each Stencil bundle once it finishes loading. */
  type AppLoadEvent = CustomEvent<{ namespace: string }>;
  // Add Stencil appload event to window event types
  interface WindowEventMap {
    appload: AppLoadEvent;
  }
}

export {}; // Need to export something to be treated as a module