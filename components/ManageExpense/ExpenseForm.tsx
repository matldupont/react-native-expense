import * as React from "react";
import { StyleSheet, Text, View, Alert } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../..";

import { Button } from "../UI/Button";
import { Input } from "./Input";

type ExpenseFormProps = {
  submitButtonLabel: string;
  onCancel: () => void;
  onSubmit: (expenseData: Omit<Expense, "id">) => void;
  defaultValues?: Expense;
};

const ExpenseForm = ({
  submitButtonLabel,
  onCancel,
  onSubmit,
  defaultValues,
}: ExpenseFormProps) => {
  const [inputs, setInputs] = React.useState({
    amount: { value: defaultValues?.amount || "", isValid: true },
    date: {
      value: defaultValues?.date?.toISOString().slice(0, 10) || "",
      isValid: true,
    },
    description: {
      value: defaultValues?.description || "",
      isValid: true,
    },
  });

  const inputChangeHandler = (field: string, value: string) => {
    setInputs((currValues) => ({
      ...currValues,
      [field]: { value, isValid: true },
    }));
  };

  const submitHandler = () => {
    const expenseData = {
      amount: +inputs.amount.value,
      date: new Date(inputs.date.value),
      description: inputs.description.value,
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      setInputs((currValues) => ({
        amount: {
          ...currValues.amount,
          isValid: amountIsValid,
        },
        date: {
          ...currValues.date,
          isValid: dateIsValid,
        },
        description: {
          ...currValues.description,
          isValid: descriptionIsValid,
        },
      }));
      return;
    }

    onSubmit(expenseData);
  };

  const formIsInvalid = React.useMemo(() => {
    return (
      !inputs.amount.isValid ||
      !inputs.date.isValid ||
      !inputs.description.isValid
    );
  }, [inputs]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputRow}>
        <Input
          label="Amount"
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputs.amount.value.toString(),
          }}
          invalid={!inputs.amount.isValid}
          style={styles.input}
        />
        <Input
          label="Date"
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputs.date.value,
          }}
          invalid={!inputs.date.isValid}
          style={styles.input}
        />
      </View>
      <Input
        label="Description"
        textInputConfig={{
          onChangeText: inputChangeHandler.bind(this, "description"),
          numberOfLines: 10,
          multiline: true,
          value: inputs.description.value,
        }}
        invalid={!inputs.description.isValid}
      />
      {formIsInvalid && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>
            Invalid values - Check your shit.
          </Text>
        </View>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
  },
  errorContainer: {
    backgroundColor: GlobalStyles.colors.error50,
    borderRadius: 6,
    marginHorizontal: 4,
    borderColor: GlobalStyles.colors.error500,
    borderWidth: 1,
  },
  errorText: {
    textAlign: "center",
    color: GlobalStyles.colors.error500,
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 20,
    marginHorizontal: 8,
  },
});

export { ExpenseForm };
