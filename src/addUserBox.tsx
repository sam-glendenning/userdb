import React from "react";
import { useAddUser } from "./requests";
import { Button } from "@mui/material";

const AddUserBox = (): React.ReactElement => {
  const [dialogueOpen, setDialogueOpen] = React.useState<boolean>(false);

  const [addName, setAddName] = React.useState<string>("");
  const [addJob, setAddJob] = React.useState<string>("");

  const {
    data: addUserResponse,
    mutate: addUser,
    isLoading: addUserLoading,
    isError: addUserError,
    isSuccess: addUserSuccess,
  } = useAddUser();

  const handleAddNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setAddName(e.target.value);
  };

  const handleAddJobChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setAddJob(e.target.value);
  };

  const handleSubmitAddUser = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    addUser({ name: addName, job: addJob });
  };

  return (
    <div>
      {!dialogueOpen && (
        <Button onClick={() => setDialogueOpen(true)}>Add User</Button>
      )}
      {dialogueOpen && (
        <div>
          <p>Enter details of the user you'd like to add</p>
          <form onSubmit={handleSubmitAddUser}>
            <label>Name</label>
            <input
              type="text"
              name="name"
              onChange={handleAddNameChange}
              value={addName}
            />
            <br />
            <label>Job</label>
            <input
              type="text"
              name="job"
              onChange={handleAddJobChange}
              value={addJob}
            />
            <br />
            <Button type="submit" onClick={handleSubmitAddUser}>
              Add
            </Button>
          </form>
          {addUserLoading && <p>Submitting...</p>}
          {addUserError && <p>Error submitting form!</p>}
          {addUserSuccess && <p>Successfully added user!</p>}
          {addUserResponse && addUserResponse.name}
        </div>
      )}
    </div>
  );
};

export default AddUserBox;
