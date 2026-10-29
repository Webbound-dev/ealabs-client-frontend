import api from "../config/config";

export const getAllBlogs = async () => {
  const { data } = await api.get("/api/blogs");
  return data.blogs;
};

export const getBlogByName = async (name) => {
  const { data } = await api.get(`/api/blogs/${name}`);
  return data.blog;
};