import { AxioInstanceApi } from "./AxioInstance";

export const AddCategoryData = async (categoryData) => {
    try {
        const response = await AxioInstanceApi.post('/Categories', categoryData);
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
