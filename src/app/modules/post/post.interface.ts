export interface IComment {
  _id?: string;
  userId: string;
  userName: string;
  userImage: string;
  content: string;
}
export interface IPost {
  _id?: string;
  title: string;
  description: string;
  image: string;
  comments?: IComment[];
  rating?: number;
  totalRatings?: number;
  ratingSum?: number;
  averageRating?: number;
  ratings?: [{ user: string; rating: number }];
  upVotes?: number;
  downVotes?: number;
  votes?: [{ user: string; vote: Number }];
  tags: {
    type: string[];
    enum: [
      "breakfast",
      "lunch",
      "dinner",
      "dessert",
      "snack",
      "vegan",
      "vegetarian",
      "gluten-free",
      "low-carb"
    ];
  };
  cookingTime: number;
  ingredients: {
    name: string;
    quantity: string;
  }[];
  user: string;
  isPremium?: boolean;
  status: "pending" | "posted" | "rejected";
}
