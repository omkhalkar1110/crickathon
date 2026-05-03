export type PlayerRole = 'Batter' | 'Bowler' | 'All-rounder';

export interface Player {
  id: string;
  name: string;
  role: PlayerRole;
  price: number;
  rating: number;
  image?: string;
  isOpener?: boolean;
  bowlingType?: 'Fast' | 'Spin';
}

export const INITIAL_PLAYERS: Player[] = [
  { id: '1', name: 'Virat Kohli', role: 'Batter', price: 12.0, rating: 95, isOpener: true, image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '2', name: 'Jasprit Bumrah', role: 'Bowler', price: 11.5, rating: 94, bowlingType: 'Fast', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '3', name: 'Hardik Pandya', role: 'All-rounder', price: 11.0, rating: 92, bowlingType: 'Fast', image: 'https://images.unsplash.com/photo-1624526267942-ab0ff8a3e972?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '4', name: 'Rohit Sharma', role: 'Batter', price: 11.5, rating: 93, isOpener: true, image: 'https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '5', name: 'Rashid Khan', role: 'Bowler', price: 10.5, rating: 91, bowlingType: 'Spin', image: 'https://images.unsplash.com/photo-1594470117722-de4b9a02ebed?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '6', name: 'Glenn Maxwell', role: 'All-rounder', price: 10.0, rating: 89, bowlingType: 'Spin', image: 'https://images.unsplash.com/photo-1590059345003-83234d7ee979?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '7', name: 'Steve Smith', role: 'Batter', price: 10.5, rating: 90, image: 'https://images.unsplash.com/photo-1512719994953-eabf50895df7?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '8', name: 'Pat Cummins', role: 'Bowler', price: 11.0, rating: 92, bowlingType: 'Fast', image: 'https://images.unsplash.com/photo-1533636721434-08161b0dd775?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '9', name: 'Ben Stokes', role: 'All-rounder', price: 11.5, rating: 93, bowlingType: 'Fast', image: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '10', name: 'Kane Williamson', role: 'Batter', price: 10.5, rating: 91, image: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '11', name: 'Trent Boult', role: 'Bowler', price: 10.0, rating: 89, bowlingType: 'Fast', image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '12', name: 'Andre Russell', role: 'All-rounder', price: 11.0, rating: 91, bowlingType: 'Fast', image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '13', name: 'Joe Root', role: 'Batter', price: 10.5, rating: 92, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '14', name: 'Mitchell Starc', role: 'Bowler', price: 10.5, rating: 91, bowlingType: 'Fast', image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '15', name: 'Shakib Al Hasan', role: 'All-rounder', price: 10.5, rating: 90, bowlingType: 'Spin', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '16', name: 'Babar Azam', role: 'Batter', price: 11.0, rating: 92, isOpener: true, image: 'https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '17', name: 'Mohammed Siraj', role: 'Bowler', price: 9.5, rating: 88, bowlingType: 'Fast', image: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '18', name: 'Ravindra Jadeja', role: 'All-rounder', price: 11.0, rating: 92, bowlingType: 'Spin', image: 'https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '19', name: 'Jos Buttler', role: 'Batter', price: 11.0, rating: 91, isOpener: true, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=100&h=100' },
  { id: '20', name: 'Kagiso Rabada', role: 'Bowler', price: 10.5, rating: 90, bowlingType: 'Fast', image: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?auto=format&fit=crop&q=80&w=100&h=100' },
];
