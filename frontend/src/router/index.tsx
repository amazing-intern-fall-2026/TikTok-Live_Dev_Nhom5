import { createBrowserRouter } from "react-router-dom";
import { ROUTES } from "./router";
import LandingLayout from "@/layouts/LandingLayout";
import LandingPage from "@/pages/landingPage";
import OperatorPage from "@/pages/OperatorPage";

export const router = createBrowserRouter([
  {
    path: ROUTES.LANDING_PAGE,
    element: <LandingLayout />,
    children: [{ index: true, element: <LandingPage /> }],
  },
  {
    path: ROUTES.OPERATOR_PAGE,
    element: <OperatorPage />,
  },
]);
