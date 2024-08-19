import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  TextInput,
  Modal,
  GestureResponderEvent,
  Text,
  Button,
  Pressable,
  TouchableOpacity,
} from 'react-native';

import customModalStyles from './styles';
// import Button from '../button';

interface Props {
  modalVisible: boolean;
  onRequestClose;
  title: string;
  defaultValue?: string;
  buttonOneTitle: string;
  onPressOne: (event: any) => void;

  placeholder: string;
}

const InputModal: FC<Props> = ({
  modalVisible,
  title,
  onPressOne,
  placeholder,
  defaultValue = '',
  onRequestClose,
}) => {
  const [value, setValue] = useState(String(defaultValue));
  const ref: any = useRef();

  useEffect(() => {
    if (ref.current) {
      setTimeout(() => {
        setValue(String(defaultValue));

        ref.current?.blur();
        ref.current?.focus();
      }, 500);
    }
  }, [modalVisible]);

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}
    >
      <View style={customModalStyles.centeredView}>
        <View style={customModalStyles.modalView}>
          <Text style={customModalStyles.textSize}>{title}</Text>

          <TextInput
            ref={ref}
            value={value}
            onChangeText={setValue}
            placeholder={placeholder}
            placeholderTextColor={'#000'}
            style={{
              backgroundColor: '#3f3f3f',
              width: '100%',
              borderRadius: 5,
            }}
          />

          {/* <Button
            title="Salvar"
            onPress={() => {
              onPressOne(value);
              setValue('');
            }}
          /> */}

          <TouchableOpacity
            style={{ display: 'flex', alignItems: 'flex-end' }}
            onPress={() => {
              onPressOne(value);
              setValue('');
            }}
          >
            <Text style={{ color: '#a8cbfa', fontSize: 20 }}>SALVAR</Text>
          </TouchableOpacity>
          {/* // <Button
          //   onPress={() => {
          //     onPressOne(value);
          //     setValue('');
          //   }}
          //   icon="save"
          //   color="success"
          //   top={10}
          //   size={100}
          // >
          //   Salvar
          // </Button> */}
        </View>
      </View>
    </Modal>
  );
};

export default InputModal;
