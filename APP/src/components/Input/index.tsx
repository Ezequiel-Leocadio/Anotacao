import React from 'react';

import { Content, Text, FormInput } from './styles';

function Input({ label, ...rest }) {
  return (
    <Content>
      <Text>{label}:</Text>
      <FormInput {...rest} />
    </Content>
  );
}

export default Input;
