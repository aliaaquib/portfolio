import { createImageUrlBuilder } from "@sanity/image-url";
import { dataset, projectId } from "./env";

const imageBuilder = createImageUrlBuilder({
  projectId: projectId || "missing-project-id",
  dataset,
});

export function urlForImage(source: Parameters<ReturnType<typeof createImageUrlBuilder>["image"]>[0]) {
  return imageBuilder.image(source).auto("format").fit("max");
}
