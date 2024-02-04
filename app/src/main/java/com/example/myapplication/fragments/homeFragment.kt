package com.example.myapplication.fragments

import android.os.Bundle
import android.util.Log
import androidx.fragment.app.Fragment
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.Toast
import androidx.navigation.Navigation
import com.example.myapplication.R
import com.example.myapplication.api.RetrofitClient
import com.example.myapplication.data.data.current_feeling
import com.example.myapplication.databinding.FragmentHomeBinding
import com.example.myapplication.model.feeling_class
import com.example.myapplication.model.res
import retrofit2.Call
import retrofit2.Callback
import retrofit2.Response

class homeFragment : Fragment() {

    private val binding: FragmentHomeBinding by lazy {
        FragmentHomeBinding.inflate(layoutInflater)
    }
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)

    }

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        // Inflate the layout for this fragment
        binding.searchFeeling.setOnClickListener {
            var text = binding.urFeeling.text.toString()

            RetrofitClient.instance.text_send(text)
                .enqueue(object: Callback<res>{
                    override fun onResponse(call: Call<res>, response: Response<res>) {
                        Toast.makeText(requireContext(),"Hey there You're feeling ${response.body()?.search?.feelingResponse}! Let's play some games and brighten up your time!",Toast.LENGTH_LONG).show()
                        current_feeling = response.body()?.search!!
                        Navigation.findNavController(binding.root).navigate(R.id.navigate_to_tasks)

                    }

                    override fun onFailure(call: Call<res>, t: Throwable) {
                        Toast.makeText(requireContext(),"FAILED",Toast.LENGTH_LONG).show()
                    }

                })
        }

        return binding.root
    }

}