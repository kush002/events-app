import { json, useRouteLoaderData, redirect } from "react-router-dom";
import getAuthToken from "../util/auth";
import EventItem from "../components/EventItem";
const EventDetailPage = () => {
  const data = useRouteLoaderData("event-detail");
  return (
    <>
      <EventItem event={data.event} />
    </>
  );
};

export default EventDetailPage;

export const loader = async ({ request, params }) => {
  const id = params.eventId;
  const response = await fetch("http://localhost:8080/events/" + id);

  if (!response.ok) {
    return json(
      { message: "could not find the page for event details" },
      { status: 500 }
    );
  } else {
    return response;
  }
};

export const action = async ({ params, request }) => {
  const id = params.eventId;
  const token = getAuthToken();
  const response = await fetch("http://localhost:8080/events/" + id, {
    method: request.method,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  if (!response.ok) {
    return json(
      { message: "could not find the page for event details" },
      { status: 500 }
    );
  }

  return redirect("/events");
};
