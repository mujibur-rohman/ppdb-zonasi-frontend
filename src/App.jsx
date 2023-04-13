import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { MantineProvider } from "@mantine/core";
import Auth from "./pages/siswa/Auth";
import AuthAdmin from "./pages/admin/Auth";
import Home from "./pages/siswa/Home";
import Layouts from "./pages/siswa/components/Layouts";
import Pendaftar from "./pages/siswa/Pendaftar";
import LayoutAdmin from "./pages/admin/components/LayoutAdmin";
import { Toaster } from "react-hot-toast";
import AuthContext from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import PrivateRoute from "./routes/PrivateRoute";
import NotFound from "./pages/NotFound";
import Dashboard from "./pages/admin/Dashboard";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Toaster position="top-center" reverseOrder={false} />
      <BrowserRouter>
        <AuthContext>
          <Routes>
            {/* Private Siswa */}
            <Route path="/" element={<Layouts />}>
              <Route index element={<Home />} />
              <Route path="pendaftar" element={<Pendaftar />} />
            </Route>
            <Route path="/auth" element={<Auth />} />
            {/* Private Admin */}
            <Route element={<ProtectedRoute role={[0, 1]} />}>
              <Route path="/admin" element={<LayoutAdmin />}>
                <Route index element={<Dashboard />} />
              </Route>
            </Route>
            <Route element={<PrivateRoute />}>
              <Route path="/admin/auth" element={<AuthAdmin />} />
            </Route>

            {/* Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthContext>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
