import * as React from "react";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { Expense, RootStackParamList } from "..";
import { IconButton } from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/styles";

import { useExpenses } from "../hooks/useExpenses";
import { ExpenseForm } from "../components/ManageExpense/ExpenseForm";
import { HideKeyboard } from "../components/HideKeyboard";

type ManageExpenseProps = {} & NativeStackScreenProps<
  RootStackParamList,
  "ManageExpense"
>;

const ManageExpenses = ({ route, navigation }: ManageExpenseProps) => {
  const editExpenseId = route.params?.expenseId;
  const isEditing = !!editExpenseId;

  const { expenses, deleteExpense, updateExpense, addExpense } = useExpenses();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: `${isEditing ? "Edit" : "Add"} Expense`,
    });
  }, [navigation, isEditing]);

  const selectedExpense = React.useMemo(() => {
    return expenses.find((expense) => expense.id === editExpenseId);
  }, [expenses, editExpenseId]);

  const closeModal = () => {
    navigation.goBack();
  };

  const deleteExpenseHandler = () => {
    if (editExpenseId) {
      deleteExpense(editExpenseId);
    }
    closeModal();
  };

  const cancelHandler = () => {
    closeModal();
  };

  const confirmHandler = (expenseData: Omit<Expense, "id">) => {
    if (isEditing) {
      updateExpense(editExpenseId, expenseData);
    } else {
      addExpense(expenseData);
    }
    closeModal();
  };

  return (
    <HideKeyboard>
      <View style={styles.container}>
        <ExpenseForm
          defaultValues={selectedExpense}
          submitButtonLabel={isEditing ? "Update" : "Add"}
          onCancel={cancelHandler}
          onSubmit={confirmHandler}
        />

        {isEditing && (
          <View style={styles.deleteContainer}>
            <IconButton
              icon="trash"
              color={GlobalStyles.colors.error500}
              size={36}
              onPress={deleteExpenseHandler}
            />
          </View>
        )}
      </View>
    </HideKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary800,
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary200,
    alignItems: "center",
  },
});

export { ManageExpenses };
