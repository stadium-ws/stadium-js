import { Stadium } from '@stadium/stadium-js'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'

function App () {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [stadium, setStadium] = useState(new Stadium({
    appId: 'XXX'
  }))

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style='auto' />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default App
