import * as React from "react";
import { Keyboard, TouchableWithoutFeedback } from "react-native";

type HideKeyboardProps = {
  children: React.ReactNode;
};

const HideKeyboard = ({ children }: HideKeyboardProps) => {
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      {children}
    </TouchableWithoutFeedback>
  );
};

export { HideKeyboard };
