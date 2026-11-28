"use server";

import { getCourses, getExercises, getPapers, getThreads, searchContent } from "@/lib/content/public";

export async function searchAction(query: string) {
  const trimmed = query.trim();
  if (trimmed.length < 2) return [];
  return searchContent(trimmed);
}

export async function getSearchMeta() {
  const [courses, exercises, papers, threads] = await Promise.all([
    getCourses(),
    getExercises(),
    getPapers(),
    getThreads(),
  ]);
  return {
    courses: courses.length,
    exercises: exercises.length,
    papers: papers.length,
    threads: threads.length,
  };
}
