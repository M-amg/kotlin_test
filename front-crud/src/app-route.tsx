import React from 'react';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import CreateCategory from './components/category/create-category.component'
import EditeCategorym from './components/category/edite-category.component';
import CategoriesList from './components/category/categories-list.component';
import CreateProduct from './components/product/create-product.component';
import EditeProduct from './components/product/edite-product.component';
import ProductsList from './components/product/products-list.component';

export default function AppRoute(){
    return (
        <BrowserRouter>
            <Routes>
                <Route path='products' element={
                    <ProductsList />
                }/>
                <Route path='products/create' element={
                    <CreateProduct />
                }/>
                <Route path='products/:id/edite' element={
                    <EditeProduct />
                }/>
                <Route path='categories' element={
                    <CategoriesList />
                }/>
                 <Route path='categories/create' element={
                    <CreateCategory />
                }/>
                 <Route path='categories/:id/edite' element={
                    <EditeCategorym />
                }/>
                
            </Routes>
        </BrowserRouter>
    )
}