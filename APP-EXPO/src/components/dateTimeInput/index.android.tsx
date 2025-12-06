import React, { useMemo } from "react";

import RNDateTimePicker, {
  DateTimePickerAndroid,
} from "@react-native-community/datetimepicker";
// import { DatePickerAndroid } from "react-native";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import {
  Container,
  DateButton,
  DateText,
  Iconn,
  InputTextError,
} from "./styles";

const DateTimeInput = ({ date, onChange, placeholder, error }: any) => {
  let dateFormatted = null;
  if (date) {
    dateFormatted = useMemo(
      () => format(date, "dd 'de' MMMM 'de'  yyyy", { locale: pt }),
      [date]
    );
  }

  async function handleOpenPicker() {
    await DateTimePickerAndroid.open({
      mode: "date",
      value: date || new Date(),
      onChange(event, date) {
        if (event.type === "set") {
          onChange(date);
          //  const selectedDate = new Date(year, month, day);

          //  onChange(selectedDate);
        }
      },
    });

    // if (action === DateTimePickerAndroid.dateSetAction) {
    //   const selectedDate = new Date(year, month, day);

    //   onChange(selectedDate);
    // }
  }

  // return (
  //   <RNDateTimePicker
  //     onChange={(e) => {
  //       console.log(e);
  //     }}
  //     value={new Date()}
  //   />
  // );

  return (
    <Container error={error}>
      <DateButton onPress={handleOpenPicker}>
        <Iconn name="event" color="#fff" size={20} />
        <DateText>
          {placeholder} ({date && dateFormatted})
        </DateText>
      </DateButton>
    </Container>
  );
};

export default DateTimeInput;
