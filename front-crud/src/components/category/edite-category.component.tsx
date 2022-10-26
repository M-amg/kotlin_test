import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BaseService from "../../service/service";
import Toast from "../toast";
import validator, { noErrors, FormErrors } from "../validator";
import CategoryForm from "./category-form";


interface IProps {
}
const initCategory = {
  id:'',
  name: '',
  parentId: ''
}

const EditeCategory: React.FunctionComponent<IProps> = props => {
  const [formValue, setFormValue] = useState(initCategory);
  const [errors, setErrors] = useState<FormErrors>({});
  const { id } = useParams()
  const [toast, setToast] = useState({
    message: "",
    status: "",
    isLoading: false,
  });

  useEffect(() => {
      async function fetchData() {
       
        const category = await BaseService.get("/categories/",id).then(res=> res);
        setFormValue(category.Data)
      }
  
      // Trigger the fetch
      fetchData();
    }, []);
  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const rules = [
      { key: "name", required: true, label: "category name" },
      { key: "parentId", label: "Parent" }
    ];
    validator(
      formValue,
      rules,
      (errors: any): any => {
        if (noErrors(errors)) {

          setFormValue(initCategory);
          return false;
        }
        setErrors(errors);
      }
    );
    const result= await BaseService.update("/categories/",id,formValue).then(res => res)
    const message: string = result.Messages
    const status: string = result.Status ? "success" : "fail"
    const isLoading: boolean = true
    setToast({
      message,
      status,
      isLoading,
    })
  };
  
  const closeToast = () => {
    handleToast(
      "",
      "",
      false,
    )
  }
  const handleToast = (message: string = "", status: string = "", isLoading: boolean = false) => {
    setToast({
      message,
      status,
      isLoading,
    })
  };

  const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const onSelectChange =  (event:any) => {
    const { name, value } = event.target;
    setFormValue({ ...formValue, [name]: value });
  };
  return (
    <>
      <div className="m-10 sm:mt-0">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Category Information</h3>
              <p className="mt-1 text-sm text-gray-600">
                form for add new category.
              </p>
            </div>
          </div>
          <div className="mt-5 md:col-span-2 md:mt-0">
            <form action="#" method="POST" onSubmit={onFormSubmit}>
              <div className="overflow-hidden shadow sm:rounded-md">
                <div className="bg-white px-4 py-5 sm:p-6">
                <CategoryForm onInputChange={onInputChange} onSelectChange={onSelectChange} formValue={formValue} errors={errors} />
                </div>
                <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      {toast.isLoading && (<Toast message={toast.message} status={toast.status} onClose={closeToast} />)}

    </>
  );
};
export default EditeCategory;
