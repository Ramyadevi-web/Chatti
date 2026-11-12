import EventPage from '../../components/EventPage'
import Seo from '../../components/Seo'

export default function KckSeafoodToddyTales() {
  return (
    <>
        <Seo title="Seafood Fest & Toddy Tales | Chatti by Chef Regi Mathew, NYC" description="Kerala's coastal and backwater seafood with toddy, a festival menu curated by Chef Regi Mathew at Chatti in Midtown Manhattan." path="/events/kck-seafood-toddy-tales" />
       
    <EventPage
      heroImage="/images/events/seafood-hero.webp"
      theme="dark"
      tag="Coastal & Backwater Legacy"
      title="Seafood Fest & Toddy Tales"
      intro="The Seafood Fest & Toddy Tales at Chatti is a celebration of Kerala's rich legacy—of freshwater, seawater, and backwater harvests, and the abundance of seafood cooked and enjoyed across the coast."
      card1={{
        title: 'Fishermen’s Secrets & Toddy Joy',
        text: 'This festival celebrates time-honored recipes, fishermen’s secrets, and home-style preparations. And of course, toddy—the perfect drink and the pure joy it brings when paired with the ideal dish. At the heart of this promotion lies a carefully curated menu by Chef Regi: a tapestry of flavors, distinct cooking styles, and cherished memories from across Kerala’s coast and backwaters.',
      }}
      card2={{
        title: 'Expect the Unexpected',
        subtitle: "Discover Kerala's best-kept culinary secrets and signature coastal specialties.",
        tabs: [
          { label: 'Njandu & Kappa Unda', badge: 'Starter', tagline: 'Specialty 01', heading: 'Njandu & Kappa Unda', text: 'Succulent crabmeat and tapioca dumplings flavored with aromatic, freshly ground Kerala spices.' },
          { label: 'Thenga Aracha Fish Curry', badge: 'Curry', tagline: 'Specialty 02', heading: 'Thenga Aracha Fish Curry', text: 'Fiery King Fish cubes cooked in a rich coconut paste blended with authentic regional spices.' },
          { label: 'Avoli Nirachathu', badge: 'Specialty', tagline: 'Specialty 03', heading: 'Avoli Nirachathu', text: 'White pomfret stuffed with a signature homemade masala blend, tawa-roasted to perfection.' },
          { label: "Chef's Invitation", badge: 'Experience', tagline: "Chef's Invitation", heading: "Step Into Chef's World", accent: true, text: 'This festival is an invitation to step into Chef Regi’s world. To eat like he did growing up, to taste Kerala’s best-kept secrets, to sip toddy, share plates, and celebrate seafood the way it was always meant to be.' },
        ],
      }}
    />
    </>
  )
}
