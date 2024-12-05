package com.example.fitguard.ui

import android.content.res.ColorStateList
import android.graphics.Color
import android.graphics.Typeface
import android.os.Bundle
import android.view.Gravity
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import android.widget.LinearLayout
import android.widget.TextView
import androidx.fragment.app.Fragment
import com.example.fitguard.databinding.FragmentHealthRecordBinding
import com.example.fitguard.R

class HealthRecordFragment : Fragment() {

    private var _binding: FragmentHealthRecordBinding? = null
    private val binding get() = _binding!!

    override fun onCreateView(
        inflater: LayoutInflater, container: ViewGroup?,
        savedInstanceState: Bundle?
    ): View? {
        _binding = FragmentHealthRecordBinding.inflate(inflater, container, false)
        binding.backButton.setOnClickListener {
            requireActivity().onBackPressedDispatcher.onBackPressed()
        }
        return binding.root
    }

    override fun onViewCreated(view: View, savedInstanceState: Bundle?) {
        super.onViewCreated(view, savedInstanceState)

        // Handle add data button click
        binding.addDataButton.setOnClickListener {
            val dialog = AddDataDialogFragment { dataType, dataValue, date ->
                when (dataType) {
                    "Glucose Levels" -> {
                        binding.glucoseCard.findViewById<TextView>(R.id.glucoseValue).text = dataValue
                        binding.glucoseCard.findViewById<TextView>(R.id.glucoseDate).text = date
                    }
                    "Blood Pressure" -> {
                        binding.bloodPressureCard.findViewById<TextView>(R.id.bloodPressureValue).text = dataValue
                        binding.bloodPressureCard.findViewById<TextView>(R.id.bloodPressureDate).text = date
                    }
                }
            }
            dialog.show(parentFragmentManager, "AddDataDialogFragment")
        }
    }
    override fun onDestroyView() {
        super.onDestroyView()
        _binding = null
    }
}
