
export interface ResourceMedia {
  src: string;
  thumbnail?: string;
}

export interface Resource {
  id: number;
  title: string;
  category: string;
  description: string;
  fullText?: string;
  link?: string;
  image: string;
  video?: string;
  author?: string;
  date?: string;
  platform?: "youtube" | "instagram" | "telegram" | "article" | "website";
  media?: ResourceMedia[];
}
