import { createBrowserRouter } from "react-router";
import { Home } from "./components/Home";
import { Phase2 } from "./components/Phase2";
import { Phase3 } from "./components/Phase3";
import { Phase4 } from "./components/Phase4";
import { Phase5 } from "./components/Phase5";
import { Phase7 } from "./components/Phase7";
import { Report } from "./components/Report";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/fase2",
    Component: Phase2,
  },
  {
    path: "/fase3",
    Component: Phase3,
  },
  {
    path: "/fase4",
    Component: Phase4,
  },
  {
    path: "/fase5",
    Component: Phase5,
  },
  {
    path: "/fase7",
    Component: Phase7,
  },
  {
    path: "/relatorio",
    Component: Report,
  },
]);