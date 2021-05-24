import { gql, useMutation } from '@apollo/client';
import React from 'react';
import { Button, ScrollView, Text, TextInput, TouchableHighlight, View } from 'react-native';

const ADD_TEST = gql`
  mutation MyMutation($id: Int, $localtion: String) {
  insert_delivery_test(objects: {id: $id, localtion: $localtion}) {
    affected_rows
  }
}`;

export default function Signup({ navigation }) {
    const [id, onChangeUsername] = React.useState('');
    const [localtion, onChangeEmail] = React.useState('');
    const [addVariables, { data }] = useMutation(ADD_TEST);

    async function usersignUp() {
        const info = {id: id, localtion: localtion}
        console.log(info)
        try {
            addVariables({ variables: info });
            navigation.push('Signup')
        } catch (error) {
            console.log('error in signup', error);
            alert(error.message)
        }
    }
    return (
        <ScrollView>
            <View style={{ marginLeft: '20%', marginRight: '20%' }}>
                <Text style={{ marginTop: '10%', fontWeight: 'bold' }}>Id</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: '4%', }}
                    onChangeText={text => onChangeUsername(text)}
                    value={id}
                    placeholder="Id"
                />
                <Text style={{ marginTop: '10%', fontWeight: 'bold' }}>Location</Text>
                <TextInput
                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginTop: '4%', }}
                    onChangeText={text => onChangeEmail(text)}
                    value={localtion}
                    placeholder="Location"
                />
                <Button
                    title="Create Account" onPress={() => usersignUp()}
                />
                <TouchableHighlight underlayColor='none'
                    style={{
                        color: 'blue', marginTop: 40,
                        textAlign: 'center'
                    }}
                    onPress={() => navigation.push("Allvehicles")}>
                    <Text style={{
                        color: 'blue',
                        textAlign: 'center'
                    }}>Next</Text>
                </TouchableHighlight>
            </View>
        </ScrollView>
    );
}
