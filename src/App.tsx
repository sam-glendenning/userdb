import React from "react";
import "./App.css";
import { useAddUser, useUserList } from "./requests";
import RemoveUserbox from "./removeUserBox";
import AddUserBox from "./addUserBox";
import ViewUsersBox from "./viewUsersBox";

const App = (): React.ReactElement => {
  // After posting a user, we need to invalidate this query to refetch the latest list
  // of users to include the new one. However, this demo API only shows a set list so we don't
  // see the results

  return (
    <div className="App">
      <p>User Database!</p>
      <br />
      <ViewUsersBox />
      <AddUserBox />
      <RemoveUserbox />
    </div>
  );
};

export default App;
