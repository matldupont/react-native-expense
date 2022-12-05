import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import { GlobalStyles } from "../../constants/styles";

type InputProps = {
  label: string;
  textInputConfig?: React.ComponentProps<typeof TextInput>;
  style?: StyleProp<ViewStyle>;
  invalid?: boolean;
};

const Input = ({
  label,
  textInputConfig,
  style,
  invalid = false,
}: InputProps) => {
  let inputStyles: StyleProp<TextStyle> = [
    styles.input,
    invalid && styles.invalidInput,
  ];

  if (textInputConfig?.multiline) {
    inputStyles = [...inputStyles, styles.inputMultiline];
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.label, invalid && styles.invalidLabel]}>
        {label}
      </Text>
      <TextInput
        style={inputStyles}
        {...textInputConfig}
        placeholderTextColor={GlobalStyles.colors.primary200}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 4,
    marginVertical: 8,
  },
  label: {
    fontSize: 12,
    color: GlobalStyles.colors.primary100,
    marginBottom: 4,
  },
  input: {
    backgroundColor: GlobalStyles.colors.primary100,
    color: GlobalStyles.colors.primary700,
    padding: 6,
    borderRadius: 6,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: GlobalStyles.colors.error50,
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.error50,
  },
});

export { Input };
