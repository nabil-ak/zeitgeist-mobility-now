import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import RouteForm from '@/components/RouteForm';
import RoutesContainer from '@/components/RoutesContainer';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

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

const MOCK_ROUTES: Route[] = [
  {
    id: 1,
    departure: '13:45',
    arrival: '15:22',
    scheduledArrival: '15:10',
    duration: '1h 37min',
    transfers: 1,
    stations: [
      {
        name: 'Berlin Hbf',
        type: 'start',
        time: '13:45',
        platform: '7'
      },
      {
        name: 'Leipzig Hbf',
        type: 'transfer',
        time: '14:52',
        transit: 'S-Bahn S1',
        platform: '10'
      },
      {
        name: 'Dresden Hbf',
        type: 'end',
        time: '15:22'
      }
    ],
    crowd: 'medium',
    delay: 'medium',
    safety: 'good',
    price: '29,90'
  },
  {
    id: 2,
    departure: '14:15',
    arrival: '15:37',
    scheduledArrival: '15:35',
    duration: '1h 30min',
    transfers: 0,
    stations: [
      {
        name: 'Berlin Hbf',
        type: 'start',
        time: '14:15',
        platform: '12'
      },
      {
        name: 'Dresden Hbf',
        type: 'end',
        time: '15:37'
      }
    ],
    crowd: 'high',
    delay: 'low',
    safety: 'medium',
    price: '32,50'
  },
  {
    id: 3,
    departure: '14:32',
    arrival: '16:30',
    scheduledArrival: '15:55',
    duration: '1h 33min',
    transfers: 2,
    stations: [
      {
        name: 'Berlin Hbf',
        type: 'start',
        time: '14:32',
        platform: '5'
      },
      {
        name: 'Königs Wusterhausen',
        type: 'transfer',
        time: '14:55',
        transit: 'RE3',
        platform: '2'
      },
      {
        name: 'Cottbus',
        type: 'transfer',
        time: '15:30',
        transit: 'RE8',
        platform: '1'
      },
      {
        name: 'Dresden Hbf',
        type: 'end',
        time: '16:30'
      }
    ],
    crowd: 'low',
    delay: 'high',
    safety: 'good',
    price: '27,90'
  }
];

const STORAGE_KEY = 'saved_routes';

const Index = () => {
  const [routes, setRoutes] = useState<Route[]>([]);
  const [savedRoutes, setSavedRoutes] = useState<Route[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  // Load saved routes from localStorage on component mount
  useEffect(() => {
    const savedRoutesJson = localStorage.getItem(STORAGE_KEY);
    if (savedRoutesJson) {
      try {
        const parsedRoutes = JSON.parse(savedRoutesJson);
        setSavedRoutes(parsedRoutes);
      } catch (error) {
        console.error('Error loading saved routes:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
  }, []);
  
  // Save routes to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(savedRoutes));
  }, [savedRoutes]);
  
  const handleSearch = () => {
    setIsLoading(true);
    
    // Simulate API call with delay
    setTimeout(() => {
      setRoutes(MOCK_ROUTES);
      setIsLoading(false);
      toast.success("Verbindungen wurden auf KI-Basis optimiert", {
        description: "Die angezeigten Ankunftszeiten basieren auf historischen Verspätungsdaten",
      });
    }, 1500);
  };

  const handleSaveRoute = (route: Route) => {
    const isAlreadySaved = savedRoutes.some(savedRoute => savedRoute.id === route.id);
    
    if (isAlreadySaved) {
      setSavedRoutes(savedRoutes.filter(savedRoute => savedRoute.id !== route.id));
      toast.info("Route entfernt", {
        description: "Die Route wurde aus Ihren gespeicherten Reisen entfernt",
      });
    } else {
      setSavedRoutes([...savedRoutes, route]);
      toast.success("Route gespeichert", {
        description: "Die Route wurde zu Ihren gespeicherten Reisen hinzugefügt",
      });
    }
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-2xl">
        <h2 className="text-2xl font-bold mb-4 text-db-blue">Intelligente Verbindungssuche</h2>
        
        <Tabs defaultValue="search" className="w-full">
          <TabsList className="grid w-full grid-cols-2 h-12 bg-gray-100">
            <TabsTrigger value="search" className="text-base">Verbindung suchen</TabsTrigger>
            <TabsTrigger value="trips" className="text-base">Meine Reisen</TabsTrigger>
          </TabsList>
          
          <TabsContent value="search" className="mt-4 space-y-6">
            <RouteForm onSearch={handleSearch} />
            
            {(isLoading || routes.length > 0) && (
              <div className="mt-6">
                <RoutesContainer 
                  routes={routes} 
                  isLoading={isLoading}
                  onSaveRoute={handleSaveRoute}
                  savedRouteIds={savedRoutes.map(route => route.id)}
                />
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="trips">
            {savedRoutes.length > 0 ? (
              <div className="mt-4">
                <RoutesContainer 
                  routes={savedRoutes} 
                  isLoading={false}
                  onSaveRoute={handleSaveRoute}
                  savedRouteIds={savedRoutes.map(route => route.id)}
                />
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center bg-white rounded-lg shadow-md p-8 mt-4">
                <h3 className="text-lg font-medium mb-2">Keine gespeicherten Reisen</h3>
                <p className="text-sm text-gray-500">
                  Hier werden Ihre gespeicherten und geplanten Reisen angezeigt
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>
      
      <footer className="bg-gray-200 py-4">
        <div className="container mx-auto px-4 text-center text-sm text-gray-600">
          <p>© 2025 PendelAI - Jetzt weißt du, wann die Bahn wirklich kommt</p>
          <p className="text-xs mt-1">Die KI-Prognosen basieren auf historischen Daten und können von der tatsächlichen Reisezeit abweichen</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
