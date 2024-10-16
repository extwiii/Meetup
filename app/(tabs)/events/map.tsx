import Mapbox, { Camera, LocationPuck, MapView, ShapeSource, CircleLayer } from '@rnmapbox/maps';
import { featureCollection, point } from '@turf/helpers';
import { router } from 'expo-router';
import { View } from 'react-native';

import { useNearbyEvents } from '~/hooks/useNearbyEvents';

Mapbox.setAccessToken(process.env.EXPO_PUBLIC_MAPBOX_TOKEN || '');

export default function EventsMapView() {
  const events = useNearbyEvents();

  const points = events
    .filter((event: any) => event.long && event.lat)
    .map((event: any) => point([event.long, event.lat], { event }));

  return (
    <View className="flex-1 bg-red-300">
      <MapView style={{ height: '100%' }}>
        <Camera followZoomLevel={14} followUserLocation />
        <LocationPuck puckBearingEnabled puckBearing="heading" pulsing={{ isEnabled: true }} />
        <ShapeSource
          id="events"
          shape={featureCollection(points)}
          onPress={(event) => router.push(`/event/${event.features[0].properties.event.id}`)}>
          {/* Render points */}
          <CircleLayer
            id="events"
            style={{
              circlePitchAlignment: 'map',
              circleColor: '#42E100',
              circleRadius: 10,
              circleOpacity: 1,
              circleStrokeWidth: 2,
              circleStrokeColor: 'white',
            }}
          />
        </ShapeSource>
      </MapView>
    </View>
  );
}
