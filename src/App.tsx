import { Link, Outlet } from "react-router-dom";

function App() {
  return (
    <>
      <nav>
        <Link to="sessions/new">New</Link>
        <Link to="sessions">History</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default App;
