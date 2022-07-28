import makeGetServerSidePropsWithUser from "../utils/makeGetServerSidePropsWithUser";

function Protected() {
  return (
    <div className="margin-top">
      <h2>Protected route</h2>
    </div>
  );
}

export const getServerSideProps = makeGetServerSidePropsWithUser();

export default Protected;
