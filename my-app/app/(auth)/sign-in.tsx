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
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'

export default function SignInPage() {
  const { signIn, setActive, isLoaded } = useSignIn()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)

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
    <View style={{ backgroundColor: '#f1f1f1', height: '100%' }}>
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {/* <Image
          source={require('./../../assets/images/MainWithoutBack.png')}
          style={{ width: 200, height: 200, marginTop: -60 }}
        /> */}
        <Text
          style={{
            fontFamily: 'Outfit-Bold',
            fontSize: 22,
            textAlign: 'center',
            marginTop: '35%',
          }}
        >
          Se connecter
        </Text>
      </View>

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
            Email ou numéro de téléphone
          </Text>
          <TextInput
            style={styles.login}
            autoCapitalize="none"
            value={emailAddress}
            placeholder="Email..."
            onChangeText={(emailAddress) => setEmailAddress(emailAddress)}
          ></TextInput>
        </View>
        <View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}
          >
            <Text style={{ fontFamily: 'Outfit', marginBottom: 5 }}>
              Mot de passe
            </Text>
            <TouchableOpacity
              onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              style={{
                position: 'relative',
                top: 43,
                right: 20,
                zIndex: 10,
              }}
            >
              {isPasswordVisible ? (
                <Ionicons name="eye-off" size={24} color="black" />
              ) : (
                <Ionicons name="eye" size={24} color="black" />
              )}
            </TouchableOpacity>
          </View>

          <TextInput
            style={styles.login}
            value={password}
            placeholder="Password..."
            secureTextEntry={isPasswordVisible}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
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
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 10,
          marginTop: 10,
        }}
      >
        <Text>Vous n’avez pas de compte ?</Text>
        <Link href="/sign-up">
          <Text style={{ color: Colors.PRIMARY, fontFamily: 'Outfit-Bold' }}>
            Inscription
          </Text>
        </Link>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '45%',
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
  lign: { width: 140, height: 1, borderWidth: 1, borderColor: '#c9c9c9' },
  social: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderRadius: 99,
    borderColor: '#dadada',
    padding: 16,
  },
})
