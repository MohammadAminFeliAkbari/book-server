'use client'
import axios from 'axios';
import { useFormik } from 'formik';
import React, { useContext, useReducer } from 'react';
import * as yup from 'yup'
import config from '../../config'
import { AppContext } from '../../../context/AppContext';
import loading_img from '../../app/signup/loading.svg'
import Image from 'next/image';
import toast from 'react-hot-toast';

export type addressT = {
    id: string,
    address_line: string,
    postal_code: string
}

export default function Modal({ setSuccess, cart_id, address, setAddress, showModal, setShowModal }: {
    cart_id: number;
    address: addressT[];
    setAddress: React.Dispatch<React.SetStateAction<addressT[] | undefined>>;
    showModal: boolean;
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    setSuccess: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const changeLoadings = (values: { loading_add_address: boolean, loading_submit: boolean }, action: { type: string }) => {
        switch (action.type) {
            case 'add_address':
                return { ...values, loading_add_address: !values.loading_add_address }
            case 'submit':
                return { ...values, loading_submit: !values.loading_submit }
            default:
                return values;
        }
    }

    const { access } = useContext(AppContext)
    const [loadings, setLoadings] = useReducer(changeLoadings, { loading_add_address: false, loading_submit: false })


    const validation_select_address = yup.object({
        address_id: yup.string().required('لطفاً یک آدرس را انتخاب کنید.')
    })
    const validation_address = yup.object({
        address_line: yup.string()
            .min(10, 'آدرس باید حداقل ۱۰ کاراکتر باشد.')
            .max(250, 'آدرس نمی‌تواند بیشتر از ۲۵۰ کاراکتر باشد.')
            .required('وارد کردن آدرس الزامی است.'),
        postal_code: yup.string()
            .matches(/^\d{10}$/, 'کد پستی باید دقیقا ۱۰ رقم باشد.')
            .required('کدپستی الزامی است.')
    })


    const select_address_formik = useFormik({
        initialValues: {
            address_id: ''
        },
        validationSchema: validation_select_address,
        onSubmit: (values) => {
            setLoadings({ type: 'submit' })
            const post = async () => {
                await axios.post(`${config.BASE_URL}/cart/invoice/${cart_id}/`, values, {
                    headers: {
                        ...(access && { Authorization: `Bearer ${access}` })
                    }
                })
                    .then((res) => {
                        console.log(res);
                        toast.success('پیش فاکتور با موفقیت ثبت شد')
                        setShowModal(false)
                        setSuccess(true)
                    }).catch((err) => {
                        console.log(err);
                        if (err.status == '409') {
                            const books = err.response.data.invoiced_books;
                            let invoiced_books_name = ''

                            for (let index = 0; index < books.length; index++) {
                                const element = books[index];

                                invoiced_books_name += element.title
                                if (index < books.length - 1)
                                    invoiced_books_name += ','
                            }
                            console.log(invoiced_books_name);

                            toast.error(`کتاب  '${invoiced_books_name}'  قبلا رزرو شده است`, {
                                style: {
                                    fontSize: '12px'
                                }
                            })
                        }
                    }).finally(() => {
                        setLoadings({ type: 'submit' })
                    })
            }
            post()
        }
    })
    const address_formik = useFormik({
        initialValues: {
            address_line: '',
            postal_code: ''
        },
        validationSchema: validation_address,
        onSubmit: (values) => {
            console.log(values);
            setLoadings({ type: 'add_address' })
            const post = async () => {
                await axios.post(`${config.BASE_URL}/account/address/`, values, { headers: { ...(access && { Authorization: `Bearer ${access}` }) } })
                    .then((res) => {
                        console.log(res.data);
                        setAddress((pre) => {
                            const newAddres = [...(pre ?? []), res.data]
                            return newAddres
                        })
                        select_address_formik.setValues({ address_id: res.data.id })
                    }).catch((err) => {
                        console.log(err);
                    }).finally(() => {
                        setLoadings({ type: 'add_address' })
                    })
            }
            post()
        }
    })

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900 p-10">
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-2">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-md p-6 space-y-6 relative">
                        <h2 className="text-center text-xl font-semibold text-gray-700 dark:text-gray-200 border-b pb-3 border-gray-200 dark:border-gray-700">انتخاب آدرس</h2>

                        {address.length > 0 && <form onSubmit={select_address_formik.handleSubmit} className="space-y-4 max-h-[500px] overflow-y-auto">
                            {address.map((item) => (
                                <label
                                    key={item.id}
                                    className={` border p-4 rounded-lg cursor-pointer flex items-start gap-4 transition 
                                    ${select_address_formik.values.address_id === item.id
                                            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900'
                                            : 'border-gray-300 dark:border-gray-700'
                                        } hover:border-blue-500`}
                                >
                                    <input
                                        type="radio"
                                        name="address_id"
                                        value={select_address_formik.values.address_id}
                                        onChange={() => select_address_formik.setFieldValue('address_id', item.id)}
                                        className="mt-1 hidden accent-blue-600"
                                    />
                                    <div>
                                        <h3 className="text-gray-800 dark:text-gray-100 font-medium">{item.address_line}</h3>
                                        <p className="text-gray-500 dark:text-gray-400 text-sm">کد پستی: {item.postal_code}</p>
                                    </div>
                                </label>
                            ))}
                            {select_address_formik.errors.address_id && select_address_formik.touched.address_id && (
                                <p className="text-red-500 text-sm">{select_address_formik.errors.address_id}</p>
                            )}
                            <button
                                type="submit"
                                className={`${loadings.loading_submit && 'opacity-35'} w-full flex gap-2 py-2 justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition`}
                            >
                                ثبت
                                {loadings.loading_submit &&
                                    <Image alt='صبرکنید...' className='w-5' src={loading_img} />}
                            </button>
                        </form>}

                        <form onSubmit={address_formik.handleSubmit} className="w-full flex flex-col border border-gray-200 dark:border-gray-700 p-4 rounded-2xl space-y-4 bg-gray-50 dark:bg-gray-900">
                            <div className="flex gap-4 pl-3">
                                <div className="flex flex-col w-[60%]">
                                    <input
                                        type="text"
                                        placeholder="آدرس"
                                        {...address_formik.getFieldProps('address_line')}
                                        className={`p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                                        ${address_formik.errors.address_line && address_formik.touched.address_line ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                    />
                                    {address_formik.errors.address_line && address_formik.touched.address_line && (
                                        <p className="text-red-500 text-sm mt-1 text-[12px]">{address_formik.errors.address_line}</p>
                                    )}
                                </div>

                                <div className="flex flex-col w-[40%]">
                                    <input
                                        type="text"
                                        placeholder="کد پستی"
                                        {...address_formik.getFieldProps('postal_code')}
                                        className={`p-3 border rounded-lg bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500
                                        ${address_formik.errors.postal_code && address_formik.touched.postal_code ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'}`}
                                    />
                                    {address_formik.errors.postal_code && address_formik.touched.postal_code && (
                                        <p className="text-red-500 text-sm mt-1 text-[12px]">{address_formik.errors.postal_code}</p>
                                    )}
                                </div>
                            </div>

                            <button
                                type="submit"
                                className={`${loadings.loading_add_address && 'opacity-35'} w-full flex gap-2 py-2 justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition`}
                            >
                                افزودن آدرس
                                {loadings.loading_add_address &&
                                    <Image alt='صبرکنید...' className='w-5' src={loading_img} />}
                            </button>
                        </form>

                        <button
                            onClick={() => setShowModal(false)}
                            className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
                        >
                            بستن
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
