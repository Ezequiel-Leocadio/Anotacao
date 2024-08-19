import React, { useEffect, useRef, useState } from 'react';

import {
  Container,
  CheckboxContainer,
  CheckBox,
  TextPosition,
  TextInput,
} from './styles';
import { Alert, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const checkbox = ({
  name,
  posicao,
  focus = false,
  color = 'white',
  defaultValue = '',
  onSubmit,
  isSelected,
  onDelete,
  id,
  ...rest
}) => {
  const ref: any = useRef();
  const [value, setValue] = useState(String(defaultValue));

  useEffect(() => {
    if (ref.current && focus) {
      setTimeout(() => {
        ref.current?.blur();
        ref.current?.focus();
      }, 100);
    }

    setValue(String(defaultValue));
  }, []);

  let decoration = false;

  if (isSelected) {
    decoration = true;
  } else {
    decoration = false;
  }

  return (
    <Container key={String(id)}>
      <CheckboxContainer>
        <TextPosition>{posicao < 10 ? '0' + posicao : posicao}</TextPosition>
        <CheckBox
          value={isSelected}
          tintColors={{ true: '#4cc9f0', false: '#4cc9f0' }}
          {...rest}
        />
        <TextInput
          ref={ref}
          value={value}
          onChangeText={setValue}
          placeholderTextColor={'#ffffff'}
          returnKeyType="next"
          onSubmitEditing={() => onSubmit(value)}
          decoration={decoration}
        />

        <TouchableOpacity
          onPress={() => {
            Alert.alert('Excluir Item', '', [
              { text: 'NÃO', onPress: () => {} },
              { text: 'SIM', onPress: () => onDelete() },
            ]);
          }}
        >
          <Icon name="delete" size={25} color="#fff" />
        </TouchableOpacity>
      </CheckboxContainer>
    </Container>
  );
};

export default checkbox;
