import React from "react";
import {useRouter} from "next/router";
import {getFilteredEvents} from "../../dummy-data";
import EventList from "../../components/events/EventList";
import Button from "../../components/ui/button";
import ResultTitle from "../../components/events/result-title";
import EventItem from "../../components/events/EventItem";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilteredEventPage() {
  const router = useRouter();
  const filteredData = router.query.slug;

  console.log(filteredData);

  if (!filteredData) {
    return <h1>Loading...</h1>;
  }

  const filteredYear = filteredData[0];
  const filteredMonth = filteredData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12
  ) {
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter Please Adjust Your Values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: numYear,
    month: numMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No Events Found! On this filter</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <>
      <ResultTitle date={date} />
      <EventList items={filteredEvents} />
    </>
  );
}
