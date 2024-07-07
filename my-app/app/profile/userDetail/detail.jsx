import { StyleSheet, Text, View, TextInput, Image, Button } from 'react-native'
import React, { useState } from 'react'
import { useRouter } from 'expo-router'
import { useUser } from '@clerk/clerk-expo'

const detail = () => {
  const { user } = useUser()
  console.log(user)
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [email, setEmail] = useState(user?.email || '')
  const [phone, setPhone] = useState(user?.phone || '')
  const [pays, setPays] = useState(user?.pays || '')
  const [sex, setSex] = useState(user?.sex || '')
  const [address, setAddress] = useState(user?.address || '')
  const [isLoading, setIsLoading] = useState(false)

  const handleFirstNameChange = async () => {
    setIsLoading(true)
    try {
      await user.update({
        firstName: firstName,
      })
      alert('First name updated successfully')
    } catch (error) {
      console.error('Error updating first name:', error)
      alert(`Failed to update first name: ${error.message}`)
    } finally {
      setIsLoading(false)
    }
  }
  console.log(firstName)
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          paddingHorizontal: 20,
          paddingTop: 70,
          display: 'flex',
          gap: 40,
        }}
      >
        <Text style={{ fontFamily: 'Outfit-Bold', fontSize: 25 }}>Profile</Text>
        <Image
          source={{ uri: user?.imageUrl }}
          style={{ width: 100, height: 100, borderRadius: 99 }}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Prénom</Text>
        <TextInput
          style={styles.input}
          value={firstName}
          onChangeText={setFirstName}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Nom</Text>
        <TextInput
          style={styles.input}
          value={lastName}
          onChangeText={setLastName}
        />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}>Email</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />
      </View>
      <View style={styles.container}>
        <Text style={styles.label}> Numéro de téléphone</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} />
      </View>
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <View style={styles.container}>
          <Text style={styles.label}>Pays</Text>
          <TextInput style={styles.input} value={pays} onChangeText={setPays} />
        </View>
        <View style={styles.container}>
          <Text style={styles.label}>Sexe</Text>
          <TextInput style={styles.input} value={sex} onChangeText={setSex} />
        </View>
      </View>

      <View style={styles.container}>
        <Text style={styles.label}>Adresse</Text>
        <TextInput
          style={styles.input}
          value={address}
          onChangeText={setAddress}
        />
      </View>
      <Button
        title={isLoading ? 'Updating...' : 'Update First Name'}
        onPress={handleFirstNameChange}
        disabled={isLoading}
      />
    </View>
  )
}

export default detail

const styles = StyleSheet.create({
  container: {
    marginVertical: 5,
  },
  label: {
    color: 'gray',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#f8f8f8',
    fontSize: 16,
    fontSize: 20,
  },
})
