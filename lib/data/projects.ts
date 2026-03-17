import type { Project } from "@/lib/types/database";
import { MOCK_PROJECTS, useMockData } from "./mock";
import {
  getProjectsFromFirestore,
  getProjectBySlugFromFirestore,
} from "./firestore";

export async function getFeaturedProjects(limit = 6): Promise<Project[]> {
  if (useMockData()) return MOCK_PROJECTS.slice(0, limit);
  try {
    return await getProjectsFromFirestore({
      featuredOnly: true,
      limit,
    });
  } catch {
    return MOCK_PROJECTS.slice(0, limit);
  }
}

export async function getProjects(categorySlug?: string): Promise<Project[]> {
  if (useMockData()) return MOCK_PROJECTS;
  try {
    return await getProjectsFromFirestore({
      categorySlug,
    });
  } catch {
    return MOCK_PROJECTS;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (useMockData()) {
    return MOCK_PROJECTS.find((p) => p.slug === slug) || null;
  }
  try {
    return await getProjectBySlugFromFirestore(slug);
  } catch {
    return null;
  }
}
