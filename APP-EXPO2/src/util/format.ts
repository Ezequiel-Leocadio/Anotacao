import { format, parseISO } from "date-fns";

export async function validateValue({ schema = [], data }: any) {
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
    throw new Error("Schema e Data São Obrigatórios");
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
      const validDate = String(new Date(`${valuInput}T23:00:00`));
      if (validDate === "Invalid Date") {
        message += `Campo ${
          label || value
        } é Inválido! Invalid Date(${valuInput}) \n`;
        success = false;
      }
    }

    if (type === "datetime" && valuInput) {
      const validDate = String(new Date(valuInput));
      if (validDate === "Invalid Date") {
        message += `Campo ${
          label || value
        } é Inválido! Invalid Date(${valuInput})\n`;
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
  }

  if (!success) {
    throw new Error(message);
  }
}

export const formatDateTime = (date: any) => {
  try {
    return format(parseISO(date), "dd/MM/yyyy HH:mm:ss");
  } catch (error) {
    return "Nullo";
  }
};

export const formatDate = (date: any) => {
  try {
    return format(parseISO(date), "dd/MM/yyyy ");
  } catch (error) {
    return "Nullo";
  }
};

export function arrayGroupBy(xs, key) {
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
}
