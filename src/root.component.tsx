import ExpenseList from "./components/ExpenseList";
import WeeklyLimitEditor from "./components/WeeklyLimitEditor";

const Root: React.FC = () => {
  return (
    <div>
      {/* TODO: get user current limit from API */}
      <WeeklyLimitEditor initialLimit={500}/>
      <ExpenseList />
  </div>
  );
}

export default Root