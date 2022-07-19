import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
supabase;

function ListGroups(props) {
  const router = useRouter();

  /*   function redirectToPage(event) {
    event.preventDefault();
    router.push(`/groups/${id}`);
    console.log(event);
  } */

  return (
    <div>
      <ul>
        {props.groups.map((group) => {
          return (
            <li
              key={group.id}
              onMouseDown={(event) => {
                event.preventDefault();
                router.push(`/groups/${group.id}`);
              }}
            >
              <p>{group.name}</p>
              <img src={group.avatar} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListGroups;
