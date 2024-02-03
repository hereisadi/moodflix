package com.example.myapplication

import androidx.appcompat.app.AppCompatActivity
import android.os.Bundle
import android.view.View
import androidx.navigation.findNavController
import androidx.navigation.ui.setupWithNavController
import com.example.myapplication.databinding.ActivityLandingPageBinding

class Landing_page : AppCompatActivity() {
    private val binding: ActivityLandingPageBinding by lazy{
        ActivityLandingPageBinding.inflate(layoutInflater)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(binding.root)

        val container = findViewById<View>(R.id.fragmentContainerView)
        val bottomBar = binding.bottomNavigationView

        bottomBar?.setupWithNavController(container.findNavController())
    }
}