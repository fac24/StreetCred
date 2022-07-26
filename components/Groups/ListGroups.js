import RandomKey from "../Hooks/RandomKey";

import { useRouter } from "next/router";
import supabase from "../../utils/supabaseClient";
import Link from "next/link";
supabase;

function ListGroups(props) {
  const router = useRouter();

  return (
    <div className="group-list-main">
      <h2>All groups</h2>
      <ul className="group-list-container">
        {props.groups.map((group) => {
          const href = `/groups/${group.id}`;
          return (
            <li
              key={RandomKey()}
              className="group-list-elem"
              /* onMouseDown={(event) => {
                event.preventDefault();
                router.push(`/groups/${group.id}`);
              }} */
            >
              <img src={group.avatar} className="list-group-avatar" />
              <h3>{group.name}</h3>
              <p>
                {group.location} {/* should be: Admin location XY miles away */}
              </p>
              <Link href={href}>
                <button>See Group</button>
              </Link>
              <div>
                <h4>Members</h4>
              </div>
              <div>
                <h4>Items</h4>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default ListGroups;
