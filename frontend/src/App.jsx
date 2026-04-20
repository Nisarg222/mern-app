import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/AppLayout";
import Users from "./pages/Users";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Users />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
