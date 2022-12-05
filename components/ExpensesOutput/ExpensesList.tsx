import { FlatList, Text } from "react-native";
import { Expense } from "../..";
import { ExpenseItem } from "./ExpenseItem";

type ExpenseListProps = {
  expenses: Expense[];
};

const ExpensesList = ({ expenses }: ExpenseListProps) => {
  return (
    <FlatList
      data={expenses}
      renderItem={({ item: expense }) => <ExpenseItem expense={expense} />}
      keyExtractor={({ id }) => id}
    />
  );
};

export { ExpensesList };
