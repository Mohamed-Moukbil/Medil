import { defineCloudflareConfig } from "@opennextjs/cloudflare";

export default defineCloudflareConfig({
  // Enable the R2 incremental cache after creating the bucket:
  // incrementalCache: r2IncrementalCache,
});
