import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct } from "../../redux/feature/productSlice";

export default function Addproduct() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [productName, setProductName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [productImage, setProductImage] = useState(null);
    const [errors, setErrors] = useState({});
    const {token} = useSelector((state)=>state.auth);
    const {isSuccess} = useSelector((state)=>state.productSlice);

    useEffect(()=>{
     if(isSuccess){
        navigate("/Product")
     }
    },[isSuccess])

    const validateForm = () => {
        let isValid = true;
        const newErrors = {};

        if (!productName.trim()) {
            newErrors.productName = "Product name is required";
            isValid = false;
        }

        if (!productImage) {
            newErrors.productImage = "Product image is required";
            isValid = false;
        }

        if (!description.trim()) {
            newErrors.description = "Description is required";
            isValid = false;
        }

        if (!price) {
            newErrors.price = "Price is required";
            isValid = false;
        } else if (isNaN(price) || parseFloat(price) <= 0) {
            newErrors.price = "Please enter a valid price greater than 0";
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProductImage(file);
            setErrors(prev => ({ ...prev, productImage: "" }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const formData = new FormData();
            formData.append("name",productName);
            formData.append("description",description);
            formData.append("price",price);
            formData.append("token",token)
            if(productImage){
                formData.append("image",productImage)
            }
        //   console.log(formData);
        console.log("FormData:", Object.fromEntries(formData.entries())); // Debugging
        
        dispatch(addProduct(formData));

            setProductName("");
            setDescription("");
            setPrice("");
            setProductImage(null);
            setErrors({});
        }
    };

    return (
        <Layout>
            <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
                <div>
                    <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
                        Add Product
                    </h3>
                </div>
            </div>
            <div className="bg-white">
                <div className="p-4 rounded-lg dark:border-gray-700">
                    <div className="w-full">
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                    Product Name
                                </label>
                                <input
                                    className={`w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                                        errors.productName ? "border-red-500" : ""
                                    }`}
                                    type="text"
                                    placeholder="Product Name"
                                    value={productName}
                                    onChange={(e) => {
                                        setProductName(e.target.value);
                                        setErrors(prev => ({ ...prev, productName: "" }));
                                    }}
                                />
                                {errors.productName && (
                                    <p className="text-red-500 text-xs text-start mt-1">{errors.productName}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                    Product Image
                                </label>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 ${
                                            errors.productImage ? "border-red-500" : "border-gray-300"
                                        }`}
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            {productImage ? (
                                                <p className="text-sm text-gray-500">{productImage.name}</p>
                                            ) : (
                                                <>
                                                    <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                        aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                        fill="none" viewBox="0 0 20 16">
                                                        <path stroke="currentColor" strokeLinecap="round"
                                                            strokeLinejoin="round" strokeWidth="2"
                                                            d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                                    </svg>
                                                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                        <span className="font-semibold">Click to upload</span> or drag and drop
                                                    </p>
                                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                                        SVG, PNG, JPG or GIF (MAX. 800x400px)
                                                    </p>
                                                </>
                                            )}
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            className="hidden"
                                            onChange={handleFileChange}
                                            accept="image/*"
                                        />
                                    </label>
                                </div>
                                {errors.productImage && (
                                    <p className="text-red-500 text-xs text-start mt-1">{errors.productImage}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                    Description
                                </label>
                                <textarea
                                    className={`w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                                        errors.description ? "border-red-500" : ""
                                    }`}
                                    placeholder="Description"
                                    value={description}
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                        setErrors(prev => ({ ...prev, description: "" }));
                                    }}
                                />
                                {errors.description && (
                                    <p className="text-red-500 text-xs text-start mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div className="mb-4">
                                <label className="block mb-2 text-sm font-medium text-gray-700 text-left">
                                    Price
                                </label>
                                <input
                                    className={`w-full px-3 py-3 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline ${
                                        errors.price ? "border-red-500" : ""
                                    }`}
                                    id="price"
                                    type="text"
                                    placeholder="Price"
                                    value={price}
                                    onChange={(e) => {
                                        setPrice(e.target.value);
                                        setErrors(prev => ({ ...prev, price: "" }));
                                    }}
                                />
                                {errors.price && (
                                    <p className="text-red-500 text-xs text-start mt-1">{errors.price}</p>
                                )}
                            </div>

                            <div className='flex justify-between'>
                                <Link to="/Product" type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
                                    Back
                                </Link>
                                <button type="submit"
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </Layout>
    );
}