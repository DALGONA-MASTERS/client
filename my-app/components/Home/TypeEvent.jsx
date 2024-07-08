import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { Colors } from './../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const TypeEvent = () => {
  const TypeEv = [
    { id: 1, titre: 'Plentation darbre', color: '#F18888' },
    { id: 2, titre: 'Recyclage', color: '#8B8BFA' },
    { id: 3, titre: 'plentation d’arbre', color: '#FFFF9B' },
  ]

  return (
    <View style={{ padding: 20 }}>
      <Text style={styles.titre_1}>Trouver </Text>
      <Text style={styles.titre_2}>Événement tendance</Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: 10,
          alignItems: 'center',
          backgroundColor: '#fff',
          padding: 10,
          marginVertical: 10,
          marginTop: 15,
          borderRadius: 8,
        }}
      >
        <Ionicons name="search-sharp" size={24} color={Colors.PRIMARY} />
        <TextInput
          placeholder="recharcher evenenment..."
          style={{ fontFamily: 'Outfit', fontSize: 15, width: '100%' }}
        />
      </View>
      <View>
        <FlatList
          data={TypeEv}
          style={{ paddingTop: 15 }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              business={item}
              key={index}
              style={{
                backgroundColor: item.color,
                padding: 5,
                borderRadius: 8,
                marginRight: 20,
              }}
            >
              <Text style={{ fontFamily: 'Outfit-Bold' }}>{item.titre}</Text>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  )
}

export default TypeEvent

const styles = StyleSheet.create({
  titre_1: {
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
  },
  titre_2: {
    fontFamily: 'Outfit-Bold',
    fontSize: 25,
    color: Colors.PRIMARY,
  },
})
