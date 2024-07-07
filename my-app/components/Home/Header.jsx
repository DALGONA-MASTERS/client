import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'

const Header = () => {
  return (
    <View
      style={{
        paddingTop: 0,
        height: 100,
        backgroundColor: '#fff',
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
            <Ionicons name="calendar-clear-outline" size={24} color="black" />
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
            <FontAwesome6 name="circle-user" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({})
