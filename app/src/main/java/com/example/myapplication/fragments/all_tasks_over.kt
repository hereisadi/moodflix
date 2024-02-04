package com.example.myapplication.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import com.example.myapplication.R
import com.example.myapplication.databinding.FragmentAllTasksOverBinding
import com.example.myapplication.databinding.FragmentTaskBinding
import com.example.myapplication.databinding.FragmentTaskno1Binding

class all_tasks_over : Fragment() {
    private val binding : FragmentAllTasksOverBinding by lazy {
        FragmentAllTasksOverBinding.inflate(layoutInflater)
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
            Navigation.findNavController(binding.root).navigate(R.id.action_all_tasks_over2_to_homeFragment)
        }
        return binding.root
    }

}