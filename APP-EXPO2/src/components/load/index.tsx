import React, { useState, useEffect } from 'react';
import { ActivityIndicator } from 'react-native';

import { Loading, ContainerLoading } from './styles';

export default function Load({ loading }) {
  return (
    <>
      {loading && (
        <ContainerLoading>
          <Loading>
            <ActivityIndicator animating size={50} color="#0000ff" />
          </Loading>
        </ContainerLoading>
      )}
    </>
  );
}
