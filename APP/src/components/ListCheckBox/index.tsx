import React, { useEffect, useState } from 'react';

import CheckBox from '../checkbox';
import { TextCheck } from './styles';

const ListCheckbox = ({ itens, itens2, handleEditMarcado, handleDelete }) => {
  const [list, setList] = useState([]);
  const [list2, setList2] = useState([]);

  useEffect(() => {
    setList(itens);
    setList2(itens2);
  }, [itens, itens2]);

  return (
    <>
      {list.map((e) => (
        <CheckBox
          id={String(e.id)}
          key={String(e.id)}
          name="CheckBox"
          posicao={e.posicao}
          defaultValue={e.descricao}
          isSelected={e.marcado || false}
          focus={false}
          onSubmit={(e) => {}}
          onValueChange={(f) => handleEditMarcado(f, e.id)}
          onDelete={() => handleDelete(e, e.id)}
        />
      ))}

      <TextCheck>Itens Riscados</TextCheck>

      {list2.map((e) => (
        <CheckBox
          key={String(e.id)}
          id={String(e.id)}
          name="CheckBox"
          posicao={e.posicao}
          defaultValue={e.descricao}
          isSelected={e.marcado || false}
          focus={false}
          onSubmit={(e) => {}}
          onValueChange={(f) => handleEditMarcado(f, e.id)}
          onDelete={() => handleDelete(e, e.id)}
        />
      ))}
    </>
  );
};

export default ListCheckbox;
