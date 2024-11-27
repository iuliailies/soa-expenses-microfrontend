import styled from "styled-components";
import ExpenseList from "./components/ExpenseList";
import LogoutButton from "./components/LogoutButton";
import WeeklyLimitEditor from "./components/WeeklyLimitEditor";

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
  </div>
  );
}

export default Root