
import React from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Header = () => {
  return (
    <header className="bg-db-blue text-white p-4 flex justify-between items-center shadow-md">
      <div className="flex items-center" onClick={() => window.location.href = '/'}>
        <div className="bg-white text-db-blue font-bold text-2xl px-2 py-1 mr-2 rounded">
          Pendel
        </div>
        <h1 className="text-xl font-bold">AI</h1>
      </div>
      <Button variant="ghost" size="icon">
        <Settings className="h-6 w-6 text-white" />
      </Button>
    </header>
  );
};

export default Header;
