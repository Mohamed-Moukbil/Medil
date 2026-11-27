export type Subject = "Maths" | "Physique" | "Informatique";
export type Level = "MPSI" | "MP" | "MP*";
export type ContentStatus = "draft" | "published" | "archived";
export type ForumStatus = "published" | "hidden" | "deleted";
export type ForumCategory = Subject | "Concours" | "Méthode";

export type CourseSection = {
  id: string;
  kicker?: string;
  title: string;
  paragraphs: string[];
  formula?: string;
  note?: string;
};

export type CourseExercise = {
  prompt: string;
  answer?: string;
};

export type ExerciseStep = {
  title: string;
  text: string;
  equation?: string;
};

export type Course = {
  id: string;
  title: string;
  tag: string | null;
  subject: Subject;
  level: Level;
  color: string | null;
  coverType: string | null;
  coverEq: string | null;
  chaptersCount: number;
  duration: string | null;
  students: string | null;
  rating: number | null;
  featured: boolean;
  description: string | null;
  formula: string | null;
  objectives: string[];
  toc: string[];
  sections: CourseSection[];
  exercise: CourseExercise | null;
  status: ContentStatus;
  publishedAt: string | null;
};

export type Exercise = {
  id: string;
  title: string;
  subject: Subject;
  tag: string | null;
  source: string | null;
  level: Level | null;
  stars: number;
  minutes: number | null;
  equation: string | null;
  teaser: string | null;
  statement: string | null;
  hint: string | null;
  solution: ExerciseStep[];
  answer: string | null;
  solves: number;
  verified: boolean;
  status: ContentStatus;
  publishedAt: string | null;
};

export type Paper = {
  id: string;
  school: string;
  short: string | null;
  year: number;
  subject: Subject;
  title: string;
  track: string | null;
  duration: string | null;
  difficulty: number | null;
  parts: string | null;
  hot: boolean;
  correction: boolean;
  color: string | null;
  pdfUrl: string | null;
  content: unknown;
  correctionContent: unknown;
  status: ContentStatus;
  publishedAt: string | null;
};

export type DailyChallenge = {
  id: string;
  date: string;
  exerciseId: string | null;
  eyebrow: string | null;
  title: string;
  statement: string | null;
  equation: string | null;
  participants: number;
  xp: number;
  steps: string[];
  status: ContentStatus;
  publishedAt: string | null;
};

export type ForumThread = {
  id: string;
  authorId: string | null;
  authorName: string | null;
  authorGrade: string | null;
  authorInitials: string | null;
  avatarColor: string | null;
  excerpt: string | null;
  title: string;
  body: string;
  category: ForumCategory;
  tags: string[];
  pinned: boolean;
  locked: boolean;
  views: number;
  upvotes: number;
  status: ForumStatus;
  createdAt: string;
  updatedAt: string;
  replyCount: number;
};

export type ForumReply = {
  id: string;
  threadId: string;
  authorId: string | null;
  authorName: string | null;
  authorGrade: string | null;
  authorInitials: string | null;
  avatarColor: string | null;
  body: string;
  upvotes: number;
  status: ForumStatus;
  createdAt: string;
  updatedAt: string;
};

export type SearchResultType = "course" | "exercise" | "paper" | "thread";

export type SearchResult = {
  type: SearchResultType;
  id: string;
  title: string;
  meta: string;
  score: number;
};

export type SiteStats = {
  courses: number;
  exercises: number;
  papers: number;
  threads: number;
  schools: number;
};

export type EditorialData = {
  version: number;
  savedAt: string;
  courses: Array<Record<string, unknown>>;
  exercises: Array<Record<string, unknown>>;
  papers: Array<Record<string, unknown>>;
  dailyChallenge: Record<string, unknown>;
  threads: Array<Record<string, unknown>>;
};

/* -------------------------------------------------------------------------- */
/* Supabase row shapes (snake_case)                                           */
/* -------------------------------------------------------------------------- */

export type CourseRow = {
  id: string;
  title: string;
  tag: string | null;
  subject: Subject;
  level: Level;
  color: string | null;
  cover_type: string | null;
  cover_eq: string | null;
  chapters_count: number;
  duration: string | null;
  students: string | null;
  rating: number | null;
  featured: boolean;
  description: string | null;
  formula: string | null;
  objectives: string[] | null;
  toc: string[] | null;
  sections: CourseSection[] | null;
  exercise: CourseExercise | null;
  status: ContentStatus;
  published_at: string | null;
};

export type ExerciseRow = {
  id: string;
  title: string;
  subject: Subject;
  tag: string | null;
  source: string | null;
  level: Level | null;
  stars: number;
  minutes: number | null;
  equation: string | null;
  teaser: string | null;
  statement: string | null;
  hint: string | null;
  solution: ExerciseStep[] | null;
  answer: string | null;
  solves: number;
  verified: boolean;
  status: ContentStatus;
  published_at: string | null;
};

export type PaperRow = {
  id: string;
  school: string;
  short: string | null;
  year: number;
  subject: Subject;
  title: string;
  track: string | null;
  duration: string | null;
  difficulty: number | null;
  parts: string | null;
  hot: boolean;
  correction: boolean;
  color: string | null;
  pdf_url: string | null;
  content: unknown;
  correction_content: unknown;
  status: ContentStatus;
  published_at: string | null;
};

export type DailyChallengeRow = {
  id: string;
  date: string;
  exercise_id: string | null;
  eyebrow: string | null;
  title: string;
  statement: string | null;
  equation: string | null;
  participants: number;
  xp: number;
  steps: string[] | null;
  status: ContentStatus;
  published_at: string | null;
};

export type ForumThreadRow = {
  id: string;
  author_id: string | null;
  author_name: string | null;
  author_grade: string | null;
  author_initials: string | null;
  avatar_color: string | null;
  excerpt: string | null;
  title: string;
  body: string;
  category: ForumCategory;
  tags: string[] | null;
  pinned: boolean;
  locked: boolean;
  views: number;
  upvotes: number;
  status: ForumStatus;
  created_at: string;
  updated_at: string;
  forum_replies?: Array<{ count: number }>;
};

export type ForumReplyRow = {
  id: string;
  thread_id: string;
  author_id: string | null;
  author_name: string | null;
  author_grade: string | null;
  author_initials: string | null;
  avatar_color: string | null;
  body: string;
  upvotes: number;
  status: ForumStatus;
  created_at: string;
  updated_at: string;
};

export type ProfileRow = {
  id: string;
  name: string;
  grade: string | null;
  avatar_url: string | null;
  is_admin: boolean;
  created_at: string;
  updated_at: string;
};
