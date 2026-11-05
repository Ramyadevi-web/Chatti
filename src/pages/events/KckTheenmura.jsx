import EventPage from '../../components/EventPage'

export default function KckTheenmura() {
  return (
    <EventPage
      heroImage="/images/events/theenmura-hero.webp"
      logo="/images/events/theenmura-logo.png"
      logoAlt="Theenmura Logo"
      tag="A Royal Heritage Feast"
      title="Theenmura"
      intro="Experience the legendary multi-course royal feast of Kerala, where culinary craft and rich cultural heritage meet in an extraordinary dining journey."
      card1={{
        title: 'The Legend of Theenmura',
        text: "Rooted in the grand banquet traditions of Kerala's royal families and aristocratic estates, Theenmura represents the pinnacle of Syrian Christian and coastal hospitality. Translating to \"the formal order of dining,\" this elaborate feast was traditionally served to honor esteemed guests, family patriarchs, and milestone celebrations.",
      }}
      card2={{
        title: 'A Symphony of Flavors',
        subtitle: 'Every course is served in a precise sequence designed to elevate your taste and sensory harmony.',
        tabs: [
          { label: 'Starters', badge: 'Appetizers', tagline: 'To Begin', heading: 'Starter Delicacies', text: 'Traditional appetisers served with spiced accompaniments and house-made preserves.' },
          { label: 'Meats & Seafood', badge: 'Heritage', tagline: 'Main Catch & Roasts', heading: 'Heritage Meats & Seafood', text: 'Slow-cooked roasts, signature seafood preparations, and rich coconut-infused curries.' },
          { label: 'Breads & Rice', badge: 'Artisanal', tagline: 'Accompaniments', heading: 'Artisanal Breads & Rice', text: 'Freshly steamed Appams, layered Parottas, and aromatic Matta rice pairings.' },
          { label: 'Desserts', badge: 'Grand Finale', tagline: 'Sweet Finale', heading: 'Grand Desserts', accent: true, text: 'Decadent Payasams and warm, traditional sweet finishes cooked down over slow fires.' },
        ],
      }}
    />
  )
}
