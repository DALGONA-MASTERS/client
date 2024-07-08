import { useRouter } from 'expo-router'
import React from 'react'
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native'
import Header from '../../components/Home/Header'
import TypeEvent from '../../components/Home/TypeEvent'
import TrendingEvent from '../../components/Home/TrendingEvent'
import TrendingLocation from '../../components/Home/TrendingLocation'
import Posts from '../../components/Home/Posts'

const Home = () => {
  const router = useRouter()

  return (
    <ScrollView style={{}}>
      <Header />
      <TypeEvent />
      <TrendingEvent />
      <TrendingLocation />
      <Posts />
    </ScrollView>
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
