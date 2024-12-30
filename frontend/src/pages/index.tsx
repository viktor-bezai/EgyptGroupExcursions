import {GetServerSideProps} from "next";
import Head from 'next/head';

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/tours",
      permanent: true,
    },
  };
};

const HomeRedirect = () => {
  return (
    <>
      <Head>
        <title>Home | Mystical Egypt Travels</title>
        <meta name="description" content="Explore the wonders of Egypt with Mystical Egypt Travels. Discover the best excursions and tours, from iconic landmarks to hidden gems, for an unforgettable adventure in Egypt."/>
        <meta name="keywords" content="Egypt tours, Egypt travel, Egypt excursions, pyramids tour, Nile cruise, Cairo attractions, Luxor and Aswan tours, desert safari, Egypt travel packages, historical Egypt tours"/>
      </Head>
    </>
  );
};

export default HomeRedirect;
