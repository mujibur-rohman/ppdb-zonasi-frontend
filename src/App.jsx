import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import Auth from "./pages/siswa/Auth";
import AuthAdmin from "./pages/admin/Auth";
import Home from "./pages/siswa/Home";
import Layouts from "./pages/siswa/components/Layouts";
import Pendaftar from "./pages/siswa/Pendaftar";
import HomeAdmin from "./pages/admin/HomeAdmin";
import LayoutAdmin from "./pages/admin/components/LayoutAdmin";

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
          <Route path="/admin" element={<LayoutAdmin />}>
            <Route index element={<HomeAdmin />} />
            <Route path="auth" element={<AuthAdmin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
