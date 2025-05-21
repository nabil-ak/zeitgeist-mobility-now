import React, { useReducer } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PreferencesModalProps {
  onClose: () => void;
  open: boolean;
}

const initialState = {
  priority: 'fast',
  selectedSwitches: 3,
  selectedWalk: 10,
  avoidCrowding: false,
  safetyPrio: false,
  train: true,
  tram: true,
  bus: true,
  subway: true,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_PRIORITY':
      return { ...state, priority: action.value };
    case 'SET_SWITCHES':
      return { ...state, selectedSwitches: action.value };
    case 'SET_WALK':
      return { ...state, selectedWalk: action.value };
    case 'SET_AVOID_CROWDING':
      return { ...state, avoidCrowding: action.value };
    case 'SET_SAFETY_PRIO':
      return { ...state, safetyPrio: action.value };
    case 'SET_TRANSPORT':
      return { ...state, [action.transport]: action.value };
    default:
      return state;
  }
}

const PreferencesModal = ({ onClose, open }: PreferencesModalProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleClose = () => {
    onClose();
  };
  
  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Reisepräferenzen</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <h3 className="font-medium">Prioritäten</h3>
            <RadioGroup value={state.priority} onValueChange={value => dispatch({ type: 'SET_PRIORITY', value })}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="fast" id="fast" />
                <Label htmlFor="fast">Schnellste Verbindung</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="comfortable" id="comfortable" />
                <Label htmlFor="comfortable">Komfortabelste Reise</Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-4">
            <h3 className="font-medium">Komforteinstellungen</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="max-transfers">Max. Umstiege</Label>
                <span className="text-sm text-gray-500">{state.selectedSwitches}</span>
              </div>
              <Slider
                id="max-transfers"
                value={[state.selectedSwitches]}
                max={5}
                step={1}
                className="w-full"
                onValueChange={value => dispatch({ type: 'SET_SWITCHES', value: value[0] })}
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="max-walk">Max. Gehzeit pro Umstieg</Label>
                <span className="text-sm text-gray-500">{state.selectedWalk} min</span>
              </div>
              <Slider
                id="max-walk"
                value={[state.selectedWalk]}
                max={20}
                step={1}
                className="w-full"
                onValueChange={value => dispatch({ type: 'SET_WALK', value: value[0] })}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="avoid-crowding">Überfüllte Verbindungen vermeiden</Label>
                <p className="text-xs text-muted-foreground">Basierend auf historischen Daten</p>
              </div>
              <Switch id="avoid-crowding" checked={state.avoidCrowding} onCheckedChange={value => dispatch({ type: 'SET_AVOID_CROWDING', value })} />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="safety-prio">Sicherheit priorisieren</Label>
                <p className="text-xs text-muted-foreground">Basierend auf Nutzerbewertungen</p>
              </div>
              <Switch id="safety-prio" checked={state.safetyPrio} onCheckedChange={value => dispatch({ type: 'SET_SAFETY_PRIO', value })} />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Verkehrsmittelpräferenzen</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Switch id="train" checked={state.train} onCheckedChange={value => dispatch({ type: 'SET_TRANSPORT', transport: 'train', value })} />
                <Label htmlFor="train">Zug</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="tram" checked={state.tram} onCheckedChange={value => dispatch({ type: 'SET_TRANSPORT', transport: 'tram', value })} />
                <Label htmlFor="tram">Straßenbahn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="bus" checked={state.bus} onCheckedChange={value => dispatch({ type: 'SET_TRANSPORT', transport: 'bus', value })} />
                <Label htmlFor="bus">Bus</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="subway" checked={state.subway} onCheckedChange={value => dispatch({ type: 'SET_TRANSPORT', transport: 'subway', value })} />
                <Label htmlFor="subway">U-Bahn</Label>
              </div>
            </div>
          </div>
        </div>
        
        <DialogFooter>
          <Button type="button" variant="outline" onClick={handleClose}>
            Abbrechen
          </Button>
          <Button type="submit" className="bg-db-blue hover:bg-blue-800" onClick={handleClose}>
            Speichern
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesModal;
