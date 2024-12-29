import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      destination: "/tours",
      permanent: true,
    },
  };
};

const HomeRedirect = () => {
  return null;
};

export default HomeRedirect;
