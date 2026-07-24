import messages from '../../messages/normalized.json';

// This gives us intellisense for the dictionary entries.
declare module 'next-intl' {
  interface AppConfig {
    Messages: typeof messages;
  }
}