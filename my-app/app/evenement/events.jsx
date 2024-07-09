import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import React from 'react'
import { Ionicons } from '@expo/vector-icons'
import { useRouter } from 'expo-router'
import Avenire from '../../components/eventss/Avenire'
import Similare from '../../components/eventss/Similare'
import Disponible from '../../components/eventss/Disponible'

const events = () => {
  const router = useRouter()

  const handleBackPress = () => {
    console.log('Back button pressed')
    router.back()
  }

  return (
    <ScrollView>
      <View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: 40,
          }}
        >
          <TouchableOpacity onPress={handleBackPress}>
            <Ionicons
              name="arrow-back-circle-sharp"
              style={{ position: 'relative', right: 80 }}
              size={50}
              color="gray"
            />
          </TouchableOpacity>

          <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 20 }}>
            Évènements
          </Text>
        </View>
        <Avenire />
        <Similare />
        <Disponible />
      </View>
    </ScrollView>
  )
}

export default events

const styles = StyleSheet.create({})
