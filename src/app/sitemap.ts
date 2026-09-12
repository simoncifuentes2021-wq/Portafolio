import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site";
import { projects } from "@/data/projects";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl) return [];
  return [
    "",
    "/projects",
    "/contact",
    ...projects.map((project) => "/projects/" + project.slug),
  ].map((path) => ({ url: siteUrl + path }));
}
