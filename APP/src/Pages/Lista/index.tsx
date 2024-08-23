import React, { useEffect, useRef, useState } from 'react';
import { View, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import {
  getData,
  handleDeleteItem,
  handleEdit,
  handleFind,
  storeData,
} from '../../services/data';
import ListCheckbox from '../../components/ListCheckBox';
import Load from '../../components/load';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  ScrollItens,
  Container,
  TextInput,
  ContentAdd,
  TextInputAdd,
} from './styles';

const App = ({ navigation, route }) => {
  const refScroll = useRef();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [textAdd, setTextAdd] = useState('');

  const [list, setList] = useState([]);

  const { id } = route.params;

  useEffect(() => {
    async function load() {
      const { title, list } = await handleFind(id);

      setTitle(title);
      setList(list);

      if (refScroll.current) {
        const e: any = refScroll.current;

        e.scrollToEnd();
      }
    }

    load();
  }, []);

  async function handleDelete(e, idEdit) {
    setLoading(true);

    const itensGet: any = await getData({ tipo: 'itens' });
    const index = itensGet.findIndex((f) => f.id === id);
    if (index >= 0) {
      const i = list;
      const indexEdit = i.findIndex((f) => f.id === idEdit);

      if (indexEdit >= 0) {
        i.splice(indexEdit, 1);
      }

      itensGet[index].list = i;
      setList(i);
    }

    await storeData({ tipo: 'itens', value: JSON.stringify(itensGet) });

    setTimeout(() => {
      setLoading(false);
    }, 5);
  }

  async function handleEditMarcado(e, idEdit) {
    setLoading(true);
    const i = list;

    const itensGet: any = await getData({ tipo: 'itens' });
    const index = itensGet.findIndex((f) => f.id === id);

    if (index >= 0) {
      const indexEdit = i.findIndex((f) => f.id === idEdit);

      if (indexEdit >= 0) {
        i[indexEdit].marcado = !i[indexEdit].marcado;
        itensGet[index].list = i;
        itensGet[index].edit = true;
        setList(i);
      }
    }

    await storeData({ tipo: 'itens', value: JSON.stringify(itensGet) });
    setTimeout(() => {
      setLoading(false);
    }, 5);
  }

  async function handleAdd({ descricao, posicao, idEdit }) {
    const itensGet: any = await getData({ tipo: 'itens' });
    const index = itensGet.findIndex((f) => f.id === id);
    if (index >= 0) {
      let idIten = 0;
      for await (const i of list) {
        if (i.id > idIten) {
          idIten = i.id;
        }
      }
      idIten = idIten + 1;
      const i = {
        id: idIten,
        id_nota: id,
        posicao: posicao,
        descricao: descricao,
        marcado: false,
      };
      const indexEdit = list.findIndex((f) => f.id === idEdit);

      if (indexEdit >= 0) {
        list[indexEdit].descricao = descricao;
      } else {
        list.push(i);
      }

      itensGet[index].list = list;
      itensGet[index].edit = true;
    }

    await storeData({ tipo: 'itens', value: JSON.stringify(itensGet) });
    setTextAdd('');

    setTimeout(() => {
      if (refScroll.current) {
        const e: any = refScroll.current;

        e.scrollToEnd();
      }
    }, 20);
  }

  async function handleDeleteLista() {
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
              Alert.alert(
                'Excluir Lista',
                'Irá Excluir a Lista Toda!', // <- this part is optional, you can pass an empty string
                [
                  { text: 'NÃO', onPress: () => {} },
                  { text: 'SIM', onPress: () => handleDeleteLista() },
                ]
              )
            }
          >
            <Icon name="delete" size={35} color="#f86161" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleEdit({ id, anotacao: '', list, title })}
          >
            <Icon name="save" size={35} color="#92effc" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation, title]);

  return (
    <Container>
      <ScrollItens ref={refScroll}>
        <Load loading={loading} />
        <TextInput placeholder="Titulo" value={title} onChangeText={setTitle} />

        <ListCheckbox
          handleEditMarcado={handleEditMarcado}
          handleDelete={handleDelete}
          itens={list.filter((f) => !(f.marcado === true))}
          itens2={list.filter((f) => f.marcado === true)}
        />
      </ScrollItens>

      <ContentAdd>
        <TextInputAdd
          placeholder="Inserir Item"
          value={textAdd}
          returnKeyType="send"
          onSubmitEditing={() =>
            handleAdd({
              descricao: textAdd,
              posicao: list.length + 1,
              idEdit: -1,
            })
          }
          onChangeText={setTextAdd}
        />

        <TouchableOpacity
          onPress={() =>
            handleAdd({
              descricao: textAdd,
              posicao: list.length + 1,
              idEdit: -1,
            })
          }
        >
          <Icon
            name="add"
            size={35}
            color="#fff"
            style={{
              borderLeftWidth: 2,
              borderLeftColor: '#000',
              //   borderLeftStyle: 'solid',
            }}
          />
        </TouchableOpacity>
      </ContentAdd>
    </Container>
  );
};

export default App;
