import { AxioInstanceApi } from "./AxioInstance";


export const GetAllOrders = async () => {
    try {
        const response = await AxioInstanceApi.get('/orders');
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};

export const GetOrderById = async (order_id) => {
    try {
        const response = await AxioInstanceApi.get(`/orders/${order_id}`);
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
};