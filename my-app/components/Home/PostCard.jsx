import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { SimpleLineIcons } from '@expo/vector-icons'
import { Colors } from '../../constants/Colors'
import { Ionicons } from '@expo/vector-icons'

const PostCard = () => {
  return (
    <View>
      <View
        style={{
          width: '100%',
          height: 460,
          backgroundColor: '#b6d4b6',
          padding: 15,
          borderTopRightRadius: 50,
          borderTopLeftRadius: 50,
          borderBottomLeftRadius: 5,
          borderBottomRightRadius: 5,
          gap: 10,
          marginTop: 20,
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}
          >
            <Image
              source={require('./../../assets/images/profile.jpg')}
              style={{ width: 60, height: 60, borderRadius: 1000 }}
            />
            <View>
              <Text style={{ textAlign: 'center', fontFamily: 'Outfit-Bold' }}>
                Jamel
              </Text>
              <Text
                style={{
                  textAlign: 'center',
                  fontFamily: 'Outfit-Med',
                  fontSize: 10,
                }}
              >
                @Jamel
              </Text>
            </View>
          </View>
          <SimpleLineIcons
            style={{ marginRight: 10 }}
            name="options-vertical"
            size={24}
            color="#1a5319"
          />
        </View>
        <View>
          <Image
            source={require('./../../assets/images/benovloat.jpg')}
            style={{ width: '100%', height: 180, borderRadius: 15 }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              right: 10,
              top: 5,
              gap: 15,
              zIndex: 10,
              position: 'relative',
            }}
          >
            <Ionicons name="heart" size={24} color="white" />
            <Ionicons name="chatbubble-ellipses" size={24} color="white" />
            <Ionicons name="arrow-redo-sharp" size={24} color="white" />
            <Ionicons name="bookmark" size={24} color="white" />
          </View>
        </View>

        <Text style={{ fontFamily: 'Outfit' }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe laborum
          quas adipisci atque tempora obcaecati est. Repellat aliquam ratione,
          eligendi suscipit iste quas! Repellat aliquam rerum corrupti quasi
          doloribus culpa.
        </Text>
        <View style={{ display: 'flex', flexDirection: 'row', gap: 5 }}>
          <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.PRIMARY }}>
            #Health
          </Text>
          <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.PRIMARY }}>
            #Health
          </Text>
          <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.PRIMARY }}>
            #Health
          </Text>
          <Text style={{ fontFamily: 'Outfit-Bold', color: Colors.PRIMARY }}>
            #Health
          </Text>
        </View>
      </View>
    </View>
  )
}

export default PostCard

const styles = StyleSheet.create({})
