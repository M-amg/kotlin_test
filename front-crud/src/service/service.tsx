import Response from "../models/response";
import axios from "axios";


export default class BaseService {
    private static baseURL: string = process.env.REACT_APP_API_URL || "http://localhost:8080/api";


    public static async getAll<T>(url: string): Promise<Response> {
        console.log("🚀 ~ file: service.tsx ~ line 12 ~ BaseService ~ this.baseURL", this.baseURL)

        let res = await axios.get<Array<T>>(this.baseURL + url)
            .then((response: any) => {
                const result = response.data;
                if(result && response.status == 200){
                    return new Response(true, result  as Array<T>, "Success", "");
                }else{
                    const msg = (result.message && result.message.length > 0) ? result.message: "Error";
                    return new Response(false, null, "Error", msg);
                }
              
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }

    public static get<T>(url: string, param: any): Promise<Response> {
        let res = axios.get<T>(this.baseURL + url + param)
            .then((response: any) => {
                const result = response.data;
                if(result && response.status == 200){
                    return new Response(true, result , "Success", "");
                }else{
                    const msg = (result.message && result.message.length > 0) ? result.message: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }
    public static delete(url: string, param: any): Promise<Response> {       

        let res = axios.delete(this.baseURL + url +  param )
            .then(response => { 
                console.log("🚀 ~ file: service.tsx ~ line 47 ~ BaseService ~ delete ~ response", response)
                const result = response.data;
                if(response.status == 204){
                    return new Response(true, result , "The item has been deleted successfully", "");
                }else{
                    const msg = (result.message && result.message.length > 0) ? result.message: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }
    public static create<T>(url: string, obj: T): Promise<Response> {

        let res = axios.post(this.baseURL + url ,obj)
            .then(response => {
                const result = response.data;
                
                if(result && response.status==201){
                    return new Response(true, result , "The item has been created successfully", "");
                }else{
                    const msg = (result.message && result.message.length > 0) ? result.message: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);
            });
        return res;
    }
    public static update<T>(url: string, param: any, obj: T): Promise<Response> {

        let res = axios.put(this.baseURL + url + param, obj)
            .then(response => {
                const result = response.data;
                if(result && response.status == 200){
                    return new Response(true, result , "The item has been updated successfully", "");
                }else{
                    const msg = (result.message && result.message.length > 0) ? result.message: "Error";
                    return new Response(false, null, "Error", msg);
                }
            })
            .catch(function (error) {
                return new Response(false, null, "Error", error);;
            });
        return res;
    }
}