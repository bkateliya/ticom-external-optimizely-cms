import structuredClone from "@ungap/structured-clone";
import nextJest from "next/jest.js";
import type { Config } from "@jest/types";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

const config: Config.InitialProjectOptions = {
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testMatch: ["**/*.test.ts", "**/*.test.tsx"],
  testEnvironment: "jsdom",

  moduleNameMapper: {
    "^.+\\.module\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts",
    "^.+\\.(css|sass|scss)$": "<rootDir>/__mocks__/styleMock.ts",
    "^@/(.*)$": "<rootDir>/src/$1",
    "^@/lib/(.*)$": "<rootDir>/src/lib/$1",
    "^lib/(.*)$": "<rootDir>/src/lib/$1",
    "^temp/(.*)$": "<rootDir>/src/temp/$1",
    "^helpers/(.*)$": "<rootDir>/src/helpers/$1",
    "^components/(.*)$": "<rootDir>/src/components/$1",
    "^widgets/(.*)$": "<rootDir>/src/widgets/$1",
    "^stories/(.*)$": "<rootDir>/src/stories/$1",
    "^assets/(.*)$": "<rootDir>/src/assets/$1",
    "^sitecore\\.config$": "<rootDir>/sitecore.config.ts",
    "^\\.sitecore/(.*)$": "<rootDir>/.sitecore/$1",
  },

  globals: {
    // Modern browsers support structuredClone, but we need to polyfill it for jsdom
    structuredClone: structuredClone,
  },
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
const finalConfig = async () => {
  const jestConfig = await createJestConfig(config)();
  return {
    ...jestConfig,
    // We need to set this after createJestConfig is called because
    // otherwise next jest will override it
    transformIgnorePatterns: [
      "/node_modules/(?!(@sitecore-jss/sitecore-jss-nextjs|@sitecore-jss/sitecore-jss-react|@sitecore-feaas/clientside|@sitecore/byoc)/)",
    ],
  };
};

export default finalConfig;
