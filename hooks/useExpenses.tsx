import * as React from "react";

import { Expense } from "..";
import * as expenseHttp from "../util/http";

const ExpensesContext = React.createContext<
  | {
      expenses: Expense[];
      addExpense: (expenseData: Omit<Expense, "id">) => void;
      deleteExpense: (id: string) => void;
      updateExpense: (id: string, expenseData: Omit<Expense, "id">) => void;
    }
  | undefined
>(undefined);

type ExpenseAction =
  | { type: "SET"; payload: Expense[] }
  | { type: "ADD"; payload: Expense }
  | { type: "UPDATE"; payload: Expense }
  | { type: "DELETE"; payload: string };

const expensesReducer = (state: Expense[], action: ExpenseAction) => {
  switch (action.type) {
    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "ADD":
      return [action.payload, ...state];
    case "UPDATE":
      const updatedExpenses = state.map((expense) => {
        const { payload: updatedExpense } = action;
        if (expense.id === updatedExpense.id) {
          return updatedExpense;
        }
        return expense;
      });
      return [...updatedExpenses];
    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
};

type ExpensesProviderProps = {
  children: React.ReactNode;
};

const ExpensesProvider = ({ children }: ExpensesProviderProps) => {
  const [expenses, dispatch] = React.useReducer(expensesReducer, []);

  const setExpenses = (expenses: Expense[]) => {
    dispatch({ type: "SET", payload: expenses });
  };

  const addExpense = async (expenseData: Omit<Expense, "id">) => {
    const newExpense = await expenseHttp.storeExpense(expenseData);

    dispatch({ type: "ADD", payload: newExpense });
  };

  const updateExpense = async (
    id: string,
    expenseData: Omit<Expense, "id">
  ) => {
    await expenseHttp.updateExpense(id, expenseData);
    dispatch({ type: "UPDATE", payload: { id, ...expenseData } });
  };

  const deleteExpense = async (id: string) => {
    await expenseHttp.deleteExpense(id);
    dispatch({ type: "DELETE", payload: id });
  };

  const getExpenses = React.useCallback(async () => {
    const expenses = await expenseHttp.fetchExpenses();
    setExpenses(expenses);
  }, [expenseHttp.fetchExpenses]);

  React.useEffect(() => {
    getExpenses();
  }, [getExpenses]);

  const value = React.useMemo(
    () => ({
      expenses,
      addExpense,
      deleteExpense,
      updateExpense,
    }),
    [expenses, addExpense, deleteExpense, updateExpense]
  );

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
};

const useExpenses = () => {
  const context = React.useContext(ExpensesContext);

  if (!context) {
    throw new Error("useExpenses must be used withing an ExpensesProvider");
  }

  return context;
};

export { ExpensesProvider, useExpenses };
