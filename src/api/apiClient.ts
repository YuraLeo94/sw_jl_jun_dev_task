import axios from "axios";
import { ICreateProductResponse, IDeleteProductResponse, IExecResInfo, IProduct, IReviceProductsResponse } from "../utils/types/global";
import { API } from "../utils/types/api.const";

const apiClient = axios.create({
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
        "Content-type": "application/json"
    }
});


const getAllProducts = async (): Promise<IReviceProductsResponse> => {
    const res = await apiClient.get<IReviceProductsResponse>(API.get);
    return res.data;
}

const createProduct = async (product: IProduct): Promise<IExecResInfo> => {
    const res = await apiClient.post<IProduct, ICreateProductResponse>(API.add, { ...product });
    return res.data;
}

const deleteByIds = async (ids: string[]): Promise<IExecResInfo> => {
    const response = await apiClient.delete<string[], IDeleteProductResponse>(API.delete, { data: { ...ids } });
    return response.data;
};

const ProductsService = {
    getAllProducts,
    createProduct,
    deleteByIds
};

export default ProductsService;