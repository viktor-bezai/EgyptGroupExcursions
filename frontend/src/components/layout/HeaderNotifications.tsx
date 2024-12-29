import {Badge, Box, IconButton, Menu, MenuItem, Typography} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import React from "react";
import {Notification} from "@/components/home/NotificationsPanel";
import {DescriptionRenderer} from "@/utils/textUtils";

interface HeaderNotificationsProps {
  notifications: Notification[];
  notificationsAnchor: HTMLElement | null
  handleNotificationsClick: (event: React.MouseEvent<HTMLElement>) => void;
  handleNotificationsClose: () => void;

}

const HeaderNotifications = (props: HeaderNotificationsProps) => {
  const {notifications, notificationsAnchor, handleNotificationsClick, handleNotificationsClose} = props
  return (
    <Box sx={{display: "flex", alignItems: "center", gap: 1, pr: 1}}>
      <IconButton color="inherit" onClick={handleNotificationsClick}>
        <Badge badgeContent={notifications.length} color="secondary">
          <NotificationsIcon/>
        </Badge>
      </IconButton>

      <Menu
        anchorEl={notificationsAnchor}
        open={Boolean(notificationsAnchor)}
        onClose={handleNotificationsClose}
        sx={{"& .MuiPaper-root": {width: "100%", maxHeight: 400, overflowY: "auto"}}}
      >
        {notifications.length > 0 ? (
          notifications.map((notification) => (
            <MenuItem key={notification.id} onClick={handleNotificationsClose}>
              <Box>
                <Typography variant="subtitle2" fontWeight="bold">
                  {notification.title}
                </Typography>
                <Typography
                  component="div"
                  variant="body2"
                  color="text.secondary"
                  sx={{
                    wordWrap: "break-word",
                    whiteSpace: "normal",
                  }}>
                  <DescriptionRenderer description={notification.description}/>
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {new Date(notification.created_at).toLocaleString()}
                </Typography>
              </Box>
            </MenuItem>
          ))
        ) : (
          <MenuItem onClick={handleNotificationsClose}>
            <Typography variant="body2" color="text.secondary">
              No notifications
            </Typography>
          </MenuItem>
        )}
      </Menu>
    </Box>
  )
}

export default HeaderNotifications;