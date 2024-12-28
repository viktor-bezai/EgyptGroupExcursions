import React, {createContext, useContext, useState, ReactNode} from "react";
import {Notification} from "@/components/home/NotificationsPanel";

interface NotificationsContextProps {
  notifications: Notification[];
  setNotifications: (notifications: Notification[]) => void;
}

const NotificationsContext = createContext<NotificationsContextProps | undefined>(undefined);

export const NotificationsProvider: React.FC<{children: ReactNode}> = ({children}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  return (
    <NotificationsContext.Provider value={{notifications, setNotifications}}>
      {children}
    </NotificationsContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationsContext);
  if (!context) {
    throw new Error("useNotifications must be used within a NotificationsProvider");
  }
  return context;
};
