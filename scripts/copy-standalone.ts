import { cpSync, rmSync } from "node:fs";
import { join } from "node:path";

const dest = "deploy";

rmSync(dest, { recursive: true, force: true });
cpSync(join(".next", "standalone"), dest, { recursive: true });
cpSync("public", join(dest, "public"), {
  recursive: true,
});
cpSync(join(".next", "static"), join(dest, ".next", "static"), {
  recursive: true,
});
cpSync("ecosystem.config.js", join(dest, "ecosystem.config.js"));

console.log(`Build copied to ${dest}`);
