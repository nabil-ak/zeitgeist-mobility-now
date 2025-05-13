
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

interface PreferencesModalProps {
  onClose: () => void;
}

const PreferencesModal = ({ onClose }: PreferencesModalProps) => {
  const [open, setOpen] = useState(true);
  
  const handleClose = () => {
    setOpen(false);
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
            <RadioGroup defaultValue="realistic">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="realistic" id="realistic" />
                <Label htmlFor="realistic">Realistischste Ankunftszeit</Label>
              </div>
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
                <span className="text-sm text-gray-500">3</span>
              </div>
              <Slider
                id="max-transfers"
                defaultValue={[3]}
                max={5}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between">
                <Label htmlFor="max-walk">Max. Gehzeit pro Umstieg</Label>
                <span className="text-sm text-gray-500">10 min</span>
              </div>
              <Slider
                id="max-walk"
                defaultValue={[10]}
                max={20}
                step={1}
                className="w-full"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="avoid-crowding">Überfüllte Verbindungen vermeiden</Label>
                <p className="text-xs text-muted-foreground">Basierend auf historischen Daten</p>
              </div>
              <Switch id="avoid-crowding" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="safety-prio">Sicherheit priorisieren</Label>
                <p className="text-xs text-muted-foreground">Basierend auf Nutzerbewertungen</p>
              </div>
              <Switch id="safety-prio" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h3 className="font-medium">Verkehrsmittelpräferenzen</h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center space-x-2">
                <Switch id="train" defaultChecked />
                <Label htmlFor="train">Zug</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="tram" defaultChecked />
                <Label htmlFor="tram">Straßenbahn</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="bus" defaultChecked />
                <Label htmlFor="bus">Bus</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch id="subway" defaultChecked />
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
