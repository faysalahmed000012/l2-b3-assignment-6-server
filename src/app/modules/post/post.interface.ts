export interface IPost {
  _id?: string;
  title: string;
  description: string;
  images?: string[];
  likes?: string[];
  comments?: string[];
  rating?: number;
  upVotes?: number;
  downVotes?: number;
  user: string;
  isPremium?: boolean;
  status: "pending" | "posted" | "rejected";
}
