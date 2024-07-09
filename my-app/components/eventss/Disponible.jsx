import { View, Text, TouchableOpacity, FlatList } from 'react-native'
import React from 'react'
import DispoCard from './DispoCard'

const Disponible = () => {
  const disopoVar = [
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
    <View style={{ paddingHorizontal: 20 }}>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 20 }}>
          Évènements Similar
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
      <FlatList
        data={disopoVar}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <DispoCard DispoProps={item} key={index} />
        )}
      />
    </View>
  )
}

export default Disponible
