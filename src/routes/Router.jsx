import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./ROUTES";
import LoginPage from "../pages/LoginPage/LoginPage";
import RegisterPage from "../pages/RegisterPage/RegisterPage";
import NotFoundPage from "../pages/NotFoundPage";
import AboutUsPage from "./../pages/AboutUsPage";
import CRMPage from "../pages/CRM/CRMPage";
import EditCardPage from "../pages/EditCard/EditCardPage";
import AuthGuard from "../guard/AuthGuard";
import ProfilePage from "../pages/Profile/ProfilePage";
import CreateCardPage from "../pages/CreateCard/CreateCard";
import BizGuard from "../guard/BizGuard";
import AdminGuard from "../guard/AdminGuard";
import FavCards from "../pages/FavCards/FavCards";
import MyCards from "../pages/MyCards/MyCards";
import CardDetails from "../pages/CardDetails/CardDetails";
import Fpassword from "../pages/Fpassword";

const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.LOGIN} element={<LoginPage />} />
      <Route path={ROUTES.REGISTER} element={<RegisterPage />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route path={ROUTES.FAVCARDS} element={<FavCards />} />
      <Route path={ROUTES.MYCARDS} element={<MyCards />} />
      <Route path={`${ROUTES.CARDETAILS}/:id`} element={<CardDetails />} />
      <Route
        path={ROUTES.PROFILE}
        element={
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        }
      />
      <Route
        path={ROUTES.CREATECARD}
        element={
          <BizGuard>
            <CreateCardPage />
          </BizGuard>
        }
      />
      <Route
        path={`${ROUTES.EDITCARD}/:id`}
        element={
          <BizGuard>
            <EditCardPage />
          </BizGuard>
        }
      />
      <Route
        path={ROUTES.CRM}
        element={
          <AdminGuard>
            <CRMPage />
          </AdminGuard>
        }
      />
      <Route path={ROUTES.FORGOTPASSWORD} element={<Fpassword />} />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default Router;
