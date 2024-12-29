import { useEffect } from "react";
import { fetchNotificationsData } from "@/utils/api";
import { useNotifications } from "@/context/NotificationsContext";

export const useFetchNotifications = (lang: string) => {
  const { setNotifications } = useNotifications();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { notifications } = await fetchNotificationsData(lang);
        setNotifications(notifications);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };

    fetchData();
  }, [lang, setNotifications]);
};
