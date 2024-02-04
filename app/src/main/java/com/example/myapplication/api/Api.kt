package com.example.myapplication.api

import com.example.myapplication.model.feeling_class
import com.example.myapplication.model.res
import retrofit2.Call
import retrofit2.http.Field
import retrofit2.http.FormUrlEncoded
import retrofit2.http.POST

interface Api {

    @FormUrlEncoded
    @POST("search")
    fun text_send(
        @Field("text") text:String
    ): Call<res>

}