package com.crud.productcategory.service.product

import com.crud.productcategory.dto.ProductDTO

interface ProductService {

    fun createProduct(productDTO: ProductDTO): ProductDTO

    fun getProducts(): List<ProductDTO>

    fun getProduct(id: Long): ProductDTO

    fun updateProduct(id: Long,productDTO: ProductDTO): ProductDTO

    fun deleteProduct(id: Long)
}