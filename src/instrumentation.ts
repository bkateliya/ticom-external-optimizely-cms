// Runs on server start
export async function register() {
  await import("./lib/env/server-env");
}
