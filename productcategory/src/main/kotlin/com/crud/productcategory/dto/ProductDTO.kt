package com.crud.productcategory.dto

import io.swagger.v3.oas.annotations.media.Schema
import javax.validation.constraints.NotBlank
import javax.validation.constraints.NotEmpty
import javax.validation.constraints.NotNull


@Schema(description = "Model for a managing the products.")
data class ProductDTO(
    var id: Long = 0,
    @NotEmpty(message = "label is required")
    @field:Schema(
        description = "name of the product",
        example = "IPhon",
        type = "string",
        required=true
    )
    var label: String = "",
    @field:Schema(
        description = "description of the product",
        example = "IPhon 13 256G 5G ",
        type = "string",
        required=false
    )
    var description: String = "",
    @NotBlank(message = "price is required")
    @field:Schema(
        description = "price of the product",
        example = "1200 ",
        type = "number",
        required=true
    )
    var price: Double = 0.0,
    @field:Schema(
        description = "url image of the product",
        example = "https://www.lodj.ma/photo/art/default/66943204-47450968.jpg?v=1661447971",
        type = "text",
        required=false
    )
    var imageUrl: String = "",
    @NotBlank(message = "currency is required")
    @field:Schema(
        description = "currency of the price",
        example = "EUR",
        type = "text",
        required=true
    )
    var currency: String = "EUR",
    @field:Schema(
        description = "id category of the product",
        example = "1",
        type = "number",
        required=false
    )
    var category: CategoryDTO? = null
)
