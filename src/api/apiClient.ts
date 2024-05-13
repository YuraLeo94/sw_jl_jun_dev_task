import axios from "axios";
import { ICreateProductResponse, IDeleteProductResponse, IProduct, IReviceProductsResponse } from "../utils/types/global";
import { API } from "../utils/types/api.const";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-type": "application/json"
    }
});


const getAllProducts = async () => {
    const res = await apiClient.get<IReviceProductsResponse>(API.get);
    return res.data;
}

const createProduct = async (product: IProduct) => {
    const res = await apiClient.post<IProduct, ICreateProductResponse>(API.add, { ...product });
    return res.data;
}

const deleteByIds = async (ids: string[]) => {
    const response = await apiClient.delete<string[], IDeleteProductResponse>(API.delete, { data: { ...ids } });
    return response.data;
};

const ProductsService = {
    getAllProducts,
    createProduct,
    deleteByIds
};

export default ProductsService;