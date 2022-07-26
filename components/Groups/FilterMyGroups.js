import { useEffect, useState } from "react";
import Link from "next/link";

import RandomKey from "../Hooks/RandomKey";
import MembersAvatars from "./MembersAvatars";

import supabase from "../../utils/supabaseClient";

function FilterMyGroups(props) {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [adminedGroups, setAdminedGroups] = useState([]);

  const user = supabase.auth.user();
  const groups = props.groups;

  useEffect(() => {
    const filteredByAdmin = groups.filter((group) => group.admin === user.id);
    const filteredByJoinedGroups = [];

    groups.map((group) => {
      const membersArray = group.members;
      if (membersArray.includes(user.id)) {
        filteredByJoinedGroups.push(group);
      }
    });

    setAdminedGroups(filteredByAdmin);
    setJoinedGroups(filteredByJoinedGroups);
  }, []);

  return (
    <section className="group-list-main">
      <div>
        <h2 className="group-list-title">My groups</h2>
        <ul className="group-list-container">
          {adminedGroups.map((group) => {
            const href = `/groups/${group.id}`;
            return (
              <li key={RandomKey()} className="group-list-elem">
                <div className="group-card-header">
                  <img src={group.avatar} className="list-group-avatar" />
                  <div className="group-card-header-title">
                    <h3 className="group-name-title">{group.name}</h3>
                    <p className="group-title-location">
                      {group.location}
                      {/* should be: Admin location XY miles away */}
                    </p>
                    <div className="group-card-header-members">
                      <div>
                        <h4>Members</h4>
                        <MembersAvatars members={group.members} />
                      </div>
                      <Link href={href}>
                        <button className="open-group-button">See Group</button>
                      </Link>
                    </div>
                  </div>
                </div>
                <div>
                  <h4>Items</h4>
                </div>
              </li>
            );
          })}
        </ul>
      </div>

      <div>
        <h2 className="group-list-title">Member of groups</h2>
        <ul className="group-list-container">
          {joinedGroups.map((group) => {
            const href = `/groups/${group.id}`;
            return (
              <li key={RandomKey()} className="group-list-elem">
                <div className="group-card-header">
                  <img src={group.avatar} className="list-group-avatar" />
                  <div className="group-card-header-title">
                    <h3 className="group-name-title">{group.name}</h3>
                    <p className="group-title-location">
                      {group.location}{" "}
                      {/* should be: Admin location XY miles away */}
                    </p>
                    <div className="group-card-header-members">
                      <div>
                        <h4>Members</h4>
                      </div>
                      <Link href={href}>
                        <button className="open-group-button">See Group</button>
                      </Link>
                    </div>
                  </div>
                </div>

                <div>
                  <h4>Items</h4>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default FilterMyGroups;
