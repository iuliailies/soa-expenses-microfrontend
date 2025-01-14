import styled from "styled-components";
import ExpenseList from "./components/ExpenseList";
import LogoutButton from "./components/LogoutButton";
import WeeklyLimitEditor from "./components/WeeklyLimitEditor";
import NotificationDisplay from "./components/NotificationDisplay";

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin: 20px;
`;

const Root: React.FC = () => {
  return (
    <div>
      <Header>
        <WeeklyLimitEditor/>
        <LogoutButton/>
      </Header>
      <ExpenseList />
      <NotificationDisplay/>
  </div>
  );
}

export default Root