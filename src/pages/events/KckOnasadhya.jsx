import EventPage from '../../components/EventPage'
import Seo from '../../components/Seo'

export default function KckOnasadhya() {
  return (
    <>
    <Seo title="KCK Onam Onasadhya | 26-Course Kerala Feast at Chatti, NYC" description="Celebrate Onam at Chatti with the KCK Onasadhya, a grand multi-course vegetarian Kerala banquet by Chef Regi Mathew in Midtown Manhattan." path="/events/kck-onasadhya" />
    <EventPage
      heroImage="/images/events/onam-hero.webp"
      logo="/images/events/kck-onam-logo.png"
      logoAlt="KCK Onam"
      tag="Festive Harvest Feast"
      title="KCK ONAM"
      intro="Onam, the harvest festival of Kerala, commemorates the annual visit of the much-loved mythical ruler of ancient Kerala, King Mahabali. According to folklore, after his defeat, the Gods granted King Mahabali his only wish—to visit his kingdom every year for 10 days."
      card1={{
        title: 'The Pride of Every Malayali',
        text: "This is the time of year special dishes are prepared using the season's bounty. The special meal prepared during the festival is called the Sadhya, a 26-course feast. The Onasadhya, a grand multi-course vegetarian banquet that celebrates the harvest through its seasonal ingredients, is truly the pride of every Malayali.",
      }}
      card2={{
        title: 'The Grand Onasadhya Banquet',
        subtitle: 'Explore our multi-course vegetarian banquet celebrating the harvest season.',
        tabs: [
          { label: 'Starters', badge: '4 items', tagline: 'To Begin', heading: 'Crisp & Savory Starters', text: 'Nendrakai Nurukku, Sharkara Varatty, Pavakka Kondattam & Mulagu Kondattam.' },
          { label: 'Pickles & Relishes', badge: '6 items', tagline: 'Condiments', heading: 'Pickles & Tangy Relishes', text: 'Manga Achar, Naranga Achar, Nellikka Achar, Inji Puli, Beetroot Kichadi & Pineapple Banana Pachadi.' },
          { label: 'Harvest Delicacies', badge: '4 items', tagline: 'Harvest Delicacies', heading: 'Traditional Vegetables & Sides', text: 'Olan, Thoran, Avial & Koottu Kari.' },
          { label: 'Rice & Curries', badge: '6 items', tagline: 'Main Course', heading: 'Rice & Fragrant Curries', text: 'Nei-Parippu with traditional Kerala Matta red rice, accompanied by Kerala Sambar, Kalan, Pappadam & Rasam.' },
          { label: 'Desserts', badge: '4 items', tagline: 'Sweet Finale', heading: 'Traditional Desserts & Payasam', accent: true, text: 'Palada Payasam, Ada Pradhaman, Payaru Payasam & Chakka Pradhaman.' },
        ],
      }}
    />
    </>

  )
}
