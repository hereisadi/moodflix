package com.example.myapplication.fragments

import android.os.Bundle
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import com.example.myapplication.R
import com.example.myapplication.databinding.FragmentLogInBinding
import com.example.myapplication.databinding.FragmentSignUpBinding

class signUpFragment : Fragment() {
    private val binding : FragmentSignUpBinding by lazy {
        FragmentSignUpBinding.inflate(layoutInflater)
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
            val transaction = fragmentManager?.beginTransaction()
            transaction?.replace(R.id.fragmentContainerView3,logInFragment())?.commit()
        }

        binding.logInTV.setOnClickListener {
            val transaction = fragmentManager?.beginTransaction()
            transaction?.replace(R.id.fragmentContainerView3,logInFragment())?.commit()
        }
        return binding.root
    }

}