import { AxioInstanceApi } from "./AxioInstance";

export const AddProductData = async (productData) => {
    try {
        const response = await AxioInstanceApi.post('/products', productData);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const EditProductData = async (product_id,productData) => {
    try {
        const response = await AxioInstanceApi.put(`/products/${product_id}`, productData);
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

export const DeleteProductData = async (product_id) => {
    try {
        const response = await AxioInstanceApi.delete(`/products/${product_id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};