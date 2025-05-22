import React from 'react';
import { 
  CalendarCheck, 
  Clock,
  ArrowRight,
  MapPin,
  Heart
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface RouteProps {
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
  isSaved?: boolean;
  onSave?: () => void;
}

const RouteCard = ({
  id,
  departure,
  arrival,
  scheduledArrival,
  duration,
  transfers,
  stations,
  crowd,
  delay,
  safety,
  price,
  isSaved = false,
  onSave
}: RouteProps) => {
  const handleSaveRoute = () => {
    onSave?.();
  };
  
  const getDelayColor = (level: 'low' | 'medium' | 'high') => {
    switch(level) {
      case 'low': return 'bg-delay-low';
      case 'medium': return 'bg-delay-medium';
      case 'high': return 'bg-delay-high';
    }
  };
  
  const getCrowdColor = (level: 'low' | 'medium' | 'high') => {
    switch(level) {
      case 'low': return 'bg-crowd-low';
      case 'medium': return 'bg-crowd-medium';
      case 'high': return 'bg-crowd-high';
    }
  };
  
  const getSafetyColor = (level: 'good' | 'medium' | 'bad') => {
    switch(level) {
      case 'good': return 'bg-safety-good';
      case 'medium': return 'bg-safety-medium';
      case 'bad': return 'bg-safety-bad';
    }
  };
  
  const getCrowdLabel = (level: 'low' | 'medium' | 'high') => {
    switch(level) {
      case 'low': return 'Gering';
      case 'medium': return 'Mittel';
      case 'high': return 'Hoch';
    }
  };
  
  const getSafetyLabel = (level: 'good' | 'medium' | 'bad') => {
    switch(level) {
      case 'good': return 'Gut';
      case 'medium': return 'Mittel';
      case 'bad': return 'Gering';
    }
  };
  
  return (
    <div className="transit-card border-l-db-blue">
      <div className="grid grid-cols-4 gap-2 mb-3">
        <div className="col-span-3">
          <div className="flex justify-between mb-1">
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-1 text-db-blue" />
              <span className="text-sm font-medium">{departure} - {arrival}</span>
            </div>
            <span className="text-sm font-medium">{duration}</span>
          </div>
          
          <div className="flex flex-wrap gap-1 mt-1">
            <div className="flex items-center text-xs text-gray-600">
              <CalendarCheck className="w-3 h-3 mr-1" />
              <span>Offiziell: {scheduledArrival}</span>
            </div>
            <div className="flex items-center text-xs text-gray-600 ml-2">
              <span className={`indicator ${getDelayColor(delay)}`}></span>
              <span>Verspätung</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col items-end justify-between">
          <span className="font-semibold text-db-blue">{price} €</span>
          <span className="text-xs text-gray-500">{transfers} Umst.</span>
        </div>
      </div>
      
      <div className="mb-4">
        {stations.map((station, index) => (
          <div key={index} className="flex items-center mb-2">
            <div className="mr-2 w-5 flex justify-center">
              <MapPin className="h-4 w-4 text-db-blue" />
            </div>
            <div className="flex-1">
              <div className="flex items-center">
                <span className="font-medium text-sm">{station.name}</span>
                {station.platform && (
                  <span className="ml-2 text-xs bg-gray-100 px-1 rounded">Gl. {station.platform}</span>
                )}
              </div>
              {station.transit && (
                <div className="flex items-center text-xs text-gray-600 mt-0.5">
                  <span>{station.time}</span>
                  <ArrowRight className="mx-1 h-3 w-3" />
                  <span>{station.transit}</span>
                </div>
              )}
            </div>
            <span className="text-sm font-medium">{station.time}</span>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 border border-gray-300">
            <span className={`h-2 w-2 rounded-full ${getCrowdColor(crowd)}`}></span>
            <span className="text-xs">Auslastung: {getCrowdLabel(crowd)}</span>
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1 border border-gray-300">
            <span className={`h-2 w-2 rounded-full ${getSafetyColor(safety)}`}></span>
            <span className="text-xs">Sicherheit: {getSafetyLabel(safety)}</span>
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            className={`hover:bg-red-50 ${isSaved ? 'text-red-500' : 'text-gray-400'}`}
            onClick={handleSaveRoute}
          >
            <Heart className="h-5 w-5" fill={isSaved ? 'currentColor' : 'none'} />
          </Button>
          <Button className="text-xs h-8 bg-db-blue hover:bg-blue-800">
            Auswählen
          </Button>
        </div>
      </div>
    </div>
  );
};

export default RouteCard;
