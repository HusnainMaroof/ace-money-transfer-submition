export type PostCategory = "logo" | "thumbnail" | "motion";

export type Post = {
  id: number;
  type: "image" | "video";
  src: string;
  likes: string;
  caption: string;
  category: PostCategory;
  res?: "1080x1920" | "1920x1080" | "1080x1440";
};

export type PostGroup = {
  projectId: number;
  projectName: string;
  posts: Post[];
};

export type Terminal = {
  id: number;
  name: string;
  code: string;
  password: string;
  logoImg: string;
  route: string;
  projectId: number;
};