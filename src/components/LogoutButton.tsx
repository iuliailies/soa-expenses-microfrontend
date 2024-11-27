import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import useLogout from "../hooks/useLogout";

const Button = styled.button`
  background-color: #dc3545; /* Red color */
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  height: 40px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #b52d3b;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px rgba(220, 53, 69, 0.5);
  }

  svg {
    margin-right: 8px;
    font-size: 18px;
  }
`;

const LogoutButton: React.FC = () => {
  const { logout } = useLogout();

  return (
    <Button onClick={logout}>
      <FontAwesomeIcon icon={faSignOutAlt} />
      Logout
    </Button>
  );
};

export default LogoutButton;
