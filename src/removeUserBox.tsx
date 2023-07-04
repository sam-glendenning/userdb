import React from "react";
import { useRemoveUser } from "./requests";
import { useQueryClient } from "@tanstack/react-query";

const RemoveUserbox = (): React.ReactElement => {
  const queryClient = useQueryClient();

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
      <p>Enter the index of the user you'd like to remove:</p>
      <form onSubmit={handleSubmitRemoveUser}>
        <input
          type="number"
          name="removeIndex"
          onChange={handleRemoveIndexChange}
          value={removeIndex}
        />
        <input type="submit" value="Submit" />
      </form>
      {removeUserLoading && <p>Submitting...</p>}
      {removeUserError && <p>Error submitting form!</p>}
      {removeUserResponse && <p>Success!</p>}
    </div>
  );
};

export default RemoveUserbox;
