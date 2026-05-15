import { createContext, useContext, useState } from 'react';

type AppDataType = {
  players: any[];
  matches: any[];
  officials: any[];
  tournaments: any[];

  setplayers: any;
  setMatches: any;
  setOfficials: any;
  setTournaments: any;
};

const AppDataContext = createContext<AppDataType | null>(null);

export function AppDataProvider({ children }: any) {
  const [players, setplayers] = useState<any[]>([]);
  const [matches, setMatches] = useState<any[]>([]);
  const [officials, setOfficials] = useState<any[]>([]);
  const [tournaments, setTournaments] = useState<any[]>([]);

  return (
    <AppDataContext.Provider
      value={{
        players,
        matches,
        officials,
        tournaments,
        setplayers,
        setMatches,
        setOfficials,
        setTournaments,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
}

export const useAppData = () => {
  const ctx = useContext(AppDataContext);
  if (!ctx) throw new Error('AppDataProvider missing');
  return ctx;
};