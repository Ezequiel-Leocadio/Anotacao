import { useEffect, useState } from "react";
import { getData, getDataUrl } from "../../services/data";
import { Container, NotaTitle, NotasContente } from "./styles";
import Icon from "@expo/vector-icons/MaterialIcons";
import { StdAlert } from "../../components/Alert";
import { HtmlLivro } from "../../components/Print/livro";
import { PrintFile } from "../../components/Print/print";
import { Platform } from "react-native";

function PDF({ navigation, route }) {
  const [itens, setItens] = useState<any>([]);

  async function load(e) {
    const itensGet: any = await getData({ tipo: "itens" });

    return itensGet.filter((f) => f.id_nivel === e.id);
  }

  async function formatTipo(i) {
    const url: any = await getDataUrl();

    if (i.tipo === "nota" || i.tipo === "receita") {
      return `
        <div class="itens">
             <div class="cod">Cód:${i.id}</div>
            <div class="title">${i.title}</div>
           
            <div class="anotacao">${i.anotacao.replaceAll("\n", "</br>")}</div>
            ${
              i.image
                ? `<img src="${url}${Platform.OS === "web" ? "" : "/"}files/${
                    i.image
                  }" alt=""/>`
                : ""
            }
        </div>
        `;
    }

    if (i.tipo === "list") {
      let list = "";
      for await (const li of i.list) {
        list += `
            <div class="anotacao">${li.descricao}</div>
        
        `;
      }
      return `
        <div class="itens">
             <div class="cod">Cód:${i.id}</div>
            <div class="title">${i.title} </div>

           ${list}
        </div>
        `;
    }
  }

  async function formatPast(i) {
    let itens = "";
    if (i.tipo === "pasta") {
      const itensLoad = await load(i);
      for await (const f of itensLoad) {
        if (f.tipo === "pasta") {
          const itensLoad = await load(f);
          let itensf = "";

          for await (const ff of itensLoad) {
            itensf += await formatTipo(ff);
          }

          itens += `
           <div class="nv2">
            <h1  class="nv2">↳ ${f.title}</h1>
            ${itensf}
            </div>
          `;
        } else {
          itens += await formatTipo(f);
        }
      }
    } else {
      itens += await formatTipo(i);
    }
    return itens;
  }

  const print = async (e) => {
    if (e.tipo !== "pasta") {
      StdAlert("Erro ", "Somente tipo pasta pode ser Imprimido");
      return;
    }
    const itensLoad = await load(e);
    let itensHtml = `
        <div class="novap capa">
            ${e.title}       
        </div>
    `;
    for await (const i of itensLoad) {
      let itens = await formatPast(i);

      itensHtml += `
        <div class="novap">
            <h1>${i.title}</h1>
            ${itens}
        </div>
    `;
    }

    const html = HtmlLivro(itensHtml);

    await PrintFile(html);
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await loadItens();
    });

    return unsubscribe;
  }, [navigation]);

  async function loadItens() {
    const itensGet: any = await getData({ tipo: "itens" });

    const filter = itensGet.filter((f) => f.id_nivel === 0);
    setItens(filter);
  }

  return (
    <Container>
      {itens.map((e) => (
        <NotasContente key={String(e.id)} onPress={() => print(e)}>
          <NotaTitle>{e.title}</NotaTitle>
          <Icon name="print" size={35} color="#fff" />
        </NotasContente>
      ))}
    </Container>
  );
}

export default PDF;
