import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Colors } from '../../constants/Colors'

const TabLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.PRIMARY,
        headerShown: false,
        tabBarStyle: {
          padding: 15,
          height: 80,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: { width: 2, height: -4 },
          shadowOpacity: 0.3,
          shadowRadius: 5,
          elevation: 5,
        },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          tabBarLabel: 'Accueil',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="detail"
        options={{
          tabBarLabel: 'Recherche',
          tabBarIcon: ({ color }) => (
            <Ionicons name="search-sharp" size={30} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="message"
        options={{
          tabBarLabel: 'Messages',
          tabBarIcon: ({ color }) => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={30}
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  )
}

export default TabLayout

const styles = StyleSheet.create({})
