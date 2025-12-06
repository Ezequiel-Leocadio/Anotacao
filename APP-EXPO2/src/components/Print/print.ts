import { useState } from "react";
import { Platform } from "react-native";
import * as Print from "expo-print";

export async function PrintFile(html) {
  const selectedPrinter = null;

  if (Platform.OS === "web") {
    const win = window.open();
    win.document.open();
    win.document.write(html);
    win.focus();
    win.document.close();
    return;
  }

  await Print.printAsync({
    html: html,
    printerUrl: selectedPrinter?.url, // iOS only
  });
}
