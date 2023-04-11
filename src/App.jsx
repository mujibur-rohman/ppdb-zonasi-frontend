import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import Auth from "./pages/siswa/Auth";
import AuthAdmin from "./pages/admin/Auth";
import Home from "./pages/siswa/Home";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin">
            <Route path="auth" element={<AuthAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
