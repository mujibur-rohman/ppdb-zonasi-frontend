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
import Users from "./pages/admin/Users/Users";
import { ModalsProvider } from "@mantine/modals";
import Jurusan from "./pages/admin/Jurusan/Jurusan";
import PeriodePendaftaran from "./pages/admin/PeriodePendaftaran/PeriodePendaftaran";
import AddPages from "./pages/admin/PeriodePendaftaran/pages/AddPages";
import EditPages from "./pages/admin/PeriodePendaftaran/pages/EditPages";
import ProtectedRouteSiswa from "./routes/ProtectedRouteSiswa";

function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <ModalsProvider>
        <Toaster position="bottom-right" reverseOrder={false} />
        <BrowserRouter>
          <AuthContext>
            <Routes>
              {/* Private Siswa */}
              <Route element={<ProtectedRouteSiswa role={[2]} />}>
                <Route path="/" element={<Layouts />}>
                  <Route index element={<Home />} />
                  <Route path="pendaftar" element={<Pendaftar />} />
                </Route>
              </Route>
              <Route path="/auth" element={<Auth />} />
              {/* Private Admin */}
              <Route element={<ProtectedRoute role={[0, 1]} />}>
                <Route path="/admin" element={<LayoutAdmin />}>
                  <Route index element={<Dashboard />} />
                  <Route path="users" element={<Users />} />
                  <Route path="jurusan" element={<Jurusan />} />
                  <Route path="periode-pendaftaran">
                    <Route index element={<PeriodePendaftaran />} />
                    <Route path="add" element={<AddPages />} />
                    <Route path=":id/edit" element={<EditPages />} />
                  </Route>
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
      </ModalsProvider>
    </MantineProvider>
  );
}

export default App;
