package com.example.myapplication.model

data class feeling_class(
    var textSerched: String,
    var time: String,
    var feelingResponse: String,
    var tasks: List<tasksToEnter>,
)