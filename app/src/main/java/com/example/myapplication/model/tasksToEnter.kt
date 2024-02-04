package com.example.myapplication.model

data class tasksToEnter(
    var uniqueID: String,
    var taskName: String,
    var isCompleted: Boolean,
    var time: String = ""
)
