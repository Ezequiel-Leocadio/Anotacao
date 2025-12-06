import React, { useState, useEffect, memo } from "react";

import Icon from "@expo/vector-icons/MaterialIcons";

import {
  Container,
  Header,
  Footer,
  Modal,
  Check,
  Table,
  Thead,
  Tbody,
  TableTr,
  TableTh,
  TableTd,
  TableThTr,
  Name,
  Content,
} from "./styles";
import { Text, View } from "react-native";

// import { formatDateTime } from '../../util/format';

function TableComponent({
  name,
  itens,
  colluns,
  options,
  onEvent,
  header,
  footer,
}: any) {
  const [modal, setModal] = useState(false);
  const [collunsF, setCollunsF] = useState(colluns);
  const [itensF, setItensF] = useState(itens);
  const [itensSelect, setItensSelect] = useState([]);

  const [pageAtual, setPageAtual] = useState(1);
  const [next, setNext] = useState(false);
  const [linhas, setLinhas] = useState(10);
  const [totalPages, setTotalPages] = useState(0);

  useEffect(() => {
    const col = colluns.map((c: any) => ({
      ...c,
      direction: "asc",
    }));

    setCollunsF(col);

    setItensSelect([]);

    const totalItens: any = itens.length;
    const totalPa: any = parseInt(String(totalItens / linhas), 10);
    const resto = totalItens % linhas;
    if (totalItens > 10) {
      setNext(true);
    } else {
      setNext(false);
      setPageAtual(1);
    }

    if (resto > 0) {
      setTotalPages(totalPa + 1);
    } else {
      setTotalPages(totalPa === 0 ? 1 : totalPa);
    }
    setItensF(itens);
  }, [itens]);

  function handleCheck(v: any) {
    const hiidenColun = collunsF.map((c: any) => ({
      ...c,
      hidden: c.value === v ? !c.hidden : c.hidden,
    }));

    setCollunsF(hiidenColun);
  }

  function orderBy(c: any) {
    const v = c.value;
    itensF.sort((a: any, b: any) => {
      if (a[v] < b[v]) {
        return c.direction === "asc" ? -1 : 1;
      }
      if (a[v] > b[v]) {
        return c.direction === "asc" ? 1 : -1;
      }
      return 0;
    });
    const direction = c.direction === "asc" ? "desc" : "asc";
    const col = collunsF.map((cl: any) => ({
      ...cl,
      direction: v === cl.value ? direction : cl.direction,
    }));
    setCollunsF(col);
    // setDirection(direction === 'asc' ? direction : 'asc');
  }

  function handlePage(page: any) {
    setPageAtual(page);

    if (page < totalPages) {
      if (totalPages > 1) {
        setNext(true);
      }
    } else {
      setNext(false);
    }
  }

  function indexOf(str: any, search: any) {
    if (str === null || undefined) {
      return -1;
    }

    try {
      str.toString();
    } catch (error) {
      return -1;
    }
    if (str.toString() === "") {
      return -1;
    }
    //
    // if (str.indexOf(search)) {
    return str.toString().indexOf(search);
  }

  function format(e: any) {
    return e;
  }

  return (
    <Content>
      {modal && (
        <Modal>
          {collunsF.map((i: any, index: any) => (
            <Check key={String(index)} onPress={() => handleCheck(i.value)}>
              {/* <input type="checkbox" checked={!i.hidden} />
              <span> {i.label}</span> */}
            </Check>
          ))}
        </Modal>
      )}

      <Container
        onPress={() => {
          if (modal) {
            setModal(false);
          }
        }}
      >
        <Name>{name}</Name>

        <Table>
          <Thead>
            <TableThTr>
              {collunsF.map(
                (c: any, index: any) =>
                  !c.hidden && (
                    <TableTh
                      width={collunsF.length}
                      onPress={() => orderBy(c)}
                      key={String(index)}
                    >
                      {c.label}
                    </TableTh>
                  )
              )}
            </TableThTr>
          </Thead>

          <Tbody
            data={itensF}
            keyExtractor={(item: any) => String(item.id)}
            renderItem={({ item, index }: any) => (
              <>
                {!(itensF.length > 0) && (
                  <TableTr>
                    <TableTd>---Vazio---</TableTd>
                  </TableTr>
                )}

                <TableTr
                  index={String(index)}
                  key={String(index)}
                  // key={String(item.id || item.idIndex)}
                  onPress={() => onEvent({ item })}
                >
                  {collunsF.map(
                    (c: any, indexx: any) =>
                      !c.hidden && (
                        <TableTd width={collunsF.length} key={String(indexx)}>
                          {/* <div className="ocultar"> */}
                          {indexOf(item[c.value], "http://") !== -1 ? (
                            // <img src={iten[c.value]} alt="image" />
                            format(item[c.value])
                          ) : indexOf(item[c.value], "tag_span") !== -1 ? (
                            <Text>{item[c.value].split("-")[2]}</Text>
                          ) : (
                            format(item[c.value])
                          )}
                          {/* </div> */}
                        </TableTd>
                      )
                  )}
                </TableTr>
              </>
            )}
          />
        </Table>
      </Container>
    </Content>
  );
}

function shouldComponentUpdate(prevProps: any, nextProps: any) {
  // console.log(prevProps.length !== nextProps.length);
  return prevProps.length !== nextProps.length;
}

export default memo(TableComponent, shouldComponentUpdate);
