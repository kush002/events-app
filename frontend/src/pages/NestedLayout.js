import { Outlet } from "react-router-dom";
import EventsNavigation from "../components/EventsNavigation";
const NestedLayout = () => {
  return (
    <>
      <EventsNavigation />
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default NestedLayout;
