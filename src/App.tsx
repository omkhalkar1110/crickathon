/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import Header from './components/Header';
import PlayerPool from './components/PlayerPool';
import CricketPitch from './components/CricketPitch';
import ChatBot from './components/ChatBot';
import { INITIAL_PLAYERS, Player } from './data/players';
import { motion } from 'motion/react';

const MAX_BUDGET = 100;

export default function App() {
  const [history, setHistory] = useState<Player[][]>([[]]);
  const [pointer, setPointer] = useState(0);

  const squad = useMemo(() => history[pointer], [history, pointer]);

  const usedBudget = useMemo(() => {
    return squad.reduce((total, player) => total + player.price, 0);
  }, [squad]);

  const addToHistory = (newSquad: Player[]) => {
    const nextHistory = history.slice(0, pointer + 1);
    nextHistory.push(newSquad);
    setHistory(nextHistory);
    setPointer(nextHistory.length - 1);
  };

  const togglePlayer = (player: Player) => {
    const isAlreadyIn = squad.some((p) => p.id === player.id);
    let nextSquad;
    if (isAlreadyIn) {
      nextSquad = squad.filter((p) => p.id !== player.id);
    } else {
      if (squad.length >= 11) return;
      nextSquad = [...squad, player];
    }
    addToHistory(nextSquad);
  };

  const removePlayer = (id: string) => {
    const nextSquad = squad.filter((p) => p.id !== id);
    addToHistory(nextSquad);
  };

  const undo = () => {
    if (pointer > 0) setPointer(pointer - 1);
  };

  const redo = () => {
    if (pointer < history.length - 1) setPointer(pointer + 1);
  };

  const selectedIds = squad.map((p) => p.id);

  return (
    <div id="app-root" className="w-full h-screen bg-[#121212] text-white font-sans flex flex-col overflow-hidden relative">
      <Header 
        used={usedBudget} 
        max={MAX_BUDGET} 
        playerCount={squad.length} 
        onUndo={undo} 
        onRedo={redo} 
        canUndo={pointer > 0} 
        canRedo={pointer < history.length - 1} 
      />

      <main className="flex flex-1 overflow-hidden relative">
        <PlayerPool 
          players={INITIAL_PLAYERS} 
          selectedIds={selectedIds} 
          onTogglePlayer={togglePlayer} 
        />
        
        <CricketPitch 
          squad={squad} 
          onRemovePlayer={removePlayer} 
        />

        {/* Stats Overlay */}
        <div className="absolute bottom-8 right-8 flex gap-4 z-30">
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-lg flex flex-col items-center">
            <span className="text-[8px] uppercase text-white/40 tracking-widest font-bold">Proj. Points</span>
            <span className="text-2xl font-black text-championship-gold">
              {squad.reduce((a, b) => a + b.rating * 10, 0)}
            </span>
          </div>
          <div className="bg-white/5 border border-white/10 backdrop-blur-md p-4 rounded-lg flex flex-col items-center">
            <span className="text-[8px] uppercase text-white/40 tracking-widest font-bold">Win Prob.</span>
            <span className="text-2xl font-black text-stadium-red">74%</span>
          </div>
        </div>
      </main>

      <footer className="h-10 bg-black flex items-center px-8 border-t border-white/5 z-50">
        <div className="flex gap-6 text-[9px] uppercase tracking-tighter text-white/40 font-bold italic">
          <span>Rules & Scoring</span>
          <span>Squad Strength: <span className="text-green-500">ELITE</span></span>
          <span className="hidden md:inline">Formation: {squad.filter(p => p.role === 'Batter').length} BAT • {squad.filter(p => p.role === 'Bowler').length} BOWL • {squad.filter(p => p.role === 'All-rounder').length} AR</span>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-[9px] uppercase font-bold text-white/40">Live Server: Asia-South</span>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}

