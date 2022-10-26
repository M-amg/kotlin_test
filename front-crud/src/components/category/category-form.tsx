import { useEffect, useState } from "react";
import BaseService from "../../service/service";

export default function CategoryForm({ onInputChange,onSelectChange, formValue,errors }: any) {
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

                <div className="col-span-6">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Category name
                    </label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        value={formValue.name}
                        onChange={(e)=>onInputChange(e,formValue)}
                        autoComplete="name"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors["name"] && errors["name"].length > 0 && (
                        <p className="mt-2 text-sm text-red-500">{errors["name"].join(",")}</p>
                    )}
                </div>

                <div className="col-span-6">
                    <label htmlFor="parentId" className="block text-sm font-medium text-gray-700">
                        Parent category
                    </label>
                    <select
                        id="parentId"
                        name="parentId"
                        onChange={(e) =>onSelectChange(e,formValue)}
                        className="mt-1 block w-full rounded-md border border-gray-300 bg-white py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    >
                        <option value=""></option>
                        {(categories || []).map((category) => (
                            <option value={category.id}>{category.name}</option>
                        ))}

                    </select>

                </div>


            </div>
        </>
    )
}