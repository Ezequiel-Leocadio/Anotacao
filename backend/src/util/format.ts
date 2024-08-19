import { parseISO, differenceInMinutes } from "date-fns";

//Média de Espera
export function formatDateMedia({ dt1, dt2, total }) {
  try {
    const distance: any = differenceInMinutes(dt2, dt1);
    // console.log(distance);
    if (distance <= 0) return { string: "", number: 0 };
    const calc: any = distance / 60;

    const horas = parseInt(String(calc / total));
    const minutos = distance % 60;
    const minutosMedia = parseInt(String(minutos / total));
    // Pega o resta da divisao de minutos para saber os segundos
    const segundosMedia = parseInt(String(((minutos % total) * 60) / total));

    const textoHora = horas > 1 ? "Horas" : "Hora";
    const textoMinutos = minutosMedia > 1 ? "Minutos" : "Minuto";
    const textoSegundos = segundosMedia > 1 ? "Segundos" : "Segundo";

    let hm = "";

    if (Number(horas) <= 0) {
      if (segundosMedia > 0) {
        hm = `${minutosMedia} ${textoMinutos} e ${segundosMedia} ${textoSegundos}`;
      } else {
        hm = `${minutosMedia} ${textoMinutos}`;
      }
    } else {
      if (segundosMedia > 0) {
        hm = `${horas} ${textoHora}, ${minutosMedia} ${textoMinutos} e ${segundosMedia} ${textoSegundos}`;
      } else {
        hm = `${horas} ${textoHora} e ${minutosMedia} ${textoMinutos}`;
      }
    }

    return {
      string: hm,
      number: { horas: horas, minutosMedia, segundosMedia },
    };
  } catch (error) {
    return "invalido";
  }
}

// Previsão para o Atendimento
export function formatDatePrevAtend({ dt1, dt2, total, senhasP = 1 }) {
  try {
    const distance: any = differenceInMinutes(dt2, dt1) * senhasP;

    if (distance <= 0) return { string: "", number: 0 };
    const calc: any = distance / 60;

    const horas = parseInt(String(calc / total));
    const minutos = distance % 60;
    const minutosMedia = parseInt(String(minutos / total));
    // Pega o resta da divisao de minutos para saber os segundos
    const segundosMedia = parseInt(String(((minutos % total) * 60) / total));

    const textoHora = horas > 1 ? "Horas" : "Hora";
    const textoMinutos = minutosMedia > 1 ? "Minutos" : "Minuto";
    const textoSegundos = segundosMedia > 1 ? "Segundos" : "Segundo";

    let hm = "";

    if (Number(horas) <= 0) {
      if (segundosMedia > 0) {
        hm = `${minutosMedia} ${textoMinutos} e ${segundosMedia} ${textoSegundos}`;
      } else {
        hm = `${minutosMedia} ${textoMinutos}`;
      }
    } else {
      if (segundosMedia > 0) {
        hm = `${horas} ${textoHora}, ${minutosMedia} ${textoMinutos} e ${segundosMedia} ${textoSegundos}`;
      } else {
        hm = `${horas} ${textoHora} e ${minutosMedia} ${textoMinutos}`;
      }
    }

    return {
      string: hm,
      number: { horas: horas, minutosMedia, segundosMedia },
    };
  } catch (error) {
    return {
      string: "invalido",
      number: { horas: 0, minutosMedia: 0, segundosMedia: 0 },
    };
  }
}

export const arrayGroupBy = (xs, key) => {
  // xs Array
  // key Grupo
  const grupos = Array.from(
    xs
      .reduce(
        (entryMap, e) =>
          entryMap.set(e[key], {
            ...(entryMap.get(e[key]) || {}),
            ...e,
            name: e[key],
            itens: [],
          }),
        new Map()
      )
      .values()
  );

  return grupos.map((res: any) => ({
    ...res,
    group: res.name,
    itens: xs.filter((p) => p[key] === res.name),
  }));
};

function ErrorValidate(msg) {
  const e = new Error(msg); // e.name is 'Error'

  e.name = "validateValue";
  throw e;
}

export async function validateValue({ schema = [], data }) {
  let schemaF = schema;
  if (!(schema.length > 0)) {
    const keys = Object.keys(schema);
    const schemaGenerat = [];
    for await (const key of keys) {
      schemaGenerat.push({
        value: key,
        ...schema[key],
      });
    }
    schemaF = schemaGenerat;
  }

  const exempleSchema = [
    {
      value: "teste", // Nome do Campo
      label: "Teste", // Nome qe p usuario ira ver ,
      type: "string", // tipo do campo | string | number | date | datetime | boolean
      required: true, // Se o campo é obrigatorio ou nao
    },
  ];
  let message = "";
  let success = true;

  if (!schema || !data) {
    ErrorValidate("Schema e Data São Obrigatórios");
  }
  for await (const i of schemaF) {
    const { required = false, type = "string", label, value } = i;
    // console.log(String(data[i.value]));
    const valuInput = data[value] || false;
    if (required && type !== "boolean") {
      if (!data[value]) {
        message += `Campo ${label || value} é Obrigatório !\n`;
        success = false;
      }
    }

    if (type === "string" && valuInput) {
      const indexofaspas = String(valuInput).indexOf("'");

      if (indexofaspas !== -1) {
        message += `Campo ${
          label || value
        } é Inválido!, Não Pode Conter Aspas  \n`;
        success = false;
      }
    }

    if (type === "date" && valuInput) {
      const validDate = new Date(`${valuInput}T23:00:00`);
      const validDateString = String(validDate);

      if (validDateString === "Invalid Date") {
        message += `Campo ${
          label || value
        } é Inválido! Invalid Date: (${valuInput}) \n`;
        success = false;
      }

      if (String(validDate.getFullYear()).length < 4) {
        message += `Campo ${
          label || value
        } é Inválido! Ano Inválido (${valuInput}) \n`;
        success = false;
      }
    }

    if (type === "datetime" && valuInput) {
      const validDate = new Date(valuInput);
      const validDateString = String(validDate);

      if (validDateString === "Invalid Date") {
        message += `Campo ${
          label || value
        } é Inválido! Invalid Date(${valuInput})\n`;
        success = false;
      }

      if (String(validDate.getFullYear()).length < 4) {
        message += `Campo ${
          label || value
        } é Inválido! Ano Inválido (${valuInput}) \n`;
        success = false;
      }
    }

    if (type === "number" && valuInput) {
      const valuef = String(valuInput);
      const checkLetras = valuef.match(/[a-zA-Z]/g);
      const checkNumber = String(Number(valuef));
      const checkNumberFlot = valuef.indexOf(".") !== -1;

      if (checkLetras) {
        message += `Campo ${
          label || value
        } Não Pode Conter Letras Somente Números (${valuInput}) \n`;
        success = false;
      } else if ((!checkLetras && checkNumber === "NaN") || checkNumberFlot) {
        message += `Campo ${
          label || value
        } não é um  Número Válido (${valuInput})\n`;
        success = false;
      }
    }

    if (type === "float" && valuInput) {
      const valuef = String(valuInput);
      const checkLetras = valuef.match(/[a-zA-Z]/g);
      const checkNumber = String(Number(valuef));

      if (checkLetras) {
        message += `Campo ${
          label || value
        } Não Pode Conter Letras Somente Números (${valuInput}) \n`;
        success = false;
      }
      if (!checkLetras && checkNumber === "NaN") {
        message += `Campo ${
          label || value
        } não é um  Número Válido (${valuInput})\n`;
        success = false;
      }
    }

    if (type === "select" && valuInput) {
      const valuInputf = valuInput.toUpperCase();
      const findInsert = valuInputf.indexOf("INSERT");
      if (findInsert !== -1) {
        message += `Campo ${label || value} Não Pode Conter INSERT \n`;
        success = false;
      }
      const findUpdate = valuInputf.indexOf("UPDATE");
      if (findUpdate !== -1) {
        message += `Campo ${label || value} Não Pode Conter UPDATE \n`;
        success = false;
      }
      const findDelte = valuInputf.indexOf("DELETE");
      if (findDelte !== -1) {
        message += `Campo ${label || value} Não Pode Conter DELETE \n`;
        success = false;
      }
    }
  }

  if (!success) {
    ErrorValidate(message);
  }
}
