package com.crud.productcategory.dto

import javax.validation.constraints.NotBlank

data class CategoryDTO (
        var id: Long = 0,
        @NotBlank(message = "category name is required")
        var name: String = "",
        var parentId: Long? = 0
        )
