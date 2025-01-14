import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import useFetchExpenses from '../hooks/useFetchExpenses';
import useAddExpense from '../hooks/useAddExpense';
import useDeleteExpense from '../hooks/useDeleteExpense';
import { format } from 'date-fns';
import PhantomRow from './PhantomRow';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

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

const TableRow = styled.tr`
  position: relative;
  &:hover .delete-icon {
    visibility: visible;
  }
`;

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
  display: flex;
  align-items: center;
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2d5d91;
  }

  svg {
    margin-right: 8px;
    font-size: 18px;
  }
`;

const DeleteIcon = styled(FontAwesomeIcon)`
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  cursor: pointer;
  visibility: hidden;
  color: red;
  font-size: 18px;
  transition: color 0.3s ease;

  &:hover {
    color: darkred;
  }
`;

const ExpenseList: React.FC = () => {
  const { fetchExpenses } = useFetchExpenses();
  const { addExpense } = useAddExpense();
  const { deleteExpense } = useDeleteExpense();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    const loadExpenses = async () => {
      try {
        setLoading(true);
        const data = await fetchExpenses();
        setExpenses(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Failed to load expenses');
      } finally {
        setLoading(false);
      }
    };

    loadExpenses();
  }, []);

  const handleSave = async (category: string, amount: number) => {
    try {
      const newExpense = {
        category,
        amount,
        date: new Date().toISOString(),
      };
      const savedExpense = await addExpense(newExpense);
      setExpenses((prevExpenses) => [...prevExpenses, savedExpense]);
      setIsAdding(false);
    } catch (err) {
      console.error('Error adding expense:', err);
    }
  };

  const handleDiscard = () => {
    setIsAdding(false);
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this expense?');
    if (!confirmDelete) return;

    try {
      await deleteExpense(id);
      setExpenses((prevExpenses) =>
        prevExpenses.filter((expense) => expense.id !== id)
      );
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
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
              <DeleteIcon
                className="delete-icon"
                icon={faTrash}
                onClick={() => handleDelete(expense.id)}
              />
            </TableRow>
          ))}
          {isAdding && (
            <PhantomRow onSave={handleSave} onDiscard={handleDiscard} />
          )}
        </tbody>
      </Table>
      {!isAdding && (
        <AddButton onClick={() => setIsAdding(true)}>
          <FontAwesomeIcon icon={faPlus} />
          Add Expense
        </AddButton>
      )}
    </Section>
  );
};

export default ExpenseList;
