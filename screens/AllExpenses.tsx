import { ExpensesOutput } from "../components/ExpensesOutput";
import { useExpenses } from "../hooks/useExpenses";
import { getDateMinusDays } from "../util/date";

const AllExpenses = () => {
  const { expenses } = useExpenses();

  return <ExpensesOutput expenses={expenses} periodName="Total" />;
};

export { AllExpenses };
