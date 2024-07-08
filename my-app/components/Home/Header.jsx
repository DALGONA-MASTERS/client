import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import { Link, useRouter } from 'expo-router'

const Header = () => {
  return (
    <View
      style={{
        paddingTop: 0,
        height: 100,
        backgroundColor: '#fff',
        shadowColor: '#000',
        shadowOffset: { width: 2, height: -4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
      }}
    >
      <View
        style={{
          paddingHorizontal: 30,
          padding: 15,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Image
          source={require('./../../assets/images/WithoutTopWithoutBack.png')}
          style={{ width: 160, height: 100 }}
        />
        <View style={{ display: 'flex', flexDirection: 'row', gap: 16 }}>
          <TouchableOpacity>
            <Link href={'/evenement/events'}>
              <Ionicons name="calendar-clear-outline" size={24} color="black" />
            </Link>
          </TouchableOpacity>

          <TouchableOpacity>
            <MaterialCommunityIcons
              name="tree-outline"
              size={28}
              color="black"
            />
          </TouchableOpacity>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={26} color="black" />
          </TouchableOpacity>
          <TouchableOpacity>
            <Link href={'/profile/user'}>
              <FontAwesome6 name="circle-user" size={24} color="black" />
            </Link>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
