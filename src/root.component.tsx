import styled from "styled-components";
import { Expense } from "./types/expense";

// Styled components
const Section = styled.section`
  padding: 20px;
`;

const Heading = styled.h2`
  margin-bottom: 20px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr``;

const TableHeader = styled.th`
  border-bottom: 1px solid #ddd;
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export default function Root(props) {
  // dummy expenses array, will be replaced with data from an http call
  const expenses: Expense[] = [
    {
      description: "Expense 1",
      amount: 200,
      date: "10/10/2024",
    },
    {
      description: "Expense 2",
      amount: 300,
      date: "10/11/2024",
    },
  ];

  return (
    <Section>
      <Heading>Rewards</Heading>
      <Table>
        <thead>
          <tr>
            <TableHeader>#</TableHeader>
            <TableHeader>Description</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Date</TableHeader>
          </tr>
        </thead>
        <tbody>
          {expenses.map((reward, index) => (
            <TableRow key={index}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{reward.description}</TableCell>
              <TableCell>${reward.amount}</TableCell>
              <TableCell>{reward.date}</TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
    </Section>
  );
}
