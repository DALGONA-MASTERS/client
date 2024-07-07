import * as React from 'react'
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { useRouter } from 'expo-router'
import { Colors } from '@/constants/Colors'

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')

  const onSignUpPress = async () => {
    if (!isLoaded) {
      return
    }

    try {
      await signUp.create({
        emailAddress,
        password,
      })

      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' })

      setPendingVerification(true)
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  const onPressVerify = async () => {
    if (!isLoaded) {
      return
    }

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      })

      if (completeSignUp.status === 'complete') {
        await setActive({ session: completeSignUp.createdSessionId })
        router.replace('/')
      } else {
        console.error(JSON.stringify(completeSignUp, null, 2))
      }
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2))
    }
  }

  return (
    <View
      style={{
        backgroundColor: '#f1f1f1',
        height: '100%',
      }}
    >
      {!pendingVerification && (
        <>
          <Image source={require('./../../assets/images/group-1.png')} />
          <Text
            style={{
              fontFamily: 'Outfit-Bold',
              fontSize: 22,
              textAlign: 'center',
              marginTop: 40,
            }}
          >
            Inscription
          </Text>
          <View
            style={{
              marginTop: 60,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 20,
            }}
          >
            <View>
              <Text style={{ fontFamily: 'Outfit', marginBottom: 5 }}>
                Email
              </Text>
              <TextInput
                style={styles.login}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
              />
            </View>

            <View style={{}}>
              <Text style={{ fontFamily: 'Outfit', marginBottom: 5 }}>
                Confirmation d’email
              </Text>
              <TextInput
                style={styles.login}
                autoCapitalize="none"
                value={emailAddress}
                placeholder="Email..."
                onChangeText={(email) => setEmailAddress(email)}
              />
            </View>

            <View>
              <Text style={{ fontFamily: 'Outfit', marginBottom: 5 }}>
                Mot de passe
              </Text>
              <TextInput
                style={styles.login}
                value={password}
                placeholder="Password..."
                secureTextEntry={true}
                onChangeText={(password) => setPassword(password)}
              />
            </View>
            <TouchableOpacity style={styles.btn} onPress={onSignUpPress}>
              <Text
                style={{
                  color: '#fff',
                  fontFamily: 'Outfit-Bold',
                  fontSize: 15,
                  textAlign: 'center',
                }}
              >
                S’inscrire
              </Text>
            </TouchableOpacity>
          </View>
        </>
      )}
      {pendingVerification && (
        <>
          <View>
            <TextInput
              value={code}
              placeholder="Code..."
              onChangeText={(code) => setCode(code)}
            />
            <Button title="Verify Email" onPress={onPressVerify} />
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  login: {
    backgroundColor: '#fff',
    width: 350,
    padding: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#c9c9c9',
  },
  btn: {
    backgroundColor: Colors.PRIMARY,
    width: '85%',
    padding: 20,
    borderRadius: 99,
    marginTop: 25,
  },
})
