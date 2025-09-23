import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import Colors from '../constants/Colors'

export default function RootLayout() {
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
