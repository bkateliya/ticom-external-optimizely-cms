import {
  fallbackFileName,
  normalizedFileName,
  normalizeMessages,
} from "../i18n/request";
import fs from "fs";
import path from "path";

const directoryPath = path.resolve(__dirname, "../messages/");

const files = fs.readdirSync(directoryPath);

const combinedMessages: Record<string, string> = {};
for (const file of files) {
  if (
    file.endsWith(".json") &&
    !file.endsWith(fallbackFileName) &&
    !file.endsWith(normalizedFileName)
  ) {
    const filePath = path.resolve(directoryPath, file);
    const fileContent = fs.readFileSync(filePath, "utf8");
    const json = JSON.parse(fileContent);
    Object.keys(json).forEach((key) => {
      combinedMessages[key] = key;
    });
  }
}

fs.writeFileSync(
  path.resolve(directoryPath, fallbackFileName),
  JSON.stringify(combinedMessages, null, 2),
);

console.log(`Fallback messages written to ${fallbackFileName}`);
const normalizedMessages = normalizeMessages(combinedMessages);

fs.writeFileSync(
  path.resolve(directoryPath, normalizedFileName),
  JSON.stringify(normalizedMessages, null, 2),
);
console.log(`Normalized messages written to ${normalizedFileName}`);
