import React, { useRef } from "react";
import styled from "styled-components";
import { format } from "date-fns";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faSave } from "@fortawesome/free-solid-svg-icons";

const TableRow = styled.tr`
    position: relative;
`;

const TableCell = styled.td`
    padding: 10px;
    border-bottom: 1px solid #ddd;
    vertical-align: middle; /* Ensures content aligns vertically */
`;

const IconButtons = styled.div`
    position: absolute;
    top: 50%; /* Center vertically within the row */
    right: 10px; /* Offset from the right edge */
    transform: translateY(-50%); /* Align to vertical center */
    display: flex;
    gap: 10px; /* Space between icons */
`;

const IconButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    color: #555;
    font-size: 16px; /* Adjust icon size */
    display: flex;
    align-items: center;
    justify-content: center;
    transition: color 0.3s;

    &:hover {
        color: #007bff; /* Highlight color on hover */
    }
`;

const EditableCell = styled(TableCell)`
    cursor: pointer;
    border: 1px dashed #ccc;
    transition: background-color 0.3s, border 0.3s;

    &:hover {
        background-color: #f9f9f9;
    }

    &[contenteditable="true"]:focus {
        background-color: #ffffff;
        border: 1px solid #007bff;
        outline: none;
        padding: 8px;
    }
`;

interface PhantomRowProps {
  onSave: (category: string, amount: number) => void;
  onDiscard: () => void;
}

const PhantomRow: React.FC<PhantomRowProps> = ({ onSave, onDiscard }) => {
  const categoryRef = useRef<HTMLTableCellElement>(null);
  const amountRef = useRef<HTMLTableCellElement>(null);

  const handleSave = () => {
    const category = categoryRef.current?.innerText.trim();
    const amount = parseFloat(amountRef.current?.innerText || "0");
    if (!amount || amount <= 0 || !category) {
      alert("Please fill in all fields correctly!");
      return;
    }
    onSave(category, amount);
  };

  return (
    <TableRow>
        <TableCell>#</TableCell>
        <EditableCell
            contentEditable
            suppressContentEditableWarning
            ref={categoryRef}
            title="Click to edit"
        >
            {/* Placeholder text */}
        </EditableCell>
        <EditableCell
            contentEditable
            suppressContentEditableWarning
            ref={amountRef}
            title="Click to edit"
        >
            {/* Placeholder text */}
        </EditableCell>
        <TableCell>{format(new Date(), "MMMM dd, yyyy")}</TableCell>
        <IconButtons>
            <IconButton onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} />
            </IconButton>
            <IconButton onClick={onDiscard}>
            <FontAwesomeIcon icon={faTrash} />
            </IconButton>
        </IconButtons>
    </TableRow>
  );
};

export default PhantomRow;
