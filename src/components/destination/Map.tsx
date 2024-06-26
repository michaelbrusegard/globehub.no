'use client';

import LocationOn from '@material-symbols/svg-400/outlined/location_on-fill.svg';
import { useEventHandlers } from '@react-leaflet/core';
import L, {
  type LeafletMouseEvent,
  type Map as MapType,
  divIcon,
} from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { renderToString } from 'react-dom/server';
import {
  MapContainer,
  Marker,
  Popup,
  Rectangle,
  TileLayer,
  useMap,
  useMapEvent,
} from 'react-leaflet';

type MapProps = {
  location: string;
  popup: string;
};

function SetViewOnClick({
  animateRef,
}: {
  animateRef: React.MutableRefObject<boolean>;
}) {
  const map = useMapEvent('click', (e) => {
    map.setView(e.latlng, map.getZoom(), {
      animate: animateRef.current,
    });
  });

  return null;
}

function MinimapBounds({
  parentMap,
  zoom,
}: {
  parentMap: MapType;
  zoom: number;
}) {
  const minimap = useMap();

  const onClick = useCallback(
    (e: LeafletMouseEvent) => {
      parentMap.setView(e.latlng, parentMap.getZoom());
    },
    [parentMap],
  );
  useMapEvent('click', onClick);

  const [bounds, setBounds] = useState(parentMap.getBounds());
  const onChange = useCallback(() => {
    let newBounds = parentMap.getBounds();
    let west = newBounds.getWest();
    let east = newBounds.getEast();

    if (west < -180) {
      west = -180;
    }
    if (east > 180) {
      east = 180;
    }
    newBounds = new L.LatLngBounds(
      new L.LatLng(newBounds.getSouth(), west),
      new L.LatLng(newBounds.getNorth(), east),
    );

    setBounds(newBounds);
    minimap.setView(parentMap.getCenter(), zoom);
  }, [minimap, parentMap, zoom]);
  const handlers = useMemo(
    () => ({ move: onChange, zoom: onChange }),
    [onChange],
  );

  useEventHandlers(
    {
      instance: parentMap,
      context: {
        __version: 1,
        map: parentMap,
      },
    },
    handlers,
  );

  return <Rectangle bounds={bounds} pathOptions={{ weight: 1 }} />;
}

function MinimapControl({ zoom }: { zoom?: number }) {
  const parentMap = useMap();
  const mapZoom = zoom ?? 0;
  const center = parentMap.getCenter();
  useEffect(() => {
    const element = document.getElementById('minimap');
    if (element) {
      element.tabIndex = -1;
    }
  }, []);

  const minimap = useMemo(
    () => (
      <MapContainer
        className='size-20 rounded-md border-medium border-default-100 dark:bg-[#303030]'
        center={center}
        zoom={mapZoom}
        dragging={false}
        doubleClickZoom={false}
        scrollWheelZoom={false}
        attributionControl={false}
        zoomControl={false}
        id='minimap'
        worldCopyJump={false}
      >
        <TileLayer
          className='-translate-y-6 dark:brightness-[.6] dark:contrast-[3] dark:hue-rotate-[200deg] dark:invert dark:saturate-[.3] dark:filter'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
          noWrap
        />
        <MinimapBounds parentMap={parentMap} zoom={mapZoom} />
      </MapContainer>
    ),
    [center, mapZoom, parentMap],
  );

  return (
    <div className='leaflet-top leaflet-right'>
      <div className='leaflet-control leaflet-bar'>{minimap}</div>
    </div>
  );
}

function Map({ location, popup }: MapProps) {
  const coordinates = location.slice(1, -1).split(',');
  const [longitude, latitude] = coordinates.map((coordinate) =>
    parseFloat(coordinate),
  );
  const animateRef = useRef(true);
  const markerIcon = divIcon({
    html: renderToString(
      <LocationOn
        className='size-10 -translate-y-1/2 fill-danger transition-transform active:scale-[0.9]'
        aria-hidden='true'
      />,
    ),
    className:
      'size-10 rounded-medium focus:outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-focus',
    iconSize: [40, 40],
    iconAnchor: [20, -2],
  });
  return (
    <MapContainer
      className='aspect-video w-full rounded-md focus:outline-none focus-visible:z-10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus dark:bg-[#303030]'
      center={[latitude!, longitude!]}
      zoom={10}
      minZoom={2}
      worldCopyJump={false}
    >
      <TileLayer
        className='dark:brightness-[.6] dark:contrast-[3] dark:hue-rotate-[200deg] dark:invert dark:saturate-[.3] dark:filter'
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        noWrap
      />
      <SetViewOnClick animateRef={animateRef} />
      <MinimapControl />
      <Marker position={[latitude!, longitude!]} icon={markerIcon}>
        <Popup className='!mb-10'>{popup}</Popup>
      </Marker>
    </MapContainer>
  );
}

export default Map;
export type { MapProps };
