package com.crud.productcategory.utils.mapper

import com.crud.productcategory.dto.CategoryDTO
import com.crud.productcategory.dto.ProductDTO
import com.crud.productcategory.model.Category
import com.crud.productcategory.model.Product
import org.springframework.stereotype.Component
import org.springframework.stereotype.Service

@Component
class ProductMapper(categoryMapper: CategoryMapper)  : Mapper<ProductDTO, Product> {

    override fun fromEntity(entity: Product): ProductDTO {
        val productDTO = ProductDTO()
        productDTO.id = entity.id
        productDTO.label = entity.label
        productDTO.description = entity.description
        productDTO.price = entity.price
        productDTO.imageUrl = entity.image
        productDTO.currency = entity.currency

        productDTO.category = entity.category?.let {
            CategoryDTO(
                it.id,
                it.name,
                it.parentId
            )
        }
        return productDTO
    }

    override fun toEntity(domain: ProductDTO): Product {
         var product =Product()
        product.id = domain.id
        product.label = domain.label
        product.description = domain.description
        product.price = domain.price
        product.image = domain.imageUrl
        product.currency = domain.currency
        product.category = domain.category?.let {
            Category(
                it.id,
                it.name,
                it.parentId
            )
        }
        return product
    }
}