import { ExpensesOutput } from "../components/ExpensesOutput";
import { useExpenses } from "../hooks/useExpenses";
import { getDateMinusDays } from "../util/date";

const RecentExpenses = () => {
  const { expenses } = useExpenses();

  const recentExpenses = expenses.filter(({ date }) => {
    const today = new Date();
    const date7daysAgo = getDateMinusDays(today, 7);

    return date > date7daysAgo;
  });

  return <ExpensesOutput expenses={recentExpenses} periodName="Last 7 Days" />;
};

export { RecentExpenses };
