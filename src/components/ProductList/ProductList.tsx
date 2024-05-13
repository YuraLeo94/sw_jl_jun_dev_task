import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import names from '../../utils/types/dictionary.consts';
import { IProduct, IReviceProductsResponse, route } from '../../utils/types/global';
import { useMutation, useQuery } from 'react-query';
import ProductsService from '../../api/apiClient';

function ProductList(): JSX.Element {
    const navigate = useNavigate();
    const [selectedItems, setSelectedItems] = useState<string[]>([]);
    const [products, setProducts] = useState<IProduct[]>([]);

    const { refetch: refetchProducts } = useQuery<IReviceProductsResponse>(
        'get-products',
        async () => {
            return await ProductsService.getAllProducts()
        },
        {
            onSettled: (res) => {
                if (res && res.execResInfo.status === 'success') {
                    setProducts(res.products);
                }
            }
        }
    );
    const { mutate: deleteByIds } = useMutation<any, Error>(
        async () => {
            return await ProductsService.deleteByIds(selectedItems)
        },
        {
            onSuccess: async (res) => {
                await refetchProducts();
            }
        }
    );

    const onAdd = () => {
        navigate(route.ADD_PRODUCT);
    }

    const onDelete = () => {
        deleteByIds();

    }

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = event.target;
        if (checked) {
            setSelectedItems([...selectedItems, value]);
        } else {
            setSelectedItems(selectedItems.filter(item => item !== value));
        }
    };

    return (
        <>
            <div className='product-list-container flex-grow-1'>
                <div className='product-list-header border-bottom border-dark pb-3 pt-5'>
                    <div className='title'><h1>{names.PRODCUT_LIST_TITLE}</h1></div>
                    <div className='action-buttons-container'>
                        <Button className='sw-button' variant="light" onClick={onAdd}>{names.PRODCUT_LIST_ADD_BUTTON}</Button>
                        <Button className='sw-button' variant="light" id='delete-product-btn' onClick={onDelete}>{names.PRODCUT_LIST_DELETE_BUTTON}</Button>
                    </div>
                </div>
                <div className='product-items-container py-5 px-3 d-flex flex-fill flex-row flex-wrap'>
                    {products.map((product) => (
                        <div key={product.sku} className='product-item d-flex p-3 border border-dark '>
                            <div>
                                <label className="sw-checkbox delete-checkbox">
                                    <input
                                        type="checkbox"
                                        value={product.sku}
                                        onChange={handleCheckboxChange}
                                    />
                                    <span className="checkmark"></span>
                                </label>
                            </div>
                            <div className='d-flex flex-column mt-3 align-items-center w-100'>
                                <div>{product.sku}</div>
                                <div>{product.name}</div>
                                <div>{product.price.toFixed(2)} $</div>
                                {product?.size && <div>{names.PRODCUT_LIST_SIZE_TEXT.replace('{sizeMB}', product.size.toString())}</div>}
                                {product?.weight && <div>{names.PRODCUT_LIST_WEIGHT_TEXT.replace('{weightKg}', product.weight.toString())}</div>}
                                {product?.width && product?.height && product?.length &&
                                    <div>
                                        {names.PRODCUT_LIST_DIMENSION_TEXT} {product.width}x{product.height}x{product.length}
                                    </div>}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default ProductList;