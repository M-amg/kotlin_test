package com.crud.productcategory.service.category

import com.crud.productcategory.dto.CategoryDTO
import com.crud.productcategory.utils.exception.CategoryException
import com.crud.productcategory.repository.CategoryRepository
import com.crud.productcategory.utils.mapper.CategoryMapper
import mu.KotlinLogging
import org.springframework.stereotype.Service

private val logger = KotlinLogging.logger {}

@Service
class CategoryServiceImpl(private val categoryRepository: CategoryRepository,
                          private val categoryMapper: CategoryMapper) : CategoryService {

    override fun createCategory(categoryDTO: CategoryDTO): CategoryDTO {
        logger.info {"request data category $categoryDTO"}
        if (categoryDTO.id > 0)
            throw CategoryException("Id must be null or -1.")

        val category = categoryRepository.save(categoryMapper.toEntity(categoryDTO))
        return categoryMapper.fromEntity(category)
    }

    override fun getCategories(): List<CategoryDTO> {
        val category = categoryRepository.findAll()

        if (category.isEmpty())
            throw CategoryException("List of categories is empty.")

        return category.map {
            categoryMapper.fromEntity(it)
        }
    }

    override fun getCategory(id: Long): CategoryDTO {
        val optionalCategory = categoryRepository.findById(id)
        val category = optionalCategory.orElseThrow { CategoryException("Category with id $id is not present") }
        return categoryMapper.fromEntity(category)
    }

    override fun updateCategory(id: Long,categoryDTO: CategoryDTO): CategoryDTO {
        val exists = categoryRepository.existsById(id)

        if (!exists)
            throw CategoryException("Category with id ${id} is not present")

        categoryRepository.save(categoryMapper.toEntity(categoryDTO))
        return categoryDTO
    }

    override fun deleteCategory(id: Long) {
        val exists = categoryRepository.existsById(id)

        if (!exists)
            throw CategoryException("Category with id $id is not present")

        categoryRepository.deleteById(id)
    }
}