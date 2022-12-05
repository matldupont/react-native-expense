import axios from "axios";

import { BACKEND_URL } from "@env";
import { Expense } from "../types";

console.log("LOAD", BACKEND_URL);

export async function storeExpense(expenseData: Omit<Expense, "id">) {
  const {
    data: { name: id },
  } = await axios.post(`${BACKEND_URL}/expenses.json`, expenseData);

  return { id, ...expenseData } as Expense;
}

export async function fetchExpenses() {
  const { data } = await axios.get(`${BACKEND_URL}/expenses.json`);

  const expenses: Expense[] = Object.keys(data).map((expenseId) => ({
    id: expenseId,
    amount: +data[expenseId].amount,
    date: new Date(data[expenseId].date),
    description: data[expenseId].description,
  }));

  return expenses;
}

export async function updateExpense(
  id: string,
  expenseData: Omit<Expense, "id">
) {
  return axios.put(`${BACKEND_URL}/expenses/${id}.json`, expenseData);
}

export async function deleteExpense(id: string) {
  return axios.delete(`${BACKEND_URL}/expenses/${id}.json`);
}
