import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Colors } from '../../constants/Colors'
import { FontAwesome6 } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

const DispoCard = ({ DispoProps }) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 150,
        backgroundColor: '#fff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#e6e6e6',
        marginTop: 10,
        padding: 20,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 40,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 30,
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 5,
            }}
          >
            <Text
              style={{ fontFamily: 'Outfit', fontSize: 10, color: '#b7b7b7' }}
            >
              Lundi, 21 Juillet 2024 · 14:00
            </Text>
            <Text
              numberOfLines={2}
              style={{
                fontFamily: 'Outfit-Bold',
                color: Colors.PRIMARY,
                width: '100%',
              }}
            >
              Plantation d'arbre
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Ionicons name="people-sharp" size={24} color="black" />
            <Text style={{ fontFamily: 'Outfit-Bold' }}>81 présents </Text>
          </View>
        </View>
        <View style={{ display: 'flex', gap: 12 }}>
          <Image
            source={require('./../../assets/images/plentation.jpg')}
            style={{ width: 150, height: 100, borderRadius: 10 }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'flex-end',
              gap: 5,
              position: 'relative',
              bottom: 10,
            }}
          >
            <FontAwesome6 name="share-square" size={15} color="black" />
            <MaterialIcons name="arrow-circle-right" size={20} color="black" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default DispoCard

const styles = StyleSheet.create({})
