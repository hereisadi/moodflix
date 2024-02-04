package com.example.myapplication.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import com.example.myapplication.R
import com.example.myapplication.databinding.FragmentTasks2Binding

class tasks2 : Fragment() {
    private val binding: FragmentTasks2Binding by lazy {
        FragmentTasks2Binding.inflate(layoutInflater)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding.buttonSignup.setOnClickListener {
            Navigation.findNavController(binding.root).navigate(R.id.action_tasks2_to_taskno12)
        }
        return binding.root
    }
}