package com.crud.productcategory.repository

import com.crud.productcategory.model.Product
import org.springframework.data.jpa.repository.JpaRepository

interface ProductRepository : JpaRepository<Product, Long>