import { json, redirect } from "react-router-dom";
import EventForm from "../components/EventForm";
import getAuthToken from "../util/auth";
const NewEventPage = () => {
  return (
    <>
      <EventForm method="post" />
    </>
  );
};

export default NewEventPage;

export const action = async ({ request, params }) => {
  const data = await request.formData();
  const token = getAuthToken();

  const eventData = {
    title: data.get("title"),
    image: data.get("image"),
    date: data.get("date"),
    description: data.get("description"),
  };
  const response = await fetch("http://localhost:8080/events", {
    method: request.method,
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify(eventData),
  });

  if (!response.ok) {
    return json({ message: "Could not send data" }, { status: 500 });
  }

  return redirect("/events");
};
