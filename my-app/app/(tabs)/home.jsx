import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import Header from '../../components/Home/Header'

const Home = () => {
  const router = useRouter()

  return (
    <View style={{}}>
      <Header />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
})

export default Home
