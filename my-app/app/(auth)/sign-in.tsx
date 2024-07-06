import { useSignIn } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import {
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native'
import React from 'react'
import { Colors } from '@/constants/Colors'

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')

  const onSignInPress = React.useCallback(async () => {
    if (!isLoaded) {
      return
    }

    try {
      const signInAttempt = await signIn.create({
        identifier: emailAddress,
        password,
      })

      if (signInAttempt.status === 'complete') {
        await setActive({ session: signInAttempt.createdSessionId })
        router.replace('/home')
      } else {
        // See https://clerk.com/docs/custom-flows/error-handling
        // for more info on error handling
        console.error(JSON.stringify(signInAttempt, null, 2))
      }
    } catch (err: any) {
      console.error(JSON.stringify(err, null, 2))
    }
  }, [isLoaded, emailAddress, password])

  return (
    <View style={{ backgroundColor: '#f1f1f1' }}>
      <Image source={require('./../../assets/images/group-1.png')} />
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 15,
        }}
      >
        <Text
          style={{
            fontFamily: 'Outfit-Bold',
            fontSize: 22,
            textAlign: 'center',
          }}
        >
          Se connecter
        </Text>
        <Image
          source={require('./../../assets/images/MainWithoutBack.png')}
          style={{ width: 200, height: 200 }}
        />
      </View>

      <View
        style={{
          marginTop: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <TextInput
          style={styles.login}
          autoCapitalize="none"
          value={emailAddress}
          placeholder="Email..."
          onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
        />
        <TextInput
          style={styles.login}
          value={password}
          placeholder="Password..."
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />
        <TouchableOpacity onPress={onSignInPress} style={styles.btn}>
          <Text
            style={{
              color: '#fff',
              fontFamily: 'Outfit-Bold',
              fontSize: 15,
              textAlign: 'center',
            }}
          >
            Connexion
          </Text>
        </TouchableOpacity>
      </View>

      <View>
        <Text>Don't have an account?</Text>
        <Link href="/sign-up">
          <Text>Sign up</Text>
        </Link>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: '#fff',
    width: '80%',
    padding: 12,
    borderRadius: 8,
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    width: '85%',
    padding: 20,
    borderRadius: 99,
  },
})
