package com.example.fitguard.ui.dashboard

import androidx.lifecycle.LiveData
import androidx.lifecycle.ViewModel
import androidx.lifecycle.asLiveData
import androidx.lifecycle.viewModelScope
import com.example.fitguard.data.pref.SettingPreference
import kotlinx.coroutines.launch

class DashboardViewModel(private val pref:SettingPreference): ViewModel() {

    fun getNotificationSettings(): LiveData<Boolean> { // New method for notification
        return pref.getNotificationSetting().asLiveData()
    }


    fun saveNotificationSetting(isNotificationActive: Boolean) { // New method for notification
        viewModelScope.launch {
            pref.saveNotificationSetting(isNotificationActive)
        }
    }

}