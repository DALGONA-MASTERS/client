import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import ProfileCard from './ProfileCard'
import PostCard from './PostCard'
import { useGetPostsMutation } from './../../features/api/apiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { handleFetchedData } from '../../utilities/apiUtils'
import { selectPosts, setPosts } from '../../features/posts/postsSlice'

const Posts = () => {
  const posts = useSelector(selectPosts)
  const dispatch = useDispatch()
  const [getPosts, getPostsResult] = useGetPostsMutation()
   useEffect(() => {
     const fetchData = async () => {
       try {
         const result = await getPosts()
         handleFetchedData(result, dispatch, setPosts)
       } catch (error) {
         console.error('Error fetching posts:', error)
       }
     }
     fetchData()
   }, [getPosts, dispatch])

   useEffect(() => {
     // Log the posts state whenever it changes
     console.log(posts)
   }, [posts])
  // React.useEffect(()=>(
  //   getPosts()
  // ),[])
  // useEffect(()=>{
  //   handleFetchedData(getPostsResult,dispatch,setPosts)
  // })

  console.log(posts)

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
