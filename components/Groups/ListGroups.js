import RandomKey from "../Hooks/RandomKey";

import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
supabase;

function ListGroups(props) {
  const router = useRouter();

  return (
    <div>
      <ul>
        {props.groups.map((group) => {
          return (
            <li
              key={RandomKey()}
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
