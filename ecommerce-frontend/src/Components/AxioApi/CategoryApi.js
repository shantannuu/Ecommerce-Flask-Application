import { AxioInstanceApi } from "./AxioInstance";

export const AddCategoryData = async (categoryData) => {
    try {
        const response = await AxioInstanceApi.post('/Categories', categoryData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const EditCategoryData = async (category_id ,categoryData) => {
    try {
        const response = await AxioInstanceApi.put(`/Categories/${category_id}`, categoryData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const DeleteCategoryData = async (category_id) => {
    try {
        const response = await AxioInstanceApi.delete(`/Categories/${category_id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetAllCategories = async () => {
    try {
        const response = await AxioInstanceApi.get('/Categories');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

