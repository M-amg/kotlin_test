import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BaseService from "../../service/service";
import DeleteAlert from "../delete-alert";
import Toast from "../toast";



export default function CategoriesList() {
    const [categories, setCategories] = useState([{ name: "", parentId: "", id: 0 }])
    const [categoryId, setCategoryId] = useState<number>()
    const [dialog, setDialog] = useState({
        message: "",
        isLoading: false,
      });
    const [toast, setToast] = useState({
        message: "",
        status:"",
        isLoading: false,
      });
    async function fetchData() {
        const result = await BaseService.getAll("/categories").then(res => res);
        setCategories(result.Data)

    }
    useEffect(() => {
        fetchData();
    }, []);

    const areUSureDelete = async (choose:boolean) => {
        if (choose) {
            const result = await BaseService.delete("/categories/",categoryId).then(res => res);
            const message: string = result.Messages
            const status: string = result.Status ? "success" : "fail"
            const isLoading:boolean = true
            setToast({ 
                message,
                status,
                isLoading,
            })
            fetchData();

          handleDialog("", false);
        } else {
          handleDialog("", false);
        }
      };

      const closeToast = () => {
        handleToast(
            "",
            "",
            false,
        )
      }
      const handleToast = (message:string="", status:string="",isLoading:boolean=false) => {
        setToast({ 
            message,
            status,
            isLoading,
        })
      };
      const handleDialog = (message:string, isLoading:boolean) => {
        setDialog({
          message,
          isLoading,
          //Update
        });
      
      };

      const handleDelete = (id: number) => {
        setCategoryId(id)
        handleDialog("Category", true);
      };

    return (
        <div className="px-4 sm:px-6 lg:px-8">
            <div className="sm:flex sm:items-center">
                <div className="sm:flex-auto">
                    <h1 className="text-xl font-semibold text-gray-900">Categories</h1>
                    <p className="mt-2 text-sm text-gray-700">
                        A list of all categorys.
                    </p>
                </div>
                <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
                    <a href="/categories/create"
                        className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
                    >
                        Add category
                    </a>
                </div>
            </div>
            <div className="mt-8 flex flex-col">
                <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-300">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                            Name
                                        </th>
                                        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                                            Parent
                                        </th>

                                        <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                                            <span className="sr-only">Edit</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 bg-white">
                                    {(categories || []).map((category) => (
                                        <tr key={category.id}>
                                            <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                                                {category.name}
                                            </td>
                                            <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                                                <div className="text-gray-900">{category.parentId}</div>
                                            </td>
                                            <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                                                <Link to={"/categories/" + category.id + "/edite"} className="text-indigo-600 mr-2 hover:text-indigo-900">
                                                    Edit<span className="sr-only">, {category.name}</span>
                                                </Link>
                                                <button className="text-red-600 hover:text-indigo-900" type="button" onClick={() => handleDelete(category.id)}  >
                                                    Delete<span className="sr-only">, {category.name}</span>
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {dialog.isLoading && (
                                <DeleteAlert
                                onDialog={areUSureDelete}
                                message={dialog.message}
                                />
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {toast.isLoading && (<Toast message={toast.message} status ={toast.status} onClose={closeToast}/>)}
        </div>

    )
}
