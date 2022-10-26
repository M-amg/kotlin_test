package com.crud.productcategory.dto

import java.sql.Timestamp

data class FixerDTO (
        var success: Boolean,
        var query: String,
        var info: String,
        var date: String,
        var result: Double
        )