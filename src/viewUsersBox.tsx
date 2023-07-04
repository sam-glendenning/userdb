import React from "react";
import { useUserList } from "./requests";

const ViewUsersBox = (): React.ReactElement => {
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useUserList();

  return (
    <div>
      <p>Here are all the current users:</p>
      <br />
      {usersLoading && <p>Loading users...</p>}
      {usersError && <p>Error fetching users!</p>}
      {users &&
        users.data.map((user, i) => (
          <p>
            {i + 1}. {user.email}
          </p>
        ))}
    </div>
  );
};

export default ViewUsersBox;
