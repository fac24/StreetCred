function UserDetails(props) {
  console.log(props);
  const router = useRouter();
  const user = props.profile.id;
  console.log(user);

  //   if (router.isFallback) {
  //     return <div>Loading...</div>;
  //   }

  //   router.push(`/profiles/profile-settings${user}`);

  return <></>;
}

export default UserDetails;
