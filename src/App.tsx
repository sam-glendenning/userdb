import React from "react";
import RemoveUserbox from "./removeUserBox";
import AddUserBox from "./addUserBox";
import { useUserList } from "./requests";

const App = (): React.ReactElement => {
  // After posting a user, we need to invalidate this query to refetch the latest list
  // of users to include the new one. However, this demo API only shows a set list so we don't
  // see the results
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useUserList();

  return (
    <div className="App">
      <p>User Database!</p>
      <br />
      <div>
        <p>
          Here are all the current users (this list from the API does not
          update):
        </p>
        <br />
        {usersLoading && <p>Loading users...</p>}
        {usersError && <p>Error fetching users!</p>}
        {users && (
          <table>
            <tbody>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
              {users.data.map((user, i) => (
                <tr key={i}>
                  <td>{user.id}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <AddUserBox />
      {!!users && users.data.length >= 1 && (
        <RemoveUserbox numberOfUsers={users.data.length} />
      )}
      <br />
    </div>
  );
};

export default App;
