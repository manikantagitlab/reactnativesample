import React, { Fragment } from 'react'
import { Text, FlatList, Pressable, Button } from 'react-native'
import { gql, useQuery } from '@apollo/client'
import { AppLoading } from 'expo'

import styles from './styles'

const GET_TEST = gql`
query MyQuery {
  delivery_test {
    id
    localtion
  }
 }`;

const ChapterItem = ({ chapter, onPress }) => {
  const { id, localtion } = chapter
  let header, subheader

  if (id) {
    header = `Chapter ${id}`
    subheader = localtion
  } else {
    header = localtion
  }

  return (
    <Pressable style={styles.item} onPress={onPress}>
      <Text style={styles.header}>{header}</Text>
      {subheader && <Text style={styles.subheader}>{subheader}</Text>}
    </Pressable>
  )
}

export default ({ navigation }) => {
  const { data, loading } = useQuery(GET_TEST)

  if (loading) {
    return <AppLoading />
  }

  return (
    <Fragment>
      <FlatList
        data={data.delivery_test}
        renderItem={({ item }) => (
          <ChapterItem
            chapter={item}
            onPress={() => navigation.navigate('Signup', { chapter: item })}
          />
        )}
        keyExtractor={(chapter) => chapter.id.toString()}
      />

      <Button
        title="SingUp" onPress={() => navigation.navigate('Signup')}
      />
    </Fragment>
  )
}
