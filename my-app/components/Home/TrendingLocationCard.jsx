import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { MaterialIcons } from '@expo/vector-icons'

const TrendingLocationCard = ({ TrendAtt }) => {
  return (
    <TouchableOpacity style={{ paddingVertical: 20, marginRight: 30 }}>
      <View
        style={{
          backgroundColor: '#fff',
          height: 320,
          width: 250,
          borderRadius: 10,
          padding: 10,
        }}
      >
        <Image
          source={require('./../../assets/images/plentation.jpg')}
          style={{ width: 230, height: 150, borderRadius: 10 }}
        />
        <View style={{ padding: 10 }}>
          <Text
            style={{
              fontFamily: 'Outfit-Bold',
              fontSize: 18,
              color: Colors.PRIMARY,
            }}
          >
            {TrendAtt.title}
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 2,
            }}
          >
            <View style={{ position: 'relative', right: 4 }}>
              <Entypo name="location-pin" size={24} color="#d63c3c" />
            </View>

            <Text
              style={{
                fontFamily: 'Outfit-Med',
                fontSize: 12,
                color: '#1a5319',
              }}
            >
              {TrendAtt.location}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 10,
            }}
          >
            <FontAwesome6 name="calendar-days" size={18} color="#d63c3c" />
            <Text
              style={{
                fontFamily: 'Outfit-Med',
                fontSize: 12,
                color: '#1a5319',
              }}
            >
              {TrendAtt.date}
            </Text>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-start',
              gap: 6,
              marginTop: 2,
            }}
          >
            <Ionicons name="people-sharp" size={20} color="#d63c3c" />
            <Text
              style={{
                fontFamily: 'Outfit-Med',
                fontSize: 12,
                color: '#1a5319',
              }}
            >
              {TrendAtt.nbrParticipants}
            </Text>
          </View>
          <View></View>
          <View style={{ display: 'flex' }}>
            <TouchableOpacity
              style={{
                backgroundColor: '#de6868',
                padding: 5,
                borderRadius: 8,
                width: '70%',
                position: 'relative',
                left: 70,
                top: 15,
              }}
            >
              <Text
                style={{
                  fontFamily: 'Outfit-Bold',
                  textAlign: 'center',
                  fontSize: 10,
                }}
              >
                Plentation d'arbre
              </Text>
            </TouchableOpacity>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                position: 'relative',
                bottom: 10,
              }}
            >
              <FontAwesome6 name="share-square" size={15} color="black" />
              <MaterialIcons
                name="arrow-circle-right"
                size={20}
                color="black"
              />
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default TrendingLocationCard

const styles = StyleSheet.create({})
