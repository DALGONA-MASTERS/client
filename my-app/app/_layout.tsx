import 'react-native-url-polyfill/auto'
import { Slot, Stack } from 'expo-router'
import { ClerkProvider, SignedOut, SignedIn } from '@clerk/clerk-expo'
import * as Font from 'expo-font'
import React, { useEffect, useState } from 'react'
import AppLoading from 'expo-app-loading'

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
    <ClerkProvider publishableKey={publishableKey}>
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
