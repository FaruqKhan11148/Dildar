import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
  ZoomControl,
} from 'react-leaflet';

import { useEffect, useState } from 'react';

function ChangeMapView({ center }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, map.getZoom(), {
        animate: true,
      });
    }
  }, [center, map]);

  return null;
}

function LocationMarker({ setLocation, currentPosition, setCurrentPosition }) {
  useMapEvents({
    click(e) {
      const loc = {
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      };

      setCurrentPosition([loc.lat, loc.lng]);

      setLocation(loc);
    },
  });

  return currentPosition ? <Marker position={currentPosition} /> : null;
}

export default function LocationPicker({ setLocation }) {
  const shopLocation = [14.621866, 75.628707];

  const [mapType, setMapType] = useState('streets');

  const [currentPosition, setCurrentPosition] = useState(null);

  const [isFullscreen, setIsFullscreen] = useState(false);

  // =========================
  // AUTO GET USER LOCATION
  // =========================
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCurrentPosition([userLocation.lat, userLocation.lng]);
        setLocation(userLocation);
      },
      (error) => {
        console.log(error);
        alert('Location permission denied. Please select manually.');
      },
      {
        enableHighAccuracy: true,
      }
    );
  }, []);

  // =========================
  // MANUAL CURRENT LOCATION BUTTON
  // =========================
  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        setCurrentPosition([userLocation.lat, userLocation.lng]);

        setLocation(userLocation);
      },

      (error) => {
        console.log(error);

        alert('Failed to fetch current location');
      },

      {
        enableHighAccuracy: true,
      },
    );
  };

  return (
    <div>
      {/* TOP BUTTONS */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          marginBottom: 10,
          flexWrap: 'wrap',
        }}
      >
        {/* ROADS */}
        <button
          type="button"
          onClick={() => setMapType('streets')}
          style={{
            padding: '6px 12px',
            background: mapType === 'streets' ? '#ef4444' : '#222',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Roads View
        </button>

        {/* SATELLITE */}
        <button
          type="button"
          onClick={() => setMapType('satellite')}
          style={{
            padding: '6px 12px',
            background: mapType === 'satellite' ? '#ef4444' : '#222',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          Satellite View
        </button>

        {/* CURRENT LOCATION */}
        <button
          type="button"
          onClick={useCurrentLocation}
          style={{
            padding: '6px 12px',
            background: '#16a34a',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
          }}
        >
          📍 Use My Location
        </button>
      </div>

      {/* MAP WRAPPER */}
      <div
        style={{
          position: 'relative',
        }}
      >
        {/* MAP */}
        <div
          style={{
            height: isFullscreen ? '100vh' : '350px',

            width: isFullscreen ? '100vw' : '100%',

            borderRadius: isFullscreen ? 0 : 12,

            overflow: 'visible',

            background: '#111',

            ...(isFullscreen && {
              position: 'fixed',
              top: 0,
              left: 0,

              width: '100vw',
              height: '100vh',

              zIndex: 99999,
            }),
          }}
        >
          <MapContainer
            center={currentPosition || shopLocation}
            zoom={16}
            scrollWheelZoom={true}
            zoomControl={false}
            style={{
              height: '100%',
              width: '100%',
            }}
          >
            {/* CUSTOM ZOOM */}
            <ZoomControl position="bottomright" />

            {/* AUTO CENTER */}
            <ChangeMapView center={currentPosition || shopLocation} />

            {/* STREET MAP */}
            {mapType === 'streets' && (
              <TileLayer
                attribution="&copy; OpenStreetMap contributors"
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
            )}

            {/* SATELLITE MAP */}
            {mapType === 'satellite' && (
              <TileLayer
                attribution="Tiles &copy; Esri"
                url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              />
            )}

            {/* LOCATION MARKER */}
            <LocationMarker
              setLocation={setLocation}
              currentPosition={currentPosition}
              setCurrentPosition={setCurrentPosition}
            />
          </MapContainer>
        </div>

        {/* FULLSCREEN BUTTON */}
        <button
          type="button"
          onClick={() => setIsFullscreen(!isFullscreen)}
          style={{
            position: isFullscreen ? 'fixed' : 'absolute',

            top: 20,

            right: isFullscreen ? 200 : 20,

            zIndex: 1000000,

            width: '50px',
            height: '50px',

            background: '#000000',
            color: '#fff',

            border: 'none',
            borderRadius: '50%',

            fontSize: '22px',
            fontWeight: 'bold',

            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',

            cursor: 'pointer',

            boxShadow: '0 2px 10px rgba(0,0,0,0.4)',
          }}
        >
          {isFullscreen ? '✕' : '[ ]'}
        </button>
      </div>

      {/* HELP TEXT */}
      <p
        style={{
          marginTop: 8,
          color: '#aaa',
          fontSize: 13,
        }}
      >
        Current location auto selected. Tap map to change delivery location
        within 2KM radius.
      </p>
    </div>
  );
}
