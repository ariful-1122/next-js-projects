import {Fragment} from "react";
import {useRouter} from "next/router";

import {
  getEventById,
  getAllEvents,
  getFeaturedEvents,
} from "../../helpers/api-util";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
import ErrorAlert from "../../components/ui/error-alert";

function EventDetailPage(props) {
  const event = props.selectedEvent;

  if (!event) {
    return (
      <div className="center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;

  const event = await getEventById(eventId);

  return {
    props: {
      selectedEvent: event,
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  const allEvents = await getFeaturedEvents();

  const ids = allEvents.map(item => ({params: {eventId: item.id}}));
  return {
    paths: ids,
    fallback: "blocking",
  };
}

export default EventDetailPage;
