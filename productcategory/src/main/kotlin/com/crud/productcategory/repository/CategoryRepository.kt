package com.crud.productcategory.repository

import com.crud.productcategory.model.Category
import org.springframework.data.jpa.repository.JpaRepository

interface CategoryRepository : JpaRepository<Category, Long>