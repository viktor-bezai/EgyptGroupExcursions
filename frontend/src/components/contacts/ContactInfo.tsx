import React from "react";
import {Box, Divider, IconButton, Paper, Typography} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import {Instagram} from "@mui/icons-material";
import {TikTokIcon} from "@/components/common/TikTokIcon";
import TelegramIcon from "@mui/icons-material/Telegram";
import {useTranslation} from "react-i18next";


const ContactInfo: React.FC = () => {
  const {t} = useTranslation("common");

  // Contact details
  const contactDetails = [
    {icon: <EmailIcon/>, text: "bezayanna@gmail.com"},
    {icon: <PhoneIcon/>, text: "+20 (127) 5816 675"},
  ];

  // Social links
  const socialLinks = [
    {
      icon: <Instagram/>,
      href: "https://www.instagram.com/anna_egypt_/",
    },
    {
      icon: <TikTokIcon/>,
      href: "https://www.tiktok.com/@assis_travel",
    },
    {
      icon: <TelegramIcon/>,
      href: "https://t.me/nino_nino_10",
    },
    {
      icon: <img src={"/icons/whatsapp.svg"} alt="Whatsupp" style={{width: 25, height: 25}}/>,
      href: "https://wa.me/201275816675",
    },
    {
      icon: <img src={"/icons/viber.svg"} alt="Viber" style={{width: 19, height: 19}}/>,
      href: "viber://chat?number=+201275816675",
    },
  ];

  return (
    <Paper elevation={3} sx={{padding: 3, mb: 4, maxWidth: 900}}>
      <Typography variant="h5" sx={{fontWeight: 500, mb: 2}}>
        {t("contact-information")}
      </Typography>
      <Divider sx={{mb: 2}}/>

      {/* Contact Details */}
      {contactDetails.map((detail, index) => (
        <Box
          key={index}
          sx={{display: "flex", alignItems: "center", gap: 1, mb: 1}}
        >
          {detail.icon}
          <Typography variant="body1">{detail.text}</Typography>
        </Box>
      ))}

      {/* Social Links */}
      <Box sx={{display: "flex", gap: 1, mt: 2}}>
        {socialLinks.map((link, index) => (
          <IconButton
            key={index}
            component="a"
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            sx={{
              color: "text.primary",
              "&:hover": {
                color: "secondary.main",
              },
            }}
          >
            {link.icon}
          </IconButton>
        ))}
      </Box>
    </Paper>
  );
};

export default ContactInfo;
