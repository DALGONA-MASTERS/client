import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native'
import React from 'react'

const ProfileCard = ({ detail }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 5,
        marginRight: 20,
        paddingBottom: 20,
      }}
    >
      <Image
        source={require('./../../assets/images/profile.jpg')}
        style={{ width: 60, height: 60, borderRadius: 1000 }}
      />
      <Text style={{ textAlign: 'center', fontFamily: 'Outfit-Med' }}>
        Jamel
      </Text>
    </View>
  )
}

export default ProfileCard

const styles = StyleSheet.create({})
