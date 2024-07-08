import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from 'react-native'
import React from 'react'
import { BlurView } from 'expo-blur'
import { Entypo } from '@expo/vector-icons'
import { FontAwesome6 } from '@expo/vector-icons'

const TrendingEventCard = ({ TrendEve }) => {
  console.log(TrendEve)
  return (
    <TouchableOpacity>
      <ImageBackground
        source={require('./../../assets/images/marche.jpg')}
        style={styles.card}
      >
        <BlurView intensity={150} style={styles.blurContainer}>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={styles.title}>{TrendEve.title}</Text>
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
                Title
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
                Title
              </Text>
            </View>
          </View>
        </BlurView>
      </ImageBackground>
    </TouchableOpacity>
  )
}

export default TrendingEventCard

const styles = StyleSheet.create({
  card: {
    width: 300,
    height: 180,
    borderRadius: 10,
    overflow: 'hidden',
    marginRight: 20,
  },
  blurContainer: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'flex-start',
    height: 80,
    padding: 15,
    margin: 15,
    marginTop: 85,
  },
  title: {
    color: '#1a5319',
    fontSize: 15,
    fontFamily: 'Outfit-Bold',
  },
})
