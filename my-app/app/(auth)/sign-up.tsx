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
import { Link, useRouter } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
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
              marginTop: 30,
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              gap: 10,
              marginTop: 10,
            }}
          >
            <Text>Vous possédez déjà un compte?</Text>
            <Link href="/sign-in">
              <Text
                style={{ color: Colors.PRIMARY, fontFamily: 'Outfit-Bold' }}
              >
                Connexion
              </Text>
            </Link>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 70,
            }}
          >
            <View style={styles.lign}></View>
            <Text style={{ marginHorizontal: 10, fontFamily: 'Outfit' }}>
              Ou continuer avec
            </Text>
            <View style={styles.lign}></View>
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 40,
              marginTop: 20,
            }}
          >
            <View style={styles.social}>
              <FontAwesome5 name="facebook" size={30} color="blue" />
            </View>
            <View style={styles.social}>
              <AntDesign name="google" size={30} color="red" />
            </View>
            <View style={styles.social}>
              <AntDesign name="apple1" size={30} color="black" />
            </View>
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
  social: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 99,
    borderColor: '#dadada',
    padding: 16,
  },
  lign: {
    width: 140,
    marginVertical: 0,
    height: 1,
    borderWidth: 1,
    borderColor: '#c9c9c9',
  },
})
