import Category from "./category";

export default class Product {
    id?: number;
    label: string;
    description?: string;
    imageUrl?: string;
    price: number;
    currency: string;
    category?: any;
    
    constructor(id: number, label: string, description: string, imageUrl: string,price:number,currency: string,category:any) {
        this.id = id;
        this.label = label;
        this.description  = description;
        this.imageUrl = imageUrl;
        this.price  = price;
        this.currency  = currency;
        this.category  = category;
    }   
}