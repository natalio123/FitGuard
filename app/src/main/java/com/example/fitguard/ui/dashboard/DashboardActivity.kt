package com.example.fitguard.ui.dashboard

import android.os.Bundle
import android.widget.LinearLayout
import android.widget.Toast
import androidx.activity.viewModels
import androidx.appcompat.app.AppCompatActivity
import androidx.fragment.app.viewModels
import com.example.fitguard.R
import com.example.fitguard.data.factory.PrefViewModelFactory
import com.example.fitguard.data.notification.NotificationUtils
import com.example.fitguard.databinding.ActivityDashboardBinding
import com.example.fitguard.ui.HealthRecordFragment
import com.example.fitguard.ui.MedicationReminderFragment
import com.example.fitguard.ui.NutritionTrackerFragment
import com.example.fitguard.ui.PhysicalActivityFragment
import com.example.fitguard.ui.WaterTrackerFragment

class DashboardActivity : AppCompatActivity() {

    private lateinit var binding: ActivityDashboardBinding
    private val viewModel: DashboardViewModel by viewModels {
        PrefViewModelFactory.getInstance(this)
    }


    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityDashboardBinding.inflate(layoutInflater)
        setContentView(binding.root)

        viewModel.getNotificationSettings().observe(this) { isNotificationActive ->
            binding.switchAlarm.isChecked = isNotificationActive
        }


        binding.switchAlarm.setOnCheckedChangeListener { _, isChecked ->
            viewModel.saveNotificationSetting(isChecked)
            if (isChecked) {
                NotificationUtils.scheduleDailyNotification(this)
            } else {
                NotificationUtils.cancelNotifications(this)
            }
        }

        // Setting click listeners using ViewBinding
        binding.healthRecordCard.setOnClickListener {
            val transaction = supportFragmentManager.beginTransaction()
            transaction.replace(R.id.fragment_container, HealthRecordFragment())
            transaction.addToBackStack(null)
            transaction.commit()
        }

        binding.nutritionTrackerCard.setOnClickListener {
            val transaction = supportFragmentManager.beginTransaction()
            transaction.replace(R.id.fragment_container, NutritionTrackerFragment())
            transaction.addToBackStack(null)
            transaction.commit()
        }

        binding.medicationReminderCard.setOnClickListener {
            val transaction = supportFragmentManager.beginTransaction()
            transaction.replace(R.id.fragment_container, MedicationReminderFragment())
            transaction.addToBackStack(null)
            transaction.commit()
        }

        binding.physicalActivityCard.setOnClickListener {
            val transaction = supportFragmentManager.beginTransaction()
            transaction.replace(R.id.fragment_container, PhysicalActivityFragment())
            transaction.addToBackStack(null)
            transaction.commit()
        }

        binding.waterTrackerCard.setOnClickListener {
            val transaction = supportFragmentManager.beginTransaction()
            transaction.replace(R.id.fragment_container, WaterTrackerFragment())
            transaction.addToBackStack(null)
            transaction.commit()
        }

        binding.foodRecommendationCard.setOnClickListener {
            Toast.makeText(this, "Food Recommendation selected", Toast.LENGTH_SHORT).show()
            // Handle navigation or actions for Food Recommendation
        }

        binding.physicalActivitiesRecommendationCard.setOnClickListener {
            Toast.makeText(this, "Physical Activities Recommendation selected", Toast.LENGTH_SHORT).show()
            // Handle navigation or actions for Physical Activities Recommendation
        }

        binding.regularBedtimeRecommendationCard.setOnClickListener {
            Toast.makeText(this, "Regular Bedtime Recommendation selected", Toast.LENGTH_SHORT).show()
            // Handle navigation or actions for Regular Bedtime Recommendation
        }
    }
}
