package com.example.myapplication.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import androidx.navigation.Navigation
import androidx.navigation.Navigation.findNavController
import com.example.myapplication.R
import com.example.myapplication.databinding.FragmentProfileBinding
import com.example.myapplication.databinding.FragmentTaskBinding

class taskFragment : Fragment() {

    private val binding : FragmentTaskBinding by lazy{
        FragmentTaskBinding.inflate(layoutInflater)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding.procBtn.setOnClickListener {
            Navigation.findNavController(binding.root).navigate(R.id.navigate_to_task_2)
        }
        return binding.root
    }
}