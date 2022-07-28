import { getUser } from "../context/auth";
import supabase from "./supabaseClient";

const CREATE_PROFILE_ROUTE = "/create-profile";
const GROUPS_ROUTE = "/groups";

const makeGetServerSidePropsWithUser = (getServerSideProps) => async (args) => {
  const { req, resolvedUrl } = args;
  const isCreateProfile = resolvedUrl.startsWith(CREATE_PROFILE_ROUTE);
  /* check to see if a user is set */
  const { user: cookieUser } = await supabase.auth.api.getUserByCookie(req);
  const user = (cookieUser?.id && (await getUser(cookieUser.id))) ?? null;

  if (!user) {
    return {
      props: {},
      redirect: { destination: `/login?redirectTo=${resolvedUrl}` },
    };
  }

  if (user && !user.created && !isCreateProfile) {
    return {
      props: {},
      redirect: {
        destination: `${CREATE_PROFILE_ROUTE}?redirectTo=${resolvedUrl}`,
      },
    };
  }
  if (user && user.created && isCreateProfile) {
    return { props: {}, redirect: { destination: GROUPS_ROUTE } };
  }

  const res = (await getServerSideProps?.(user, args)) ?? {};

  /* if a user is set, pass it to the page via props */
  return { ...res, props: { ...res.props, user } };
};

export default makeGetServerSidePropsWithUser;
