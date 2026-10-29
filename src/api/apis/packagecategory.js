import api from "../config/config";

export const getAllTestPackages = async () => {
    const { data } = await api.get("/api/testpackagecategory");
    return data;
};

export const getTestsByPackageName = async (packageName) => {
    const { data } = await api.get(`/api/testpackagecategory/tests/${packageName}`);
    return data;
};