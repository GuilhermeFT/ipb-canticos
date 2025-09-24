import { Stack } from 'expo-router'
import * as SplashScreen from 'expo-splash-screen'
import { StatusBar } from 'expo-status-bar'
import Colors from '../constants/Colors'

import { useEffect, useState } from 'react'

SplashScreen.preventAutoHideAsync()
export default function RootLayout() {
  const [loaded, setLoaded] = useState(true)

  useEffect(() => {
    if (loaded) {
      SplashScreen.hide()
    }
  }, [loaded])

  if (!loaded) {
    return null
  }

  return (
    <>
      <StatusBar style="light" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTintColor: Colors.white,
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{
            title: 'Cânticos Espirituais IPB',
          }}
        />
        <Stack.Screen
          name="song/[id]"
          options={{
            title: 'Cântico',
          }}
        />
      </Stack>
    </>
  )
}
