import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import TrendingEventCard from './TrendingEventCard'

const TrendingEvent = () => {
  const TrendEvnt = [
    {
      id: 1,
      imgUrl: './../../assets/images/marche.jpg',
      title: 'lorem ipsum dolor sit',
      address: '147 Main St',
      data: '10 mai 2024',
    },
    {
      id: 2,
      imgUrl: './../../assets/images/marche.jpg',
      title: 'lorem ipsum dolor ',
      address: '147 Main St',
      data: '10 mai 2024',
    },
  ]
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <FlatList
        data={TrendEvnt}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TrendingEventCard TrendEve={item} key={item.id} />
        )}
      />
    </View>
  )
}

export default TrendingEvent

const styles = StyleSheet.create({})
