import React from "react";
import styled from "styled-components";
import useWebSocket from "../hooks/useWebSocket";

const NotificationsContainer = styled.div`
  margin: 20px 0;
  padding: 20px;
`;

const Notification = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: #fff;
`;

const NotificationText = styled.span`
  font-size: 14px;
  color: #333;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #666;
  transition: color 0.2s;

  &:hover {
    color: #333;
  }
`;

const NoNotificationsMessage = styled.div`
  text-align: center;
  font-size: 14px;
  color: #888;
  margin-top: 10px;
`;

const NotificationDisplay: React.FC = () => {
  const messages = useWebSocket(`${process.env.WS_URL}/ws`);
  const [notifications, setNotifications] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (messages.length > 0) {
      const newMessage = messages[messages.length - 1];
      setNotifications((prev) => [newMessage, ...prev]);
    }
  }, [messages]);

  const handleRemove = (index: number) => {
    setNotifications((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <NotificationsContainer>
      <h3>Notifications</h3>
      {notifications.length === 0 ? (
        <NoNotificationsMessage>No notifications at the moment</NoNotificationsMessage>
      ) : (
        notifications.map((message, index) => {
          let notificationText = "";
          try {
            const parsedMessage = JSON.parse(message);
            notificationText = `${parsedMessage.message} Current expenses: ${parsedMessage.current_expenses}`;
          } catch (e) {
            notificationText = message;
          }

          return (
            <Notification key={index}>
              <NotificationText>{notificationText}</NotificationText>
              <CloseButton onClick={() => handleRemove(index)}>×</CloseButton>
            </Notification>
          );
        })
      )}
    </NotificationsContainer>
  );
};

export default NotificationDisplay;
