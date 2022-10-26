package com.crud.productcategory.model

import javax.persistence.Entity
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.ManyToOne

@Entity
data class Product(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long =0,
    var label: String = "",
    var description: String = "",
    var price: Double = 0.0,
    var image: String = "",
    var currency: String = "MAD",
    @ManyToOne
    var category: Category? = null,
){}