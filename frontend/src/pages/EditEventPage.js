import { useRouteLoaderData, json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";
import getAuthToken from "../util/auth";
const EditEventPage = () => {
  const data = useRouteLoaderData("event-detail");

  return (
    <>
      <EventForm event={data.event} method="patch" />
    </>
  );
};

export default EditEventPage;
export const action = async ({ request, params }) => {
  const data = await request.formData();
  const token = getAuthToken();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const response = await fetch(
    "http://localhost:8080/events/" + params.eventId,
    {
      method: request.method,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(eventData),
    }
  );

  if (!response.ok) {
    return json({ message: "Could not send data" }, { status: 500 });
  }

  return redirect("/events");
};
