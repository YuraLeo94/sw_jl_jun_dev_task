import { Button } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import names from '../../utils/types/dictionary.consts';
import { IProduct, PRODUCT_TYPES, route } from '../../utils/types/global';
import { useMutation } from 'react-query';
import ProductsService from '../../api/apiClient';


type AddFormData = {
  sku: string;
  name: string;
  price: number;
  productType: number;
  size?: number;
  weight?: number;
  height?: number;
  width?: number;
  length?: number;
};

function AddProduct(): JSX.Element {
  const navigate = useNavigate();
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});


  const { mutate: addProduct } = useMutation<any, Error, IProduct>(
    async (product: IProduct) => { return await ProductsService.createProduct(product) }
    ,
    {
      onSettled: (res) => {
        if (res && res?.status === 'success') {
          navigate(route.HOME);
        }
        const errors = res?.errors;
        if (errors && Object.keys(errors).length > 0) {
          setValidationErrors(errors);
        }
      }
    }
  );

  const typeOptions = [
    { id: 'DVD', value: PRODUCT_TYPES.DVD, text: names.ADD_FORM_TYPE_0 },
    { id: 'Book', value: PRODUCT_TYPES.BOOK, text: names.ADD_FORM_TYPE_1 },
    { id: 'Furniture', value: PRODUCT_TYPES.FURNITURE, text: names.ADD_FORM_TYPE_2 }
  ];

  const defaultSchema = yup.object().shape({
    sku: yup.string().required(names.ADD_FORM_REQUIRED_MESSAGE),
    name: yup.string().required(names.ADD_FORM_REQUIRED_MESSAGE),
    price: yup.number().required(names.ADD_FORM_REQUIRED_MESSAGE).typeError(names.ADD_FORM_REQUIRED_MESSAGE)
      .positive(names.ADD_FROM_VALUE_NOT_POSITIVE)
      .test(
        'is-decimal',
        'Price must have up to two decimal places',
        () => {
          const value: number = getValues('price');
          if (!value) return true;
          return /^\d+(\.\d{1,2})?$/.test(value.toString());
        },
      ),
    productType: yup.number().required(names.ADD_FORM_REQUIRED_MESSAGE),
  });

  const [productType, setProductType] = useState<PRODUCT_TYPES>(PRODUCT_TYPES.NONE);
  const [validationSchema, setValidationSchema] = useState<yup.AnyObjectSchema>(defaultSchema);
  const { register, formState: { errors, isValid }, unregister, getValues, trigger, reset } = useForm<AddFormData>({
    resolver: yupResolver(validationSchema)
  });

  const onCancel = () => {
    reset();
    navigate(route.HOME);
  };

  const getValuesOfProduct = (): IProduct => {

    const size = getValues('size');
    const weight = getValues('weight');
    const width = getValues('width');
    const height = getValues('height');
    const length = getValues('length');
    return {
      sku: getValues('sku') ?? '',
      name: getValues('name') ?? '',
      price: parseFloat(getValues('price').toString()),
      type: parseInt(getValues('productType').toString()),
      size: size !== undefined ? parseInt(size.toString()) : null,
      weight: weight !== undefined ? parseFloat(weight.toString()) : null,
      width: width !== undefined ? parseFloat(width.toString()) : null,
      height: height !== undefined ? parseFloat(height.toString()) : null,
      length: length !== undefined ? parseFloat(length.toString()) : null,
    }
  }
  const [activeTypeFields, setActiveTypeFields] = useState<(keyof AddFormData)[] | null>(null);

  const unregisterNotActiveTypeFields = () => {
    activeTypeFields?.forEach(fieldName => {
      unregister(fieldName);
    });
  };

  const onApply = async () => {
    try {
      await trigger();
      if (isValid) {
        setValidationErrors({});
        addProduct(getValuesOfProduct());
      }
    } catch (error) {
      console.error('Error occurred while validating:', error);
    }
  };

  const handleProductTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type: PRODUCT_TYPES = parseInt(e.target.value as string) as PRODUCT_TYPES;
    setProductType(type);
    unregisterNotActiveTypeFields();
    switch (type) {
      case PRODUCT_TYPES.DVD:
        {
          setActiveTypeFields(['size']);
          setValidationSchema(yup.object().shape({
            ...defaultSchema.fields,
            size: yup.number()
              .required(names.ADD_FORM_REQUIRED_MESSAGE)
              .typeError(names.ADD_FORM_REQUIRED_MESSAGE)
              .positive(names.ADD_FROM_VALUE_NOT_POSITIVE)
              .test(
                'is-valid-size',
                names.ADD_FORM_INVALID_DEC_VALUE,
                () => {
                  const value: number | undefined = getValues('size');
                  if (!value) return false;
                  return /^[1-9][0-9]*$/.test(value.toString());
                }),
          }));
          break;
        }
      case PRODUCT_TYPES.BOOK:
        {
          setActiveTypeFields(['weight']);
          setValidationSchema(yup.object().shape({
            ...defaultSchema.fields,
            weight: yup.number()
              .required(names.ADD_FORM_REQUIRED_MESSAGE)
              .typeError(names.ADD_FORM_REQUIRED_MESSAGE)
              .positive(names.ADD_FROM_VALUE_NOT_POSITIVE)
              .test(
                'is-valid-weight',
                names.ADD_FORM_INCORECT_VALUE,
                () => {
                  const value: number | undefined = getValues('weight');
                  if (!value) return false;
                  return /^\d+(\.\d{1,3})?$/.test(value.toString());
                }),
          }));
          break;
        }
      case PRODUCT_TYPES.FURNITURE:
        {
          setActiveTypeFields(['height', 'width', 'length']);
          setValidationSchema(yup.object().shape({
            ...defaultSchema.fields,
            height: yup.number()
              .required(names.ADD_FORM_REQUIRED_MESSAGE)
              .typeError(names.ADD_FORM_REQUIRED_MESSAGE)
              .positive(names.ADD_FROM_VALUE_NOT_POSITIVE)
              .test(
                'is-valid-height',
                names.ADD_FORM_INCORECT_VALUE,
                () => {
                  const value: number | undefined = getValues('height');
                  if (!value) return false;
                  return /^\d+(\.\d{1,2})?$/.test(value.toString());
                }),
            width: yup.number()
              .required(names.ADD_FORM_REQUIRED_MESSAGE)
              .typeError(names.ADD_FORM_REQUIRED_MESSAGE)
              .positive(names.ADD_FROM_VALUE_NOT_POSITIVE)
              .test(
                'is-valid-width',
                names.ADD_FORM_INCORECT_VALUE,
                () => {
                  const value: number | undefined = getValues('width');
                  if (!value) return false;
                  return /^\d+(\.\d{1,2})?$/.test(value.toString());
                }),
            length: yup.number().required(names.ADD_FORM_REQUIRED_MESSAGE)
              .typeError(names.ADD_FORM_REQUIRED_MESSAGE).positive(names.ADD_FROM_VALUE_NOT_POSITIVE)
              .positive(names.ADD_FROM_VALUE_NOT_POSITIVE)
              .test(
                'is-valid-length',
                names.ADD_FORM_INCORECT_VALUE,
                () => {
                  const value: number | undefined = getValues('length');
                  if (!value) return false;
                  return /^\d+(\.\d{1,2})?$/.test(value.toString());
                }),
          }));
          break;
        }
      default:
        setActiveTypeFields(null);
        break;
    }
  };

  return (
    <>
      <div className='product-add-container flex-grow-1'>
        <div className='product-add-header border-bottom border-dark pb-3 pt-5'>
          <div className='title'><h1>{names.ADD_TITLE}</h1></div>
          <div className='action-buttons-container'>
            <Button className='sw-button' variant="light" onClick={onApply}>{names.ADD_FORM_APPLY_BUTTON}</Button>
            <Button className='sw-button' variant="light" onClick={onCancel}>{names.ADD_FORM_CANCEL_BUTTON}</Button>
          </div>
        </div>
        <form className='d-flex flex-column mt-5 px-2 product-add-form' id="product_form">
          <div className='field-item'>
            <label>
              {names.ADD_FORM_SKU_LABEL}
            </label>
            <input id="sku" type="text" {...register('sku')} />
            {errors.sku && <p className='text-danger'>{errors.sku.message}</p>}
            {validationErrors?.['sku'] && <p className='text-danger'>{validationErrors['sku']}</p>}
          </div>
          <div className='field-item'>
            <label>
              {names.ADD_FORM_NAME_LABEL}
            </label>
            <input id="name" type="text" {...register('name')} />
            {errors.name && <p className='text-danger'>{errors.name.message}</p>}
            {validationErrors?.['name'] && <p className='text-danger'>{validationErrors['name']}</p>}
          </div>
          <div className='field-item'>
            <label>
              {names.ADD_FORM_PRICE_LABEL}
            </label>
            <input id="price" type="number" {...register('price')} />
            {errors.price && <p className='text-danger'>{errors.price.message}</p>}
            {validationErrors?.['price'] && <p className='text-danger'>{validationErrors['price']}</p>}
          </div>

          <div>
            <label className='me-3'>
              {names.ADD_FORM_TYPE_LABEL}
            </label>
            <div className='custom-select'>
              <select className='custom-select' id='productType' {...register('productType')} onChange={handleProductTypeChange}>
                <option value={0}>{names.ADD_FORM_TYPE_LABEL}</option>
                {typeOptions.map(option => <option key={option.value} id={option.id} value={option.value}>{option.text}</option>)}
              </select>

            </div>
            {errors.productType && <p className='text-danger'>{errors.productType.message}</p>}
            {validationErrors?.['type'] && <p className='text-danger'>{validationErrors['type']}</p>}
          </div>
          {productType === PRODUCT_TYPES.DVD && (
            <div className='field-item'>
              <label>
                {names.ADD_FORM_SIZE_LABEL}
              </label>
              <input id="size" type="number" {...register('size')} />
              {errors.size && <p className='text-danger'>{errors.size.message}</p>}
              {validationErrors?.['size'] && <p className='text-danger'>{validationErrors['size']}</p>}
              <p>
                {names.ADD_FORM_SIZE_DESCRIPTION}
              </p>
            </div>
          )}
          {productType === PRODUCT_TYPES.BOOK && (
            <div className='field-item'>
              <label>
                {names.ADD_FORM_WEIGHT_LABEL}
              </label>
              <input id="weight" type="number" {...register('weight')} />
              {errors.weight && <p className='text-danger'>{errors.weight.message}</p>}
              {validationErrors?.['weight'] && <p className='text-danger'>{validationErrors['weight']}</p>}
              <p>{names.ADD_FORM_WEIGHT_DESCRIPTION}</p>
            </div>
          )}
          {productType === PRODUCT_TYPES.FURNITURE && (
            <>
              <div className='field-item'>
                <label>
                  {names.ADD_FORM_HEIGHT_LABEL}
                </label>
                <input id="height" type="number" {...register('height')} />
                {errors.height && <p className='text-danger'>{errors.height.message}</p>}
                {validationErrors?.['height'] && <p className='text-danger'>{validationErrors['height']}</p>}
              </div>
              <div className='field-item'>
                <label>
                  {names.ADD_FORM_WIDTH_LABEL}
                </label>
                <input id="width" type="number" {...register('width')} />
                {errors.width && <p className='text-danger'>{errors.width.message}</p>}
                {validationErrors?.['width'] && <p className='text-danger'>{validationErrors['width']}</p>}
              </div>
              <div className='field-item'>
                <label>
                  {names.ADD_FORM_LENGTH_LABEL}
                </label>
                <input id="length" type="number" {...register('length')} />
                {errors.length && <p className='text-danger'>{errors.length.message}</p>}
                {validationErrors?.['length'] && <p className='text-danger'>{validationErrors['length']}</p>}
              </div>
              <p>{names.ADD_FORM_FURNITURE_DESCRIPTION}</p>
            </>
          )}
        </form>
      </div>
    </>
  );
}

export default AddProduct;
