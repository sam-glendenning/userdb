import React from "react";
import "./App.css";
import { useUserList } from "./requests";

const App = (): React.ReactElement => {
  const { data } = useUserList();

  return (
    <div className="App">
      <p>User Database!</p>
      {data && data.data.map((user) => <p>Email: {user.email}</p>)}
    </div>
  );
};

export default App;
