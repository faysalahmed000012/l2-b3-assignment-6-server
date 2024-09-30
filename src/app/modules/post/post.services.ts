import QueryBuilder from "../../../builder/queryBuilder";
import AppError from "../../errors/AppError";
import { IPost } from "./post.interface";
import { Post } from "./post.model";

const createPost = async (data: IPost) => {
  const result = await Post.create(data);
  return result;
};

const updatePost = async (payload: Partial<IPost>) => {
  const result = await Post.findOneAndUpdate({ _id: payload._id }, payload, {
    new: true,
  });
  return result;
};

const getAllPosts = async (query: Record<string, unknown>) => {
  const postQuery = new QueryBuilder(Post.find({ status: "posted" }), query)
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
};
