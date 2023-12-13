import React from 'react'
import Header from '../components/Layout/Header.jsx'
import EventCard from '../components/Events/EventCard.jsx'

export default function EventsPage() {
  return (
    <div>
        <Header activeHeading={4} />
        <EventCard active={true} />
        <EventCard active={true} />
    </div>
  )
}
