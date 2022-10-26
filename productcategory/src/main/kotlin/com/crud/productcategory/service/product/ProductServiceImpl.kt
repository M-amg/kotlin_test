package com.crud.productcategory.service.product

import com.beust.klaxon.Klaxon
import com.crud.productcategory.dto.FixerDTO
import com.crud.productcategory.dto.ProductDTO
import com.crud.productcategory.utils.exception.ProductException
import com.crud.productcategory.repository.ProductRepository
import com.crud.productcategory.service.fixer.FixerService
import com.crud.productcategory.utils.mapper.ProductMapper
import mu.KotlinLogging
import org.springframework.stereotype.Service
private val logger = KotlinLogging.logger {}

@Service
class ProductServiceImpl( private val productRepository: ProductRepository,
                          private val productMapper: ProductMapper,
                          private val fixerService: FixerService) : ProductService {
    final val API_KEY="19KaIPfWOiklqbus26F9nL5xRruhBQuZ"

    override fun createProduct(productDTO: ProductDTO): ProductDTO {
        if (productDTO.id > 0)
            throw ProductException("Id must be null or -1.")
        if(!productDTO.currency.equals("EUR")){

            val fixer = Klaxon().parse<FixerDTO>(fixerService.getLatest(API_KEY,productDTO.currency,"EUR",productDTO.price))
            //val obj = JSONObject
            logger.info { "fixer $fixer" }
            if (fixer != null) {
                productDTO.price= fixer.result
                productDTO.currency="EUR"
            }
        }
        val product = productRepository.save(productMapper.toEntity(productDTO))
        return productMapper.fromEntity(product)
    }

    override fun getProducts(): List<ProductDTO> {
        val product = productRepository.findAll()
        if (product.isEmpty())
            throw ProductException("List of products is empty.")

        return product.map {
            productMapper.fromEntity(it)
        }
    }

    override fun getProduct(id: Long): ProductDTO {
        val optionalProduct = productRepository.findById(id)
        val product = optionalProduct.orElseThrow { ProductException("Product with id $id is not present") }
        return productMapper.fromEntity(product)
    }

    override fun updateProduct(id: Long,productDTO: ProductDTO): ProductDTO {
        val exists = productRepository.existsById(id)

        if (!exists)
            throw ProductException("Product with id ${id} is not present")

        productRepository.save(productMapper.toEntity(productDTO))
        return productDTO
    }

    override fun deleteProduct(id: Long) {
        val exists = productRepository.existsById(id)

        if (!exists)
            throw ProductException("Product with id $id is not present")

        productRepository.deleteById(id)
    }
}