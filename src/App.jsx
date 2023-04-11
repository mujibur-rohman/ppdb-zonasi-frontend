import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import Auth from "./pages/siswa/Auth";
import AuthAdmin from "./pages/admin/Auth";
import Home from "./pages/siswa/Home";
import Layouts from "./pages/siswa/components/Layouts";
import Pendaftar from "./pages/siswa/Pendaftar";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layouts />}>
            <Route index element={<Home />} />
            <Route path="pendaftar" element={<Pendaftar />} />
          </Route>
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
