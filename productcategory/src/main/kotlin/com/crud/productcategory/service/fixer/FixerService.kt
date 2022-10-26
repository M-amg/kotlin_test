package com.crud.productcategory.service.fixer

import org.springframework.cloud.openfeign.FeignClient
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestHeader

@FeignClient(name="currency-exchange", url = "https://api.apilayer.com/fixer")
interface FixerService {
    @GetMapping("/convert?to={to}&from={from}&amount={amount}")
    fun getLatest(@RequestHeader("apikey") apikey: String,
                  @PathVariable("from") from:String,
                  @PathVariable("to") to:String,
                  @PathVariable("amount") amount:Double): String
}