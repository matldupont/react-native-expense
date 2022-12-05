import * as React from "react";
import { Text, View, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/styles";
import { Expense } from "../..";

type ExpensesSummaryProps = {
  periodName: string;
  expenses: Expense[];
};

const ExpensesSummary = ({ periodName, expenses }: ExpensesSummaryProps) => {
  const totalExpenses = React.useMemo(
    () => expenses.reduce((sum: number, expense) => (sum += expense.amount), 0),
    [expenses]
  );

  return (
    <View style={styles.container}>
      <Text style={styles.period}>{periodName}</Text>
      <Text style={styles.sum}>${totalExpenses.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  period: {
    fontSize: 12,
    color: GlobalStyles.colors.primary400,
  },
  sum: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.colors.primary500,
  },
});

export { ExpensesSummary };
