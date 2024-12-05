package com.example.fitguard.data.di

import android.content.Context
import androidx.datastore.core.DataStore
import androidx.datastore.preferences.core.Preferences
import androidx.datastore.preferences.preferencesDataStore
import com.example.fitguard.data.pref.SettingPreference

val Context.dataStore: DataStore<Preferences> by preferencesDataStore(name = "settings")
object Injection {

    fun provideSettingPreference(context: Context): SettingPreference {
        return SettingPreference.getInstance(context.dataStore)
    }

}