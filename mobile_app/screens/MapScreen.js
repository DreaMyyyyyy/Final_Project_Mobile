import React from 'react';
import { View, Text,Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen({ route,navigation}) {
  const { latitude, longitude } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{ latitude: latitude, longitude: longitude }}
          title="Location"
        />
      </MapView>
      <Button 
        title="Go Back" 
        onPress={() => navigation.goBack()} 
        style={{ position: 'absolute', bottom: 20, right: 20 }} 
      />
    </View>
  );
}
