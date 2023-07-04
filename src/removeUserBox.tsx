import React from "react";
import { useRemoveUser } from "./requests";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@mui/material";

const RemoveUserbox = ({
  numberOfUsers,
}: {
  numberOfUsers: number;
}): React.ReactElement => {
  const queryClient = useQueryClient();

  const [dialogueOpen, setDialogueOpen] = React.useState<boolean>(false);

  const [removeIndex, setRemoveIndex] = React.useState<number>(1);

  const {
    data: removeUserResponse,
    mutate: removeUser,
    isLoading: removeUserLoading,
    isError: removeUserError,
    isSuccess: removeUserSuccess,
  } = useRemoveUser();

  React.useEffect(() => {
    if (!removeUserLoading && removeUserSuccess) {
      queryClient.invalidateQueries(["users"]);
    }
  }, [queryClient, removeUserLoading, removeUserSuccess]);

  const handleRemoveIndexChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setRemoveIndex(parseInt(e.target.value));
  };

  const handleSubmitRemoveUser = (e: React.BaseSyntheticEvent): void => {
    e.preventDefault();
    removeUser({ index: removeIndex });
  };

  return (
    <div>
      {!dialogueOpen && (
        <Button onClick={() => setDialogueOpen(true)}>Remove User</Button>
      )}
      {dialogueOpen && (
        <div>
          <p>Enter the number of the user you'd like to remove</p>
          <form onSubmit={handleSubmitRemoveUser}>
            <input
              type="number"
              name="removeIndex"
              min={1}
              max={numberOfUsers}
              onChange={handleRemoveIndexChange}
              value={removeIndex}
            />
            <br />
            <Button type="submit" onClick={handleSubmitRemoveUser}>
              Remove
            </Button>
          </form>
          {removeUserLoading && <p>Submitting...</p>}
          {removeUserError && <p>Error submitting form!</p>}
          {removeUserResponse && <p>Success!</p>}
        </div>
      )}
    </div>
  );
};

export default RemoveUserbox;
