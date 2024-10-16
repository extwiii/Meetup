import { FlatList } from 'react-native';

import EventListItem from '~/components/EventListItem';
import { useNearbyEvents } from '~/hooks/useNearbyEvents';

export default function Events() {
  const events = useNearbyEvents();

  return (
    <FlatList
      data={events}
      renderItem={({ item }) => <EventListItem event={item} />}
      className="bg-white"
    />
  );
}
