import React, { useMemo } from "react";

import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
// import { DatePickerAndroid } from "react-native";
import { format } from "date-fns";
import pt from "date-fns/locale/pt";

import {
  Container,
  DateButton,
  DateText,
  Iconn,
  InputGrup,
  InputText,
  InputTextError,
} from "./styles";
import { LabelInput, LabelInputText } from "./styles";
import { Platform, TextInput } from "react-native";

const DateTimeInput = ({
  date,
  label,
  required,
  onChange,
  placeholder,
  error,
}: any) => {
  let dateFormatted = null;
  let dateFormattedUsa = null;
  if (date) {
    dateFormatted = useMemo(
      () =>
        format(date + "T23:00:00", "dd 'de' MMMM 'de'  yyyy", { locale: pt }),
      [date]
    );
    // dateFormattedUsa = useMemo(() => new Date(date).setHours(23), [date]);
  }

  async function handleOpenPicker() {
    await DateTimePickerAndroid.open({
      mode: "date",
      value: dateFormattedUsa || new Date(),
      onChange(event, date) {
        if (event.type === "set") {
          onChange(format(date, "yyyy-MM-dd"));
        }
      },
    });
  }

  return (
    <InputGrup>
      {/* <InputText>{label}</InputText> */}
      <LabelInput>
        <LabelInputText>
          {label}:{required ? "*" : ""}
        </LabelInputText>
      </LabelInput>
      <Container error={error}>
        {Platform.OS === "web" ? (
          <input
            style={{
              backgroundColor: "#444",
              color: "#fff",
              padding: 10,
              borderRadius: 5,
            }}
            type="date"
            onChange={(e) => {
              onChange(e.target.value);
            }}
            placeholder={placeholder}
          />
        ) : (
          <DateButton onPress={handleOpenPicker}>
            <Iconn name="event" color="#fff" size={20} />
            <DateText>{date ? dateFormatted : placeholder}</DateText>
          </DateButton>
        )}
      </Container>
    </InputGrup>
  );
};

export default DateTimeInput;
