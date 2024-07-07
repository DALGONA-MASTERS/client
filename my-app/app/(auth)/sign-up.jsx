import * as React from 'react'
import {
  TextInput,
  Button,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native'
import { useSignUp } from '@clerk/clerk-expo'
import { Link, useRouter } from 'expo-router'
import { FontAwesome5 } from '@expo/vector-icons'
import { AntDesign } from '@expo/vector-icons'
import { Colors } from '@/constants/Colors'
import { Ionicons } from '@expo/vector-icons'
import { useRef, useState } from 'react'
import CountDownTimer from 'react-native-countdown-timer-hooks'
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field'

const { Value, Text: AnimatedText } = Animated

const CELL_COUNT = 6

const CELL_SIZE = 45
const CELL_BORDER_RADIUS = 8
const DEFAULT_CELL_BG_COLOR = '#fff'
const NOT_EMPTY_CELL_BG_COLOR = '#3557b7'
const ACTIVE_CELL_BG_COLOR = '#f7fafe'

const animationsColor = [...new Array(CELL_COUNT)].map(() => new Value(0))
const animationsScale = [...new Array(CELL_COUNT)].map(() => new Value(1))
const animateCell = ({ hasValue, index, isFocused }) => {
  Animated.parallel([
    Animated.timing(animationsColor[index], {
      useNativeDriver: false,
      toValue: isFocused ? 1 : 0,
      duration: 250,
    }),
    Animated.spring(animationsScale[index], {
      useNativeDriver: false,
      toValue: hasValue ? 0 : 1,
      duration: hasValue ? 300 : 250,
    }),
  ]).start()
}

export default function SignUpScreen() {
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()

  const [emailAddress, setEmailAddress] = React.useState('')
  const [password, setPassword] = React.useState('')
  const [pendingVerification, setPendingVerification] = React.useState(false)
  const [code, setCode] = React.useState('')
  const [isPasswordVisible, setIsPasswordVisible] = React.useState(false)
  const [value, setValue] = React.useState('')
  const ref = useBlurOnFulfill({ value, cellCount: CELL_COUNT })
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  const refTimer = useRef()

  // For keeping a track of the timer
  const [timerEnd, setTimerEnd] = useState(false)

  const timerOnProgressFunc = (remainingTimeInSecs) => {
    console.log('On Progress tracker :', remainingTimeInSecs)
  }

  const timerCallbackFunc = (timerFlag) => {
    // Setting timer flag to false once complete
    setTimerEnd(timerFlag)
    console.warn('Alert the user when timer runs out...')
  }

  const renderCell = ({ index, symbol, isFocused }) => {
    const hasValue = Boolean(symbol)
    const animatedCellStyle = {
      backgroundColor: hasValue
        ? animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [NOT_EMPTY_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          })
        : animationsColor[index].interpolate({
            inputRange: [0, 1],
            outputRange: [DEFAULT_CELL_BG_COLOR, ACTIVE_CELL_BG_COLOR],
          }),
      borderRadius: animationsScale[index].interpolate({
        inputRange: [0, 1],
        outputRange: [CELL_SIZE, CELL_BORDER_RADIUS],
      }),
      transform: [
        {
          scale: animationsScale[index].interpolate({
            inputRange: [0, 1],
            outputRange: [0.2, 1],
          }),
        },
      ],
    }

    // Run animation on next event loop tik
    // Because we need first return new style prop and then animate this value
    setTimeout(() => {
      animateCell({ hasValue, index, isFocused })
    }, 0)

    return (
      <AnimatedText
        key={index}
        style={[styles.cell, animatedCellStyle]}
        onLayout={getCellOnLayoutHandler(index)}
      >
        {symbol || (isFocused ? <Cursor /> : null)}
      </AnimatedText>
    )
  }

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
    } catch (err) {
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
    } catch (err) {
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
          <Text
            style={{
              fontFamily: 'Outfit-Bold',
              fontSize: 22,
              textAlign: 'center',
              marginTop: '35%',
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
              marginTop: '28%',
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
          <View style={styles.root}>
            <Text style={styles.title}>
              Merci pour votre inscription ! Une dernière étape,
            </Text>
            <Text style={styles.subTitle}>
              Entrez le code à 6 chiffres que vous avez reçu sur votre boite
              mail.
            </Text>

            <CodeField
              ref={ref}
              {...props}
              value={code}
              onChangeText={(code) => setCode(code)}
              cellCount={CELL_COUNT}
              rootStyle={styles.codeFiledRoot}
              keyboardType="number-pad"
              textContentType="oneTimeCode"
              renderCell={renderCell}
            />
            <Image
              source={require('./../../assets/images/secureimg.png')}
              style={{ width: 400, height: 300 }}
            />
            <View style={{ marginTop: '55%' }}>
              <View style={styles.container}>
                <Text>Renvoyer le code dans </Text>
                <View
                  style={{
                    display: timerEnd ? 'none' : 'flex',
                    flexDirection: 'row',
                  }}
                >
                  <CountDownTimer
                    ref={refTimer}
                    timestamp={180}
                    timerOnProgress={timerOnProgressFunc}
                    timerCallback={timerCallbackFunc}
                    containerStyle={styles.timerContainerStyle}
                    textStyle={styles.timerTextStyle}
                  />
                  <Text> Sec</Text>
                </View>
                <TouchableOpacity
                  style={[
                    {
                      display: timerEnd ? 'flex' : 'none',
                    },
                    styles.touchableOpacityStyle,
                  ]}
                  onPress={() => {
                    setTimerEnd(false)
                    refTimer.current.resetTimer()
                  }}
                >
                  <Text style={styles.touchableOpacityTextStyle}>Resend</Text>
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                onPress={onPressVerify}
                style={styles.nextButtonText}
              >
                <Text
                  style={{
                    color: '#fff',
                    fontFamily: 'Outfit-Bold',
                    textAlign: 'center',
                  }}
                >
                  Continuer
                </Text>
              </TouchableOpacity>
            </View>
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
  root: {
    minHeight: 800,
    padding: 20,
  },
  codeFiledRoot: {
    height: CELL_SIZE,
    marginTop: 30,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  cell: {
    marginHorizontal: 8,
    height: CELL_SIZE,
    width: CELL_SIZE,
    lineHeight: CELL_SIZE - 5,
    fontSize: 30,
    textAlign: 'center',
    borderRadius: CELL_BORDER_RADIUS,
    color: '#3759b8',
    backgroundColor: '#fff',
    elevation: 3,
  },
  title: {
    paddingTop: 50,
    color: '#000',
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'left',
  },
  icon: {
    width: 217 / 2.4,
    height: 158 / 2.4,
    marginLeft: 'auto',
    marginRight: 'auto',
  },
  subTitle: {
    marginTop: 20,
    color: '#000',
    textAlign: 'left',
  },
  nextButton: {
    marginTop: '50%',
    borderRadius: 60,
    height: 60,
    backgroundColor: '#3557b7',
    justifyContent: 'center',
    minWidth: 300,
    marginBottom: 100,
  },
  nextButtonText: {
    textAlign: 'center',
    fontSize: 20,
    color: '#fff',
    fontFamily: 'Outfit-Bold',

    backgroundColor: Colors.PRIMARY,
    width: '100%',
    padding: 20,
    borderRadius: 99,
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    bottom: 10,
  },
  timerContainerStyle: {
    color: '#1a5319',
  },
  timerTextStyle: {
    fontSize: 15,
    color: '#000',
    fontWeight: '500',
    letterSpacing: 0.25,
  },
  touchableOpacityStyle: {},
  touchableOpacityTextStyle: {
    color: '#1a5319',
    fontWeight: 'bold',
  },
})
