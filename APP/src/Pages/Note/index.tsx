import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
  getData,
  handleDeleteItem,
  handleEdit,
  handleFind,
  storeData,
} from '../../services/data';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, TextInput, TextInputContent } from './styles';

const App = ({ navigation, route }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const { id } = route.params;

  useEffect(() => {
    async function load() {
      const { title, anotacao } = await handleFind(id);

      setTitle(title);
      setContent(anotacao);
    }

    load();
  }, []);

  //   async function handleEdit() {
  //     const itensGet: any = await getData({ tipo: 'itens' });
  //     const index = itensGet.findIndex((f) => f.id === id);
  //     if (index >= 0) {
  //       itensGet[index].title = title;
  //       itensGet[index].anotacao = content;
  //     }

  //     await storeData({ tipo: 'itens', value: JSON.stringify(itensGet) });
  //   }

  async function handleDelete() {
    await handleDeleteItem(id);
    navigation.goBack();
  }

  useEffect(() => {
    navigation.setOptions({
      title: title,
      headerStyle: {
        backgroundColor: '#615e5e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
      headerRight: () => (
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <TouchableOpacity
            style={{ marginRight: 20 }}
            onPress={() =>
              Alert.alert('Excluir Nota', 'Irá Excluir a Anotação Toda!', [
                { text: 'NÃO', onPress: () => {} },
                { text: 'SIM', onPress: () => handleDelete() },
              ])
            }
          >
            <Icon name="delete" size={35} color="#f86161" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleEdit({ id, anotacao: content, list: [], title })
            }
          >
            <Icon name="save" size={35} color="#92effc" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title, content]);

  return (
    <Container>
      <TextInput placeholder="Titulo" value={title} onChangeText={setTitle} />

      <TextInputContent
        multiline
        placeholder="Anotações"
        value={content}
        onChangeText={setContent}
      />
    </Container>
  );
};

export default App;
