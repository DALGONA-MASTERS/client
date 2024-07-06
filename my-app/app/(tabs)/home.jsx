import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'

const Home = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Home Screen</Text>
      <Button title="Go to Detail" onPress={() => router.push('/sign-in')} />
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
