import QueryBuilder from "../../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { IComment, IPost } from "./post.interface";
import { Post } from "./post.model";

const createPost = async (data: IPost) => {
  const result = await Post.create(data);
  return result;
};

const getAllPosts = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find().populate("user"), query)
    .search(["title", "description"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const result = await postQuery.modelQuery;
  const meta = await postQuery.countTotal();

  return {
    meta,
    result,
  };
};

const getPostById = async (id: string) => {
  const post = await Post.findById(id).populate("user");
  if (!post) {
    throw new AppError(404, "Post not found");
  }
  return post;
};

const getPostByUser = async (userId: string) => {
  const posts = Post.find({ user: userId }).populate("user");
  return posts;
};

const getUserUpvotedPosts = async (userId: string) => {
  const posts = Post.find({ "votes.user": userId }).populate("user");
  return posts;
};

const updatePost = async (payload: Partial<IPost>, id: string) => {
  const result = await Post.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const comment = async (postId: string, comment: IComment) => {
  const result = await Post.findOneAndUpdate(
    { _id: postId },
    { $addToSet: { comments: comment } },
    {
      new: true,
    }
  );
  return result;
};

const deleteComment = async (postId: string, comment: IComment) => {
  const result = await Post.findOneAndUpdate(
    { _id: postId },
    { $pull: { comments: { _id: comment.userId } } },
    {
      new: true,
    }
  );
  return result;
};

const editComment = async (postId: string, comment: IComment) => {
  const updatedPost = await Post.findOneAndUpdate(
    {
      _id: postId,
      "comments._id": comment.userId,
    },
    {
      $set: {
        "comments.$.content": comment.content,
      },
    },
    { new: true }
  );
  return updatedPost;
};

const manageVote = async (
  postId: string,
  userId: string,
  voteType: "upVote" | "downVote"
) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new AppError(404, "Post not found");
  }

  const existingVoteIndex = post.votes!.findIndex(
    (v) => v.user.toString() === userId
  );
  const voteValue = voteType === "upVote" ? 1 : -1;

  if (existingVoteIndex > -1) {
    const existingVote = post.votes![existingVoteIndex];
    if (existingVote.vote === voteValue) {
      post?.votes?.splice(existingVoteIndex, 1);
      post[voteType === "upVote" ? "upVotes" : "downVotes"]! -= 1;
    } else {
      existingVote.vote = voteValue;
      (post.upVotes as number) += voteValue;
      (post.downVotes as number) - +voteValue;
    }
  } else {
    post.votes!.push({ user: userId, vote: voteValue });
    post[voteType === "upVote" ? "upVotes" : "downVotes"]! += 1;
  }

  await post.save();

  return { upVotes: post.upVotes, downVotes: post.downVotes };
};

const addRating = async (postId: string, userId: string, rating: number) => {
  const post = await Post.findById(postId);
  if (!post) {
    throw new AppError(404, "Post not found");
  }
  if (rating < 0 || rating > 5) {
    throw new AppError(400, "Invalid rating");
  }

  const existingRatingIndex = post.ratings!.findIndex(
    (r) => r.user.toString() === userId
  );

  if (existingRatingIndex > -1) {
    const oldRating = post.ratings![existingRatingIndex].rating;
    post.ratings![existingRatingIndex].rating = rating;
    post.ratingSum = (post.ratingSum as number) - oldRating + rating;
  } else {
    post.ratings!.push({ user: userId, rating: rating });
    (post.totalRatings as number) += 1;
    (post.ratingSum as number) += rating;
  }

  post.averageRating =
    (post.ratingSum as number) / (post.totalRatings as number);

  await post.save();

  return post;
};

const deletePost = async (id: string) => {
  const result = await Post.findByIdAndDelete({ _id: id });
  return result;
};

const approvePost = async (id: string) => {
  const result = await Post.findByIdAndUpdate(
    id,
    { status: "posted" },
    { new: true }
  );
  if (!result) {
    throw new AppError(404, "post now found");
  }

  return result;
};

export const PostServices = {
  getAllPosts,
  createPost,
  updatePost,
  deletePost,
  approvePost,
  comment,
  manageVote,
  addRating,
  getPostByUser,
  getUserUpvotedPosts,
  getPostById,
  deleteComment,
  editComment,
};
