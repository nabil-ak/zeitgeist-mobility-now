import React, { useState } from 'react';
import RouteCard from './RouteCard';
import { Button } from '@/components/ui/button';

interface Route {
  id: number;
  departure: string;
  arrival: string;
  scheduledArrival: string;
  duration: string;
  transfers: number;
  stations: {
    name: string;
    type: 'start' | 'transfer' | 'end';
    time: string;
    transit?: string;
    platform?: string;
  }[];
  crowd: 'low' | 'medium' | 'high';
  delay: 'low' | 'medium' | 'high';
  safety: 'good' | 'medium' | 'bad';
  price: string;
}

interface RoutesContainerProps {
  routes: Route[];
  isLoading: boolean;
  onSaveRoute?: (route: Route) => void;
  savedRouteIds?: number[];
  selectedDateTime: string;
}

const RoutesContainer = ({ routes, isLoading, onSaveRoute, savedRouteIds = [], selectedDateTime }: RoutesContainerProps) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Schnellste Verbindung');

  const getSortedRoutes = () => {
    switch (selectedFilter) {
      case 'Schnellste Verbindung':
        return [...routes].sort((a, b) => {
          // Parse duration like '1h 37min' to minutes
          const parseDuration = (str: string) => {
            const match = str.match(/(\d+)h\s*(\d+)?min?/);
            if (!match) return 0;
            const hours = parseInt(match[1], 10);
            const minutes = match[2] ? parseInt(match[2], 10) : 0;
            return hours * 60 + minutes;
          };
          return parseDuration(a.duration) - parseDuration(b.duration);
        });
      case 'Früheste Ankunft':
        return [...routes].sort((a, b) => a.arrival.localeCompare(b.arrival));
      case 'Günstigster Preis':
        return [...routes].sort((a, b) => {
          const priceA = parseFloat(a.price.replace(',', '.'));
          const priceB = parseFloat(b.price.replace(',', '.'));
          return priceA - priceB;
        });
      case 'Wenigste Umstiege':
        return [...routes].sort((a, b) => a.transfers - b.transfers);
      default:
        return routes;
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <div className="animate-pulse flex flex-col items-center">
          <div className="h-4 bg-gray-200 rounded-full w-32 mb-6"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-40 bg-gray-100 w-full max-w-xl rounded-lg mb-3"></div>
          ))}
        </div>
      </div>
    );
  }
  
  if (routes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <h3 className="text-lg font-medium mb-2">Keine Verbindungen gefunden</h3>
        <p className="text-sm text-gray-500 mb-4">Bitte passen Sie Ihre Suchkriterien an</p>
      </div>
    );
  }
  
  return (
    <div className="space-y-1 animate-fade-in">
      <div className="bg-white p-3 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-medium">Verbindungen</h3>
          <div className="text-sm text-gray-500">
            <span className="font-medium">{getSortedRoutes().length}</span> gefunden
          </div>
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto py-1">
          <Button size="sm" variant={selectedFilter === 'Schnellste Verbindung' ? 'default' : 'outline'} className="text-xs whitespace-nowrap" onClick={() => setSelectedFilter('Schnellste Verbindung')}>
            Schnellste Verbindung
          </Button>
          <Button size="sm" variant={selectedFilter === 'Früheste Ankunft' ? 'default' : 'outline'} className="text-xs whitespace-nowrap" onClick={() => setSelectedFilter('Früheste Ankunft')}>
            Früheste Ankunft
          </Button>
          <Button size="sm" variant={selectedFilter === 'Günstigster Preis' ? 'default' : 'outline'} className="text-xs whitespace-nowrap" onClick={() => setSelectedFilter('Günstigster Preis')}>
            Günstigster Preis
          </Button>
          <Button size="sm" variant={selectedFilter === 'Wenigste Umstiege' ? 'default' : 'outline'} className="text-xs whitespace-nowrap" onClick={() => setSelectedFilter('Wenigste Umstiege')}>
            Wenigste Umstiege
          </Button>
        </div>
      </div>
      
      <div>
        {getSortedRoutes().map((route) => (
          <RouteCard 
            key={route.id} 
            {...route} 
            isSaved={savedRouteIds.includes(route.id)}
            onSave={() => onSaveRoute?.(route)}
            selectedDateTime={selectedDateTime}
          />
        ))}
      </div>
    </div>
  );
};

export default RoutesContainer;
