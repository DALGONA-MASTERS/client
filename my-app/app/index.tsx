import { Colors } from '@/constants/Colors'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native'
import { Image } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'

const LoginScreen = () => {
  const router = useRouter()
  const onPress = () => {
    try {
      router.push('/(auth)/sign-in')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <View>
      <Image source={require('./../assets/images/group-1.png')} />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: -40,
        }}
      >
        <Image
          source={require('./../assets/images/MainWithoutBack.png')}
          style={{ width: 300, height: 300 }}
        />
        <Text
          style={{
            textAlign: 'center',
            fontFamily: 'Outfit-Med',
            marginTop: -40,
            lineHeight: 20,
            width: '90%',
          }}
        >
          <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.PRIMARY }}>
            GREENHUB
          </Text>{' '}
          dolor sit amet consectetur. Eu eget felis turpis nisl risus quis. Arcu
          morbi maecenas egestas eget. Arcu sed eget vitae aliquet. Mauris diam
          et id sed neque.
        </Text>
        <Image
          source={require('./../assets/images/eco_consicous.png')}
          style={{ width: 450, height: 300 }}
        />
        <TouchableOpacity onPress={onPress} style={styles.btn}>
          <Text
            style={{
              textAlign: 'center',
              color: '#fff',
              fontFamily: 'Outfit',
            }}
          >
            Let's Get Started
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  subContainer1: {
    display: 'flex',
    alignItems: 'center',
    marginTop: 100,
  },
  subsubContainer: {},
  text2: {
    fontSize: 30,
    fontFamily: 'Outfit-Bold',
    textAlign: 'center',
    marginTop: 20,
  },
  text1: {
    color: '#ddd',
  },
  subContainer2: {
    backgroundColor: '#fff',
    padding: 20,
    marginTop: 0,
  },
  image: {
    width: 220,
    height: 450,
    borderRadius: 20,
    borderWidth: 4,
    borderColor: '#000',
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    width: '90%',
    padding: 20,
    borderRadius: 99,
    marginTop: 20,
  },
})
