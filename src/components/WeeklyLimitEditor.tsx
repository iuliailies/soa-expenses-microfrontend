import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSave, faTimes } from "@fortawesome/free-solid-svg-icons";
import useUpdateWeeklyLimit from "../hooks/useUpdateWeeklyLimit";
import useGetWeeklyLimit from "../hooks/useGetWeeklyLimit";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const Label = styled.span`
  font-size: 16px;
  font-weight: bold;
  margin-right: 10px;
`;

const EditableField = styled.div<{ highlight: boolean }>`
  font-size: 16px;
  padding: 5px 10px;
  border: 1px dashed transparent;
  transition: border 0.3s, background-color 0.3s;
  cursor: pointer;
  min-width: 100px;

  &:hover {
    border: 1px dashed #ccc;
    background-color: #f9f9f9;
  }

  &[contenteditable="true"]:focus {
    border: 1px solid #007bff;
    background-color: white;
    outline: none;
    margin: -1px; /* Adjust for border width */
  }

  ${(props) =>
    props.highlight &&
    `
      animation: flashGreen 2s ease-in-out;
      @keyframes flashGreen {
        from {
          background-color: #d4edda; /* Light green */
        }
        to {
          background-color: transparent;
        }
      }
    `}
`;

const IconContainer = styled.div`
  display: flex;
  gap: 10px;
`;

const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: #555;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.3s;

  &:hover {
    color: #007bff;
  }
`;

const WeeklyLimitEditor: React.FC = () => {
  const { weeklyLimit, loading, error } = useGetWeeklyLimit();
  const { updateWeeklyLimit, error: updateError } = useUpdateWeeklyLimit();

  const [isEditing, setIsEditing] = useState(false);
  const [currentLimit, setCurrentLimit] = useState<number | null>(null);
  const [highlight, setHighlight] = useState<boolean>(false);
  const limitRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setCurrentLimit(weeklyLimit || 0);
  }, [weeklyLimit]);

  const handleSave = async () => {
    if (!limitRef.current) return;

    const newLimit = Number(limitRef.current.innerText)
      ? parseInt(limitRef.current.innerText, 10)
      : 0;
    if (isNaN(newLimit) || newLimit <= 0) {
      alert("Please enter a valid limit!");
      return;
    }

    try {
      await updateWeeklyLimit(newLimit);
      setCurrentLimit(newLimit);

      // Flash green highlight
      setHighlight(true);
      setTimeout(() => setHighlight(false), 2000);

      setIsEditing(false);
    } catch (err) {
      alert(updateError || "Failed to update the weekly limit. Please try again.");
    }
  };

  const handleDiscard = () => {
    if (limitRef.current && currentLimit !== null) {
      limitRef.current.innerText = currentLimit.toString();
    }
    setIsEditing(false);
  };

  const handleFocus = () => {
    setIsEditing(true);
  };

  if (loading) return <p>Loading weekly limit...</p>;
  if (error) return <p>{error}</p>;

  return (
    <Container>
      <Label>Weekly Limit:</Label>
      <EditableField
        contentEditable
        suppressContentEditableWarning
        ref={limitRef}
        onFocus={handleFocus}
        highlight={highlight}
      >
        {currentLimit}
      </EditableField>
      {isEditing && (
        <IconContainer>
          <IconButton onClick={handleSave}>
            <FontAwesomeIcon icon={faSave} />
          </IconButton>
          <IconButton onClick={handleDiscard}>
            <FontAwesomeIcon icon={faTimes} />
          </IconButton>
        </IconContainer>
      )}
    </Container>
  );
};

export default WeeklyLimitEditor;
