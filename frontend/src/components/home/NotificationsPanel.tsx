import React from "react";
import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {DescriptionRenderer} from "@/pages/tours/[id]";

export interface Notification {
  id: number;
  title: string;
  description: string;
  created_at: string;
}

interface NotificationsPanelProps {
  notifications: Notification[];
}

const NotificationsPanel: React.FC<NotificationsPanelProps> = ({notifications}) => {
  const {t} = useTranslation("common");

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        border: "1px solid rgba(0, 0, 0, 0.1)", // Optional border
        borderRadius: 2,
        padding: 1,
        backgroundColor: "background.paper",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h6"
        sx={{marginBottom: 2, textAlign: "center"}}
      >
        {t("notifications")}
      </Typography>
      {notifications.length > 0 ? (
        notifications.map((notification) => (
          <Box
            key={notification.id}
            sx={{
              marginBottom: 2,
              padding: 1,
              borderRadius: 1,
              backgroundColor: "background.default",
              boxShadow: 1,
            }}
          >
            <Typography
              variant="subtitle2"
              sx={{marginBottom: 1}}
            >
              {notification.title}
            </Typography>
            <Typography component="div" variant="body2" color="text.secondary">
              <DescriptionRenderer description={notification.description}/>
            </Typography>
            <Typography
              variant="caption"
              color="text.secondary"
              sx={{display: "block", marginTop: 1}}
            >
              {new Date(notification.created_at).toLocaleString()}
            </Typography>
          </Box>
        ))
      ) : (
        <Typography variant="body2" color="text.secondary" textAlign="center">
          {t("no-notifications")}
        </Typography>
      )}
    </Box>
  );
};

export default NotificationsPanel;
