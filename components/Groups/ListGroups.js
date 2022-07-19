import Image from "next/image";
import supabase from "../../utils/supabaseClient";
supabase;

function ListGroups(props) {
  return (
    <div>
      <ul>
        {props.groups.map((group) => {
          return (
            <li key={group.id}>
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
