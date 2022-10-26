package com.crud.productcategory.controller

import com.crud.productcategory.dto.CategoryDTO
import com.crud.productcategory.service.category.CategoryService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.validation.annotation.Validated
import org.springframework.web.bind.annotation.CrossOrigin
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import javax.validation.Valid

@RestController
@RequestMapping("/api/categories")
@CrossOrigin(origins = arrayOf("http://localhost:3000"))
class CategoryController(private val categoryService: CategoryService) {

    @PostMapping
    fun createCategory(@Valid @RequestBody categoryDTO: CategoryDTO): ResponseEntity<CategoryDTO> {
        return ResponseEntity(categoryService.createCategory(categoryDTO), HttpStatus.CREATED)
    }

    @GetMapping
    fun getCategories(): ResponseEntity<List<CategoryDTO>> =
        ResponseEntity.ok(categoryService.getCategories())

    @GetMapping("/{id}")
    fun getCategory(@PathVariable id: Long) =
        ResponseEntity.ok(categoryService.getCategory(id))

    @PutMapping("/{id}")
    fun updateCategory(@Valid @RequestBody categoryDTO: CategoryDTO,@PathVariable id: Long): ResponseEntity<CategoryDTO> =
        ResponseEntity.ok(categoryService.updateCategory(id,categoryDTO))

    @DeleteMapping("/{id}")
    fun deleteCategory(@PathVariable id: Long): ResponseEntity<Unit> =
        ResponseEntity(categoryService.deleteCategory(id), HttpStatus.NO_CONTENT)

}