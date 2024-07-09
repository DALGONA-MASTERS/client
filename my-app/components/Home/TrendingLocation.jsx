import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import TrendingLocationCard from './TrendingLocationCard'

const TrendingLocation = () => {
  const LocationEvnt = [
    {
      id: 1,
      imgUrl: './../../assets/images/marche.jpg',
      title: 'lorem ipsum dolor sit',
      location: '147 Main St',
      date: '10 mai 2024',
      nbrParticipants: '87 Pariticipants',
    },
    {
      id: 2,
      imgUrl: './../../assets/images/marche.jpg',
      title: 'lorem ipsum dolor ',
      location: '147 Main St',
      date: '10 mai 2024',
      nbrParticipants: '87 Pariticipants',
    },
  ]
  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 18 }}>
        Evénements près de chez vous{' '}
      </Text>
      <FlatList
        data={LocationEvnt}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <TrendingLocationCard TrendAtt={item} key={index} />
        )}
      />
    </View>
  )
}

export default TrendingLocation

const styles = StyleSheet.create({})
