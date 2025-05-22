import React from 'react';
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
}

const RoutesContainer = ({ routes, isLoading, onSaveRoute, savedRouteIds = [] }: RoutesContainerProps) => {
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
            <span className="font-medium">{routes.length}</span> gefunden
          </div>
        </div>
        <div className="flex gap-2 mt-2 overflow-x-auto py-1">
          <Button size="sm" variant="outline" className="text-xs whitespace-nowrap">
            Realistischste Ankunft
          </Button>
          <Button size="sm" variant="outline" className="text-xs whitespace-nowrap">
            Früheste Ankunft
          </Button>
          <Button size="sm" variant="outline" className="text-xs whitespace-nowrap">
            Günstigster Preis
          </Button>
          <Button size="sm" variant="outline" className="text-xs whitespace-nowrap">
            Wenigste Umstiege
          </Button>
        </div>
      </div>
      
      <div>
        {routes.map((route) => (
          <RouteCard 
            key={route.id} 
            {...route} 
            isSaved={savedRouteIds.includes(route.id)}
            onSave={() => onSaveRoute?.(route)}
          />
        ))}
      </div>
    </div>
  );
};

export default RoutesContainer;
