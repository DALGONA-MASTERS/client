import { Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { FontAwesome } from '@expo/vector-icons'
import { useRouter } from 'expo-router'

const profile = () => {
  const router = useRouter()
  const { user } = useUser()
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 100,
          display: 'flex',
          gap: 40,
        }}
      >
        <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 25 }}>Profile</Text>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 100, height: 100, borderRadius: 99 }}
        />
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          onPress={() => router.push('/profile/userDetail/detail')}
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            gap: 10,
            width: 350,
            borderWidth: 1,
            borderColor: '#b2b2b2',
            borderRadius: 8,
          }}
        >
          <View
            style={{
              backgroundColor: '#e2e2e2',
              padding: 17,
              borderTopLeftRadius: 7,
              borderBottomLeftRadius: 7,
            }}
          >
            <FontAwesome name="user" size={24} color="black" />
          </View>
          <Text style={{ display: 'flex' }}>Informations personnelles</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            backgroundColor: '#fff',
            gap: 10,
            width: 350,
            borderWidth: 1,
            borderColor: '#b2b2b2',
            borderRadius: 8,
          }}
        >
          <View
            style={{
              backgroundColor: '#e2e2e2',
              padding: 14,
              borderTopLeftRadius: 7,
              borderBottomLeftRadius: 7,
            }}
          >
            <MaterialIcons name="assistant-photo" size={24} color="black" />
          </View>
          <Text style={{ display: 'flex' }}>Assistance & support</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default profile

const styles = StyleSheet.create({})
