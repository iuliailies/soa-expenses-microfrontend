import React, { useState } from 'react';
import styled from 'styled-components';
import useFetchExpenses from '../hooks/useFetchExpenses';
import useAddExpense from '../hooks/useAddExpense';
import { format } from 'date-fns';
import PhantomRow from './PhantomRow';

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

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
  display: block;
`;

const ExpenseList: React.FC = () => {
  const { expenses, loading, error } = useFetchExpenses();
  const { addExpense } = useAddExpense();
  const [isAdding, setIsAdding] = useState(false);

  const handleSave = async (category: string, amount: number) => {
    const newExpense = {
      category,
      amount,
      date: new Date().toISOString(),
    };
    const savedExpense = await addExpense(newExpense);
    if (savedExpense) {
      expenses.push(savedExpense); // Update the local expenses list
      setIsAdding(false);
    }
  };

  const handleDiscard = () => {
    setIsAdding(false);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Section>
      <Heading>Expenses</Heading>
      <Table>
        <thead>
          <tr>
            <TableHeader>#</TableHeader>
            <TableHeader>Category</TableHeader>
            <TableHeader>Amount</TableHeader>
            <TableHeader>Date</TableHeader>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense, index) => (
            <TableRow key={expense.id}>
              <TableCell>{expense.id}</TableCell>
              <TableCell>{expense.category}</TableCell>
              <TableCell>${expense.amount}</TableCell>
              <TableCell>{format(new Date(expense.date), 'MMMM dd, yyyy')}</TableCell>
            </TableRow>
          ))}
          {isAdding && (
            <PhantomRow onSave={handleSave} onDiscard={handleDiscard} />
          )}
        </tbody>
      </Table>
      {!isAdding && (
        <AddButton onClick={() => setIsAdding(true)}>+ Add Expense</AddButton>
      )}
    </Section>
  );
};

export default ExpenseList;
