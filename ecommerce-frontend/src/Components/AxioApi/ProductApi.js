import { AxioInstanceApi } from "./AxioInstance";

export const AddProductData = async (productData) => {
    try {
        const response = await AxioInstanceApi.post('/products', productData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetAllProducts = async () => {
    try {
        const response = await AxioInstanceApi.get('/products');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};
