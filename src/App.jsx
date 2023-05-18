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
import PrivateRouteSiswa from "./routes/PrivateRouteSiswa";
import SecretRoute from "./routes/SecretRoute";
import SchoolSetting from "./pages/admin/SchoolSetting/SchoolSetting";
import EmailVerification from "./pages/siswa/EmailVerification";
import EmailVerifyRoute from "./routes/EmailVerifyRoute";
import HasVerified from "./pages/siswa/HasVerified";
import FormPendaftaran from "./pages/siswa/FormPendaftaran/FormPendaftaran";
import FormBerkas from "./pages/siswa/FormPendaftaran/FormBerkas";
import FormPendaftaranEdit from "./pages/siswa/FormPendaftaran/FormPendaftaranEdit";
import FormBerkasEdit from "./pages/siswa/FormPendaftaran/FormBerkasiEdit";
import DetailPendaftaran from "./pages/siswa/DetailPendaftaran";
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
                  <Route path="pendaftaran" element={<Pendaftar />} />
                  <Route path="form-register" element={<FormPendaftaran />} />
                  <Route
                    path="form-register-edited"
                    element={<FormPendaftaranEdit />}
                  />
                  <Route path="form-register/berkas" element={<FormBerkas />} />
                  <Route
                    path="form-register/berkas-edit"
                    element={<FormBerkasEdit />}
                  />
                  <Route
                    path="pendaftaran/:id"
                    element={<DetailPendaftaran />}
                  />
                </Route>
              </Route>
              <Route element={<PrivateRouteSiswa />}>
                <Route path="/auth" element={<Auth />} />
              </Route>

              {/* Email Verification */}
              <Route path="/verify-email/:id" element={<EmailVerifyRoute />}>
                <Route index element={<EmailVerification />} />
              </Route>
              {/* Has Verified */}
              <Route path="/verified/:id" element={<HasVerified />} />
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
              <Route element={<SecretRoute role={[0]} />}>
                <Route
                  path="/admin/school-setting"
                  element={<SchoolSetting />}
                />
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
