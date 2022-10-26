package com.crud.productcategory.service.category

import com.crud.productcategory.dto.CategoryDTO


interface CategoryService {

    fun createCategory(categoryDTO: CategoryDTO): CategoryDTO

    fun getCategories(): List<CategoryDTO>

    fun getCategory(id: Long): CategoryDTO

    fun updateCategory(id: Long,categoryDTO: CategoryDTO): CategoryDTO

    fun deleteCategory(id: Long)
}