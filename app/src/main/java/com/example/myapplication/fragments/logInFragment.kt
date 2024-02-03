package com.example.myapplication.fragments

import android.content.Intent
import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.myapplication.Landing_page
import com.example.myapplication.R
import com.example.myapplication.databinding.FragmentLogInBinding

class logInFragment : Fragment() {
    private val binding : FragmentLogInBinding by lazy {
        FragmentLogInBinding.inflate(layoutInflater)
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding.button.setOnClickListener {
            val intent = Intent(requireContext(),Landing_page::class.java)
            startActivity(intent)
            activity?.finish()
        }

        binding.signUpTV.setOnClickListener {
            val transaction = fragmentManager?.beginTransaction()
            transaction?.replace(R.id.fragmentContainerView3,signUpFragment())?.commit()
        }

        return binding.root
    }

}