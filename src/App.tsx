import React from "react";
import "./App.css";
import { useAddUser, useUserList } from "./requests";
import { useQueryClient } from "@tanstack/react-query";

const App = (): React.ReactElement => {
  // After posting a user, we need to invalidate this query to refetch the latest list
  // of users to include the new one. However, this demo API only shows a set list so we don't
  // see the results
  const {
    data: users,
    isLoading: usersLoading,
    isError: usersError,
  } = useUserList();

  const queryClient = useQueryClient();

  const [name, setName] = React.useState<string>("");
  const [job, setJob] = React.useState<string>("");

  const {
    data: addUserResponse,
    mutate,
    isLoading: addUserLoading,
    isError: addUserError,
    isSuccess: addUserSuccess,
  } = useAddUser();

  React.useEffect(() => {
    if (!addUserLoading && addUserSuccess) {
      queryClient.invalidateQueries(["users"]);
    }
  }, [addUserLoading, addUserSuccess, queryClient]);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setName(e.target.value);
  };

  const handleJobChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setJob(e.target.value);
  };

  const handleSubmit = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    mutate({ name, job });
  };

  return (
    <div className="App">
      <p>User Database!</p>
      {usersLoading && <p>Loading users...</p>}
      {usersError && <p>Error fetching users!</p>}
      {users && users.data.map((user) => <p>Email: {user.email}</p>)}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={handleNameChange}
          value={name}
        />
        <input type="text" name="job" onChange={handleJobChange} value={job} />
        <input type="submit" value="Submit" />
      </form>
      {addUserLoading && <p>Submitting...</p>}
      {addUserError && <p>Error submitting form!</p>}
      {addUserResponse && addUserResponse.name}
    </div>
  );
};

export default App;
