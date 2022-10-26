package com.crud.productcategory.controller

import com.crud.productcategory.dto.ProductDTO
import com.fasterxml.jackson.databind.ObjectMapper
import mu.KotlinLogging
import org.junit.jupiter.api.DisplayName
import org.junit.jupiter.api.Nested
import org.junit.jupiter.api.Order
import org.junit.jupiter.api.Test
import org.junit.jupiter.api.TestInstance
import org.junit.jupiter.api.TestInstance.Lifecycle
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.web.servlet.*
import org.springframework.http.MediaType
import org.springframework.test.annotation.DirtiesContext

private val logger = KotlinLogging.logger {}

@AutoConfigureMockMvc
@SpringBootTest
internal class ProductControllerTest(
    @Autowired val mockMvc: MockMvc,
    @Autowired val objectMapper: ObjectMapper
) {

    val baseUrl = "/api/products"
    @Order(1)
    @Nested
    @DisplayName("POST /api/products")
    @TestInstance(Lifecycle.PER_CLASS)
    inner class PostNewProduct {

        @Test
        fun `should add a new product`() {
            // given
            var newProduct = ProductDTO(0, "product1", "desc", 201.00, "image1", "EUR")

            // when
            val performPost = mockMvc.post(baseUrl) {
                contentType = MediaType.APPLICATION_JSON
                content = objectMapper.writeValueAsString(newProduct)
            }
            // then
            performPost
                .andDo {
                    newProduct.id=1
                    logger.info { "product test $newProduct" }
                    mockMvc.get("$baseUrl/1")
                    .andExpect { content { json(objectMapper.writeValueAsString(newProduct)) } }

                }
                .andExpect {
                    status { isCreated() }
                    content {
                        contentType(MediaType.APPLICATION_JSON)
                        json(objectMapper.writeValueAsString(newProduct))
                    }
                }
        }
    }
    @Order(2)
    @Nested
    @DisplayName("GET /api/products")
    @TestInstance(Lifecycle.PER_CLASS)
    inner class GetProducts {
        @Test
        fun `should return all products`() {
            // when/then
            mockMvc.get(baseUrl)
                .andDo { print() }
                .andExpect {
                    status { isOk() }
                    content { contentType(MediaType.APPLICATION_JSON) }
                    jsonPath("$[0].label") { value("product1") }
                }
        }
    }

    @Order(3)
    @Nested
    @DisplayName("GET /api/products")
    @TestInstance(Lifecycle.PER_CLASS)
    inner class GetProduct {
        @Test
        fun `should return product`() {
            // when/then
            mockMvc.get("$baseUrl/1")
                .andDo { print() }
                .andExpect {
                    status { isOk() }
                    content { contentType(MediaType.APPLICATION_JSON) }
                    jsonPath("$.label") { value("product1") }
                }
        }
    }

    @Order(4)
    @Nested
    @DisplayName("PUT /api/products")
    @TestInstance(Lifecycle.PER_CLASS)
    inner class UpdateProduct {

        @Test
        fun `should update the product`() {
            // given
            var updateProduct = ProductDTO(1, "product1_update", "desc", 201.00, "image1", "EUR")

            // when
            val performPost = mockMvc.put("$baseUrl/1") {
                contentType = MediaType.APPLICATION_JSON
                content = objectMapper.writeValueAsString(updateProduct)
            }
            // then
            performPost
                .andDo {
                    mockMvc.get("$baseUrl/1")
                        .andExpect { content { json(objectMapper.writeValueAsString(updateProduct)) } }
                }
                .andExpect {
                    status { isOk() }
                    content {
                        contentType(MediaType.APPLICATION_JSON)
                        json(objectMapper.writeValueAsString(updateProduct))
                    }
                }
        }
        @Test
        fun `should return BadRequest if no product with given id number exists`() {
            // given
            val invalidProduct = -1
            var updateProduct = ProductDTO(-1, "product1_update", "desc", 201.00, "image1", "EUR")

            // when/then
            var performPost = mockMvc.put("$baseUrl/-1") {
                contentType = MediaType.APPLICATION_JSON
                content = objectMapper.writeValueAsString(updateProduct)
            }
            performPost
                .andDo {
                   print()
                }
                .andExpect {
                    status { isBadRequest() }

                }
        }
    }


    @Order(5)
    @Nested
    @DisplayName("DELETE /api/products/{id}")
    @TestInstance(Lifecycle.PER_CLASS)
    inner class DeleteExistingProduct {

        @Test
        @DirtiesContext
        fun `should delete the product`() {
            // given
            val id = 1

            // when/then
            mockMvc.delete("$baseUrl/$id")
                .andDo { print() }
                .andExpect {
                    status { isNoContent() }
                }

            mockMvc.get("$baseUrl/$id")
                .andExpect { status { isBadRequest() } }
        }

        @Test
        fun `should return BadRequest if no product with given id number exists`() {
            // given
            val invalidProduct = -1

            // when/then
            mockMvc.delete("$baseUrl/$invalidProduct")
                .andDo { print() }
                .andExpect { status { isBadRequest() } }
        }
    }


}