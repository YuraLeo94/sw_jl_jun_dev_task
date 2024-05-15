export const route = {
    HOME: '/',
    ADD_PRODUCT: '/addproduct'
}

export enum PRODUCT_TYPES {
    DVD = 1,
    BOOK = 2,
    FURNITURE = 3,
    NONE = 0
}

export type RequestStatus = 'success' | 'failed';

export interface IExecResInfo {
    message: string | string[];
    status: RequestStatus;
}

export interface IProduct {
    sku: string;
    name: string;
    price: number;
    type: PRODUCT_TYPES;
    size: number | null;
    weight: number | null;
    width: number | null;
    height: number | null;
    length: number | null;
}

export interface IReviceProductsResponse {
    execResInfo: IExecResInfo;
    products: IProduct[];
}

export interface IDeleteProductResponse {
    data: IExecResInfo;
};

export interface ICreateProductResponse {
    data: IExecResInfo;
};
