import React from "react";
import {useRouter} from "next/router";
import EventList from "../../components/events/EventList";
import {getAllEvents} from "../../dummy-data";
import EventSearch from "../../components/events/event-search";

export default function AllEvents() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventsHandler(year, month) {
    router.push(`/events/${year}/${month}`);
  }

  return (
    <>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </>
  );
}
