import { useEffect, useState } from "react";
import Link from "next/link";

import RandomKey from "../Hooks/RandomKey";
import MembersAvatars from "./MembersAvatars";
import GroupItems from "./GroupItems";
import { useAuthContext } from "../../context/auth";
import supabase from "../../utils/supabaseClient";

function FilterMyGroups(props) {
  const [joinedGroups, setJoinedGroups] = useState([]);
  const [adminedGroups, setAdminedGroups] = useState([]);
  const { user } = useAuthContext();

  const groups = props.groups;

  useEffect(() => {
    const filteredByAdmin = groups.filter(
      (group) => group.admin === props.userId
    );
    const filteredByJoinedGroups = [];

    groups.map((group) => {
      const membersArray = group.members;
      if (membersArray.includes(props.userId)) {
        filteredByJoinedGroups.push(group);
      }
    });

    setAdminedGroups(filteredByAdmin);
    setJoinedGroups(filteredByJoinedGroups);
  }, []);

  if (user) {
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
                          <MembersAvatars members={group.members} />
                        </div>
                        <Link href={href}>
                          <button className="open-group-button">
                            See Group
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                  <div className="group-list-products-container">
                    <h4>Items</h4>
                    <GroupItems id={group.id} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="members-of-groups-div">
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
                        {group.location ? group.location : "No location set"}
                        {/* should be: Admin location XY miles away */}
                      </p>
                      <div className="group-card-header-members">
                        <div>
                          <MembersAvatars members={group.members} />
                        </div>
                        <Link href={href}>
                          <button className="open-group-button">
                            See Group
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="group-list-products-container">
                    <h4>Items</h4>
                    <GroupItems id={group.id} />
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    );
  }
  return <div>Loading...</div>;
}

export default FilterMyGroups;
