import AuthentificateForm from "./components/AuthentificationComponent/AuthentificateForm";
import Home  from "./components/Home/Home";
import Profile from "./components/ProfileComponent/Profile";

const AppRoutes = [
  {
    index: true,
    element: <AuthentificateForm startType="log"/>
  },
  {
    path: '/home',
    element: <Home/>
  },
  {
    path: '/prof',
    element: <Profile />
  }
];

export default AppRoutes;
