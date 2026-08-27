"use client";

import { NextStudio } from "next-sanity/studio/client-component";
import config from "../../../sanity.config";

export function Studio() {
  return <NextStudio config={config} />;
}
