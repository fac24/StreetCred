import { useRouter } from "next/router";
import UserDetails from "../../components/UserProfile/UserDetails";

function profileSettings(props) {
  console.log(props);
  const router = useRouter();
  return (
    <>
      <h1>Profile</h1>
      <img src={props.profile[0].avatar_url} />
      <h2>{props.profile[0].name}</h2>
      <p>{props.profile[0].points} points</p>
      <p>Location: {props.profile[0].location}</p>
    </>
  );
}

export default profileSettings;
