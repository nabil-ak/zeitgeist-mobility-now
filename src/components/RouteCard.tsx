import React from 'react';
import { 
  CalendarCheck, 
  Clock,
  ArrowRight,
  MapPin,
  Heart,
  Info
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

  const getDelayLabel = (level: 'low' | 'medium' | 'high') => {
    switch(level) {
      case 'low': return 'Gering';
      case 'medium': return 'Mittel';
      case 'high': return 'Hoch';
    }
  };

  const getDelayIcon = (level: 'low' | 'medium' | 'high') => {
    switch(level) {
      case 'low': return '↓';
      case 'medium': return '→';
      case 'high': return '↑';
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-3 border-l-4 border-db-blue hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-db-blue">{departure}</span>
            <ArrowRight className="h-4 w-4 text-gray-400" />
            <span className="text-lg font-semibold">{arrival}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>{duration}</span>
            <span>•</span>
            <span>{transfers} Umstiege</span>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-lg font-semibold">{price}</div>
          <div className="text-sm text-gray-500">2. Klasse</div>
        </div>
      </div>
      
      <div className="space-y-3 mb-4">
        {stations.map((station, index) => (
          <div key={index} className="flex items-start gap-3">
            <div className="flex flex-col items-center">
              <div className={`w-2 h-2 rounded-full ${
                station.type === 'start' || station.type === 'end' ? 'bg-db-blue' : 'bg-gray-400'
              }`} />
              {index < stations.length - 1 && (
                <div className="w-0.5 h-8 bg-gray-200" />
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <div className="font-medium">{station.name}</div>
                  {station.platform && (
                    <div className="text-sm text-gray-500">Gleis {station.platform}</div>
                  )}
                </div>
                <div className="text-right">
                  <div className="font-medium">{station.time}</div>
                  {station.transit && (
                    <div className="text-sm text-gray-500">{station.transit}</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1 border border-gray-300">
            <span className={`h-2 w-2 rounded-full ${getCrowdColor(crowd)}`}></span>
            <span className="text-xs">Auslastung: {getCrowdLabel(crowd)}</span>
          </Badge>
          
          <Badge variant="outline" className="flex items-center gap-1 border border-gray-300">
            <span className={`h-2 w-2 rounded-full ${getSafetyColor(safety)}`}></span>
            <span className="text-xs">Sicherheit: {getSafetyLabel(safety)}</span>
          </Badge>

          <Badge variant="outline" className="flex items-center gap-1 border border-gray-300">
            <span className={`h-2 w-2 rounded-full ${getDelayColor(delay)}`}></span>
            <span className="text-xs">Abweichung: {getDelayLabel(delay)}</span>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Info className="h-3 w-3 text-gray-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Prognosesicherheit basierend auf historischen Daten</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
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

      <div className="mt-3 text-sm text-gray-500 flex items-center gap-2">
        <span className="text-db-blue font-medium">KI-Prognose:</span>
        <span>{arrival}</span>
        <span className="text-gray-400">•</span>
        <span>Offiziell: {scheduledArrival}</span>
      </div>
    </div>
  );
};

export default RouteCard;
