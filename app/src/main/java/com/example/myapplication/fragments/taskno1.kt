package com.example.myapplication.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import com.example.myapplication.R
import com.example.myapplication.databinding.FragmentTaskno1Binding

class taskno1 : Fragment() {

    private val binding : FragmentTaskno1Binding by lazy {
        FragmentTaskno1Binding.inflate(layoutInflater)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        binding.next.setOnClickListener {
            Navigation.findNavController(binding.root).navigate(R.id.action_taskno12_to_all_tasks_over2)
        }
        // Inflate the layout for this fragment
        return binding.root
    }

}