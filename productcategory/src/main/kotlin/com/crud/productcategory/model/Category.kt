package com.crud.productcategory.model

import javax.persistence.CascadeType
import javax.persistence.Entity
import javax.persistence.FetchType
import javax.persistence.GeneratedValue
import javax.persistence.GenerationType
import javax.persistence.Id
import javax.persistence.OneToMany

@Entity
data class Category(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    var id: Long = 0,
    var name: String = "",
    var parentId:Long? = null,
    @OneToMany(cascade = [CascadeType.ALL], fetch = FetchType.LAZY)
    var products: List<Product>,
){
    constructor(id: Long, name: String, parentId: Long?) : this(id,name,parentId,ArrayList())

}