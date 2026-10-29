import api from "../config/config";


export const getAdminGallery = async () => {
  const { data } = await api.get("/api/gallery/admin");
  return data;
};