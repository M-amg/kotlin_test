import { useEffect, useState } from "react";
import BaseService from "../../service/service";

export default function ProductForm({ onInputChange, onSelectChange, formValue, errors }: any) {
    const [categories, setCategories] = useState([{ name: "", parentId: "", id: "" }])

    async function fetchData() {
        // Fetch data
        const result = await BaseService.getAll("/categories").then(res => res);
        setCategories(result.Data)

    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <>
            <div className="grid grid-cols-6 gap-6">

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="label" className="block text-sm font-medium text-gray-700">
                        Label
                    </label>
                    <input
                        type="text"
                        name="label"
                        id="label"
                        value={formValue.label}
                        onChange={(e)=>onInputChange(e,formValue)}
                        autoComplete="label"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors["labbel"] && errors["labbel"].length > 0 && (
                        <p className="mt-2 text-sm text-red-500">{errors["labbel"].join(",")}</p>
                    )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                        Category
                    </label>
                    <select
                        id="category_id"
                        name="category[id]"
                        value={formValue.category?.id || ""}
                        onChange={(e) => onSelectChange(e, formValue)}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value=""></option>
                        {(categories || []).map((category) => (
                            <option value={category.id}>{category.name}</option>
                        ))}

                    </select>
                    {errors["category"] && errors["category"].length > 0 && (
                        <p className="mt-2 text-sm text-red-500">{errors["category"].join(",")}</p>
                    )}
                </div>

                <div className="col-span-6">
                    <label htmlFor="image" className="block text-sm font-medium text-gray-700">
                            Image
                        </label>
                        <input
                            type="text"
                            name="imageUrl"
                            id="image"
                            value={formValue.imageUrl}
                            onChange={(e)=>onInputChange(e,formValue)}
                            autoComplete="imageUrl"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        />
                        {errors["labbel"] && errors["labbel"].length > 0 && (
                            <p className="mt-2 text-sm text-red-500">{errors["labbel"].join(",")}</p>
                        )}
                </div>
                <div className="col-span-6">
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                        Description
                    </label>
                    <div className="mt-1">
                        <textarea
                            id="description"
                            name="description"
                            rows={3}
                            value={formValue.description}
                            onChange={(e)=>onInputChange(e,formValue)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                            placeholder="product description"
                            defaultValue={''}
                        />
                    </div>
                    {errors["category"] && errors["category"].length > 0 && (
                        <p className="mt-2 text-sm text-red-500">{errors["category"].join(",")}</p>
                    )}
                </div>



                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                        Price
                    </label>
                    <input
                        type="text"
                        name="price"
                        value={formValue.price}
                        onChange={(e)=>onInputChange(e,formValue)}
                        id="price"
                        autoComplete="address-level2"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors["category"] && errors["category"].length > 0 && (
                        <p className="mt-2 text-sm text-red-500">{errors["category"].join(",")}</p>
                    )}
                </div>

                <div className="col-span-6 sm:col-span-3">
                    <label htmlFor="currency" className="block text-sm font-medium text-gray-700">
                        Currency
                    </label>
                    <input
                        type="text"
                        name="currency"
                        value={formValue.currency}
                        onChange={(e)=>onInputChange(e,formValue)}
                        id="region"
                        autoComplete="address-level1"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors["category"] && errors["category"].length > 0 && (
                        <p className="mt-2 text-sm text-red-500">{errors["category"].join(",")}</p>
                    )}
                </div>


            </div>
        </>
    )
}