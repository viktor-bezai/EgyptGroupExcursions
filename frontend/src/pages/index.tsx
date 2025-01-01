import {GetServerSideProps} from "next";
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const lang = context.locale || "ru";

  return {
    redirect: {
      destination: `/${lang}/tours`,
      permanent: true,
    },
  };
};

const HomeRedirect = () => {
  return (
    <>
      <Head>
        <title>Home | Mystical Egypt Travels</title>
        <meta name="description"
              content="Откройте для себя чудеса Египта с Mystical Egypt Travels. Уникальные туры и экскурсии для незабываемого путешествия."/>
        <meta name="keywords"
              content="Мистические туры по Египту, путешествия по Египту, экскурсии, туры к пирамидам, круизы по Нилу, достопримечательности Каира, Луксор и Асуан, сафари в пустыне, туры по Египту, исторические экскурсии"/>

      </Head>
    </>
  );
};

export default HomeRedirect;
