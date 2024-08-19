import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';

import ButtonFloatC from '../../components/button/ButtonFloat';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Container, NotaTitle, NotasContente } from './styles';
import InputModal from '../../components/Modal';
import {
  getData,
  handleDeleteItem,
  handleEdit,
  storeData,
} from '../../services/data';

function Pasta({ navigation, route }) {
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [title, setTitle] = useState('');
  const [itenAdd, setItenAdd] = useState('');

  const [itens, setItens] = useState<any>([]);

  const { id, numPasta } = route.params;

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      // do something
      //   console.log(id, numPasta);
      await loadItens();
    });

    return unsubscribe;
  }, [navigation]);

  async function handleDelete() {
    await handleDeleteItem(id);
    navigation.goBack();
  }

  function headerRight() {
    return (
      <View style={{ display: 'flex', flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ marginRight: 20 }}
          onPress={() =>
            Alert.alert(
              'Excluir Pasta?',
              'Irá Excluir a Pasta  e Tudo que Está Nela!', // <- this part is optional, you can pass an empty string
              [
                { text: 'NÃO', onPress: () => {} },
                { text: 'SIM', onPress: () => handleDelete() },
              ]
            )
          }
        >
          <Icon name="delete" size={35} color="#f86161" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setModalEdit(true)}>
          <Icon name="edit" size={35} color="#92effc" />
        </TouchableOpacity>
      </View>
    );
  }

  useEffect(() => {
    async function load() {
      navigation.setOptions({
        headerStyle: {
          backgroundColor: '#615e5e',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      });
      const itensGet: any = await getData({ tipo: 'itens' });
      const filter = itensGet.filter((f) => f.id_nivel === id);
      setItens(filter);

      if (id > 0) {
        const index = itensGet.findIndex((f) => f.id === id);
        if (index >= 0) {
          //   console.log(itensGet[index]);
          setTitle(itensGet[index].title);
          navigation.setOptions({
            title: itensGet[index].title || 'Pasta',

            headerRight: headerRight,
          });
        }
      }
    }

    load();
  }, []);

  async function loadItens() {
    const itensGet: any = await getData({ tipo: 'itens' });

    const filter = itensGet.filter((f) => f.id_nivel === id);

    if (id > 0) {
      const index = itensGet.findIndex((f) => f.id === id);
      if (index >= 0) {
        //   console.log(itensGet[index]);
        setTitle(itensGet[index].title);
        navigation.setOptions({
          title: itensGet[index].title || 'Pasta',
          headerStyle: {
            backgroundColor: '#615e5e',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },

          headerRight: headerRight,
        });
      }
    }
    setItens(filter);
  }

  async function handleAdd({ title, iten }) {
    if (iten === 'pasta' && numPasta === 9) {
      Alert.alert('Erro', 'Vc Esta No Último Nivel de Pasta!');
      return;
    }
    // setLoading(true);
    const itensGet: any = await getData({ tipo: 'itens' });

    const itensf = itensGet;
    let icon = '';
    switch (iten) {
      case 'pasta':
        icon = 'folder';
        break;

      case 'list':
        icon = 'list';
        break;

      case 'nota':
        icon = 'edit';
        break;

      default:
        break;
    }
    let idIten = 0;
    for await (const i of itensf) {
      if (i.id > idIten) {
        idIten = i.id;
      }
    }
    idIten = idIten + 1;

    itensf.push({
      id: idIten,
      tipo: iten,
      icon: icon,
      title: title,
      id_nivel: id,
      list: [],
      edit: true,
    });
    await storeData({ tipo: 'itens', value: JSON.stringify(itensf) });
    await loadItens();

    setModalVisible(false);
    setTitle('');

    // setTimeout(() => {
    //   setLoading(false);
    // }, 50);

    if (iten === 'nota') {
      navigation.navigate('Notas', { id: idIten });
    } else if (iten === 'list') {
      navigation.navigate('Lista', { id: idIten });
    }
  }

  async function handleEditTitle(e) {
    await handleEdit({ id, anotacao: '', list: [], title: e });

    // const itensGet: any = await getData({ tipo: 'itens' });
    // const index = itensGet.findIndex((f) => f.id === id);
    // if (index >= 0) {
    //   itensGet[index].title = e;
    // }
    // await storeData({ tipo: 'itens', value: JSON.stringify(itensGet) });

    await loadItens();

    setModalEdit(false);
  }

  function handleRoute(e) {
    // console.log(e.id);
    if (e.tipo === 'nota') {
      navigation.navigate('Notas', { id: e.id });
    } else if (e.tipo === 'pasta') {
      navigation.navigate('Pasta' + numPasta, {
        id: e.id,
        numPasta: numPasta === 9 ? 0 : numPasta + 1,
      });
    } else if (e.tipo === 'list') {
      navigation.navigate('Lista', { id: e.id });
    }
  }

  return (
    <Container>
      {!loading && (
        <>
          {itens.map((e) => (
            <NotasContente key={String(e.id)} onPress={() => handleRoute(e)}>
              <Icon name={e.icon} size={35} color="#fff" />
              <NotaTitle>{e.title}</NotaTitle>
              <Icon name="drag-handle" size={35} color="#fff" />
            </NotasContente>
          ))}
        </>
      )}

      <InputModal
        modalVisible={modalEdit}
        title="Editar Título Pasta"
        buttonOneTitle="..."
        onRequestClose={() => setModalEdit(false)}
        onPressOne={async (title) => {
          //   setModalVisible(false);
          //   validatePasswordEtc();

          handleEditTitle(title);
        }}
        defaultValue={title}
        placeholder="..."
      />

      <InputModal
        modalVisible={modalVisible}
        title="Informe um Título"
        buttonOneTitle="..."
        onRequestClose={() => setModalVisible(false)}
        onPressOne={async (title) => {
          //   setModalVisible(false);
          //   validatePasswordEtc();

          handleAdd({ iten: itenAdd, title });
        }}
        placeholder="..."
      />

      <ButtonFloatC
        color="success"
        icon="add"
        bottom={10}
        left={10}
        position="right"
        onKeyBoardHidden={true}
        onEvent={(e) => {
          setItenAdd(e);
          setModalVisible(true);
        }}
      />
    </Container>
  );
}

export default Pasta;
