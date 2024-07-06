import React from 'react'
import { View, Text, Button, StyleSheet } from 'react-native'
import { useRouter } from 'expo-router'

const Detail = () => {
  const router = useRouter()

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Detail Screen</Text>
      <Button title="Go Back" onPress={() => router.back()} />
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

export default Detail
