package com.crud.productcategory.controller

import com.crud.productcategory.dto.ProductDTO
import com.crud.productcategory.service.product.ProductService
import mu.KotlinLogging
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*
import javax.validation.Valid

private val logger = KotlinLogging.logger {}

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = arrayOf("http://localhost:3000/"))
class ProductController(private val productService: ProductService) {

    @PostMapping
    fun createProduct(@Valid @RequestBody productDTO: ProductDTO): ResponseEntity<ProductDTO> {
        logger.info {"request data product $productDTO"}

        return ResponseEntity(productService.createProduct(productDTO), HttpStatus.CREATED)
    }

    @GetMapping
    fun getProducts(): ResponseEntity<List<ProductDTO>> =
        ResponseEntity.ok(productService.getProducts())

    @GetMapping("/{id}")
    fun getProduct(@PathVariable id: Long) =
        ResponseEntity.ok(productService.getProduct(id))

    @PutMapping("/{id}")
    fun updateProduct(@Valid @PathVariable id: Long,@RequestBody productDTO: ProductDTO): ResponseEntity<ProductDTO> =
        ResponseEntity.ok(productService.updateProduct(id,productDTO))

    @DeleteMapping("/{id}")
    fun deleteProduct(@PathVariable id: Long): ResponseEntity<Unit> =
        ResponseEntity(productService.deleteProduct(id), HttpStatus.NO_CONTENT)

}