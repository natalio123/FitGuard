package com.example.fitguard.data.factory

import android.content.Context
import androidx.lifecycle.ViewModel
import androidx.lifecycle.ViewModelProvider
import com.example.fitguard.data.di.Injection
import com.example.fitguard.data.pref.SettingPreference
import com.example.fitguard.ui.dashboard.DashboardViewModel

class PrefViewModelFactory(private val pref: SettingPreference) : ViewModelProvider.NewInstanceFactory() {

    @Suppress("UNCHECKED_CAST")
    override fun <T : ViewModel> create(modelClass: Class<T>): T {
        return when {
            modelClass.isAssignableFrom(DashboardViewModel::class.java) -> {
                DashboardViewModel(pref) as T
            }


            else -> throw IllegalArgumentException("Unknown ViewModel class: " + modelClass.name)
        }
    }

    companion object {
        private var instance: PrefViewModelFactory? = null

        fun getInstance(context: Context): PrefViewModelFactory {
            return instance ?: synchronized(this) {
                val pref = Injection.provideSettingPreference(context)
                instance ?: PrefViewModelFactory(pref).also { instance = it }
            }
        }
    }


}