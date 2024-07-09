import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import TrendingLocationCard from '../Home/TrendingLocationCard'

const Avenire = () => {
  const eventsVenire = [
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
    <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 20 }}>
          Évènements à venir
        </Text>
        <TouchableOpacity>
          <Text
            style={{
              fontFamily: 'Outfit-Bold',
              fontSize: 15,
              color: '#1a5319',
            }}
          >
            Tout voir
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <FlatList
          data={eventsVenire}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TrendingLocationCard TrendAtt={item} key={index} />
          )}
        />
      </View>
    </View>
  )
}

export default Avenire

const styles = StyleSheet.create({})
