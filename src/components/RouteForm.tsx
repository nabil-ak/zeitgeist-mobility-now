import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { format } from 'date-fns';
import { CalendarIcon, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import PreferencesModal from './PreferencesModal';

const RouteForm = ({ onSearch }: { onSearch: () => void }) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [time, setTime] = useState('12:00');
  const [showPreferences, setShowPreferences] = useState(false);
  
  return (
    <div className="space-y-4 bg-white rounded-lg shadow-md p-4 animate-fade-in">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-500">Von</label>
        <Input placeholder="Startort eingeben" className="border-db-blue focus-visible:ring-db-blue" />
      </div>
      
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-500">Nach</label>
        <Input placeholder="Zielort eingeben" className="border-db-blue focus-visible:ring-db-blue" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Datum</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal border-db-blue"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, 'dd.MM.yyyy') : <span>Datum wählen</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className={cn("p-3 pointer-events-auto")}
              />
            </PopoverContent>
          </Popover>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-500">Zeit</label>
          <div className="flex items-center border rounded-md px-3 py-2 border-db-blue focus-within:ring-1 focus-within:ring-db-blue">
            <Clock className="h-4 w-4 mr-2 text-gray-500" />
            <input
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="outline-none flex-1"
            />
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center pt-2">
        <Button 
          variant="outline" 
          className="text-db-blue border-db-blue hover:bg-blue-50"
          onClick={() => setShowPreferences(true)}
        >
          Präferenzen
        </Button>
        
        <Button 
          className="bg-db-blue hover:bg-blue-800 text-white"
          onClick={onSearch}
        >
          Verbindungen suchen
        </Button>
      </div>
      
      <PreferencesModal open={showPreferences} onClose={() => setShowPreferences(false)} />
    </div>
  );
};

export default RouteForm;
