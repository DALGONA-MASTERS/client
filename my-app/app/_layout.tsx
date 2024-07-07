import 'react-native-url-polyfill/auto'
import { Slot, Stack } from 'expo-router'
import { ClerkProvider, SignedOut, SignedIn } from '@clerk/clerk-expo'
import * as Font from 'expo-font'
import React, { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'
import * as SecureStore from 'expo-secure-store'

const tokenCache = {
  async getToken(key: string) {
    try {
      const item = await SecureStore.getItemAsync(key)
      if (item) {
        console.log(`${key} was used 🔐 \n`)
      } else {
        console.log('No values stored under key: ' + key)
      }
      return item
    } catch (error) {
      console.error('SecureStore get item error: ', error)
      await SecureStore.deleteItemAsync(key)
      return null
    }
  },
  async saveToken(key: string, value: string) {
    try {
      return SecureStore.setItemAsync(key, value)
    } catch (err) {
      return
    }
  },
}

const publishableKey = process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY!

if (!publishableKey) {
  throw new Error(
    'Missing Publishable Key. Please set EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY in your .env'
  )
}

const loadFonts = async () => {
  await Font.loadAsync({
    Outfit: require('../assets/fonts/Outfit-Regular.ttf'),
    'Outfit-Bold': require('../assets/fonts/Outfit-Bold.ttf'),
    'Outfit-Med': require('../assets/fonts/Outfit-Medium.ttf'),
  })
}

export default function RootLayout() {
  const [fontsLoaded, setFontsLoaded] = useState(false)

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true))
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />
  }
  return (
    <ClerkProvider tokenCache={tokenCache} publishableKey={publishableKey}>
      <SignedIn>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </SignedIn>
      <SignedOut>
        <Slot />
      </SignedOut>
    </ClerkProvider>
  )
}
