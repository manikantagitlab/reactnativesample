import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client'
import AsyncStorage from '@react-native-community/async-storage'
import { persistCache } from 'apollo3-cache-persist'
import { AppLoading } from 'expo'

import HomeScreen from './src/HomeScreen'
import Signup from './src/Signup'
import { screenOptions } from './src/styles'

const Stack = createStackNavigator()

const cache = new InMemoryCache()

const client = new ApolloClient({
  uri: 'https://security-hasura.tbps.in/v1/graphql',
  headers: {
    'x-hasura-admin-secret': 'TsssInfotech123',
    'X-Hasura-Role': 'admin',
    'content-type': 'application/json'
  },
  cache,
  defaultOptions: { watchQuery: { fetchPolicy: 'cache-and-network' } },
})

export default function App() {
  const [loadingCache, setLoadingCache] = useState(true)

  useEffect(() => {
    persistCache({
      cache,
      storage: AsyncStorage,
    }).then(() => setLoadingCache(false))
  }, [])

  if (loadingCache) {
    return <AppLoading />
  }

  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home" screenOptions={screenOptions}>
          <Stack.Screen
            name="Home"
            component={HomeScreen}
            options={{ title: 'The GraphQL Test' }}
          />
          <Stack.Screen
            name="Signup"
            component={Signup}
            options={{ title: 'Signup' }}
          />
        </Stack.Navigator>
        <StatusBar style="light" />
      </NavigationContainer>
    </ApolloProvider>
  )
}
