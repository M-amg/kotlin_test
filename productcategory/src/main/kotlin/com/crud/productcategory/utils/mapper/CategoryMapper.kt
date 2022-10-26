package com.crud.productcategory.utils.mapper

import com.crud.productcategory.dto.CategoryDTO
import com.crud.productcategory.model.Category
import mu.KotlinLogging
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service
private val logger = KotlinLogging.logger {}

@Component
class CategoryMapper : Mapper<CategoryDTO, Category> {

    override fun fromEntity(entity: Category): CategoryDTO = CategoryDTO(
        entity.id,
        entity.name,
        entity.parentId
    )

    override fun toEntity(domain: CategoryDTO): Category {
        logger.warn { "mapper data $domain" }
        return Category(
            domain.id,
            domain.name,
            domain.parentId
        )
    }
}