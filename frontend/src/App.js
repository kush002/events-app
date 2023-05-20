
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./pages/Root";
import EditEventPage, {
  action as editEventAction,
} from "./pages/EditEventPage";
import EventDetailPage, {
  loader as eventDetailLoader,
  action as deleteEventAction,
} from "./pages/EventDetailPage";
import EventsPage, { loader as eventsLoader } from "./pages/EventsPage";
import HomePage from "./pages/HomePage";
import NewEventPage, { action as newEventAction } from "./pages/NewEventPage";
import NestedLayout from "./pages/NestedLayout";
import ErrorPage from "./pages/ErrorPage";
import NewsletterPage, {
  action as newsletterAction,
} from "./pages/NewsletterPage";
import AuthenticationPage, {
  action as authAction,
} from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { loader as tokenLoader } from "./util/auth";
import { AuthLoader } from "./util/auth";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    id: "root",
    loader: tokenLoader,
    children: [
      { index: true, element: <HomePage /> },
      {
        path: "events",
        element: <NestedLayout />,
        children: [
          {
            index: true,
            element: <EventsPage />,
            loader: eventsLoader,
          },
          {
            path: ":eventId",
            loader: eventDetailLoader,

            id: "event-detail",
            children: [
              {
                index: true,
                element: <EventDetailPage />,
                action: deleteEventAction,
              },
              {
                path: "edit",
                element: <EditEventPage />,
                action: editEventAction,
                loader: AuthLoader,
              },
            ],
          },
          {
            path: "new",
            element: <NewEventPage />,
            action: newEventAction,
            loader: AuthLoader,
          },
        ],
      },
      {
        path: "newsletter",
        element: <NewsletterPage />,
        action: newsletterAction,
      },
      {
        path: "auth",
        element: <AuthenticationPage />,
        action: authAction,
      },
      { path: "logout", action: logoutAction },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
