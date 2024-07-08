import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ProfileCard from './ProfileCard'
import PostCard from './PostCard'

const Posts = () => {
  const user = [
    {
      id: 1,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 2,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 3,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 4,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 5,
      name: 'Jamel',
      imageUrl: '',
    },
    {
      id: 6,
      name: 'Jamel',
      imageUrl: '',
    },
  ]
  return (
    <View style={{ paddingHorizontal: 20 }}>
      <FlatList
        data={user}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <ProfileCard detail={item} key={index} />
        )}
      />
      <PostCard />
      <PostCard />
    </View>
  )
}

export default Posts

const styles = StyleSheet.create({})
