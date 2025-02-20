
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Index from "./pages/Index";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Transcripts from "./pages/Transcripts";
import NotFound from "./pages/NotFound";
import Notifications from "./pages/Notifications";
import ChangePassword from "./pages/ChangePassword";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/analytics",
    element: <Analytics />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/transcripts",
    element: <Transcripts />,
  },
  {
    path: "/notifications",
    element: <Notifications />,
  },
  {
    path: "/change-password",
    element: <ChangePassword />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default function App() {
  return <RouterProvider router={router} />;
}
