import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Player } from '../data/players';
import { X } from 'lucide-react';

interface CricketPitchProps {
  squad: Player[];
  onRemovePlayer: (id: string) => void;
}

export default function CricketPitch({ squad, onRemovePlayer }: CricketPitchProps) {
  // Sort squad into roles for positioning
  const batters = squad.filter(p => p.role === 'Batter');
  const bowlers = squad.filter(p => p.role === 'Bowler');
  const allRounders = squad.filter(p => p.role === 'All-rounder');

  return (
    <div className="flex-1 flex flex-col items-center justify-center bg-[radial-gradient(circle_at_50%_50%,_#1a1a1a_0%,_#121212_100%)] relative overflow-hidden">
      {/* Stadium Ambient Lights */}
      <div className="absolute top-0 w-full h-48 bg-gradient-to-b from-championship-gold/5 to-transparent opacity-30 pointer-events-none"></div>

      {/* Pitch Container */}
      <div className="w-[800px] h-full flex flex-col items-center justify-center transform scale-90 translate-y-8" style={{ perspective: '1200px' }}>
        <div 
          className="w-[450px] h-[600px] bg-[#1a1a1a] rounded-[100px] relative border-[6px] border-white/5 shadow-[0_40px_100px_rgba(0,0,0,0.8)]"
          style={{ transform: 'rotateX(55deg) rotateZ(0deg)' }}
        >
          {/* Pitch Grass Lines */}
          <div className="absolute inset-10 border-2 border-white/10 rounded-[60px] flex items-center justify-center">
            <div className="w-px h-full bg-white/5"></div>
            <div className="w-full h-px bg-white/5 absolute"></div>
          </div>

          {/* Crease Areas */}
          <div className="absolute top-12 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/20"></div>
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-16 border-2 border-white/20"></div>
        </div>

        {/* Player Slotted Icons (Counter-perspective) */}
        <div className="absolute inset-0 z-10 grid grid-rows-3 items-center justify-center py-20 pointer-events-none">
          
          {/* Batters */}
          <div className="flex justify-center gap-12 -translate-y-10 scale-90 pointer-events-auto">
             <AnimatePresence>
               {batters.map(player => (
                 <PitchPlayerSlot key={player.id} player={player} onRemove={onRemovePlayer} color="border-championship-gold" />
               ))}
               {Array.from({ length: Math.max(0, 4 - batters.length) }).map((_, i) => (
                 <EmptySlot key={`bat-empty-${i}`} label="BAT" />
               ))}
             </AnimatePresence>
          </div>

          {/* AR */}
          <div className="flex justify-center gap-16 scale-100 pointer-events-auto">
             <AnimatePresence>
               {allRounders.map(player => (
                 <PitchPlayerSlot key={player.id} player={player} onRemove={onRemovePlayer} color="border-stadium-red" />
               ))}
               {Array.from({ length: Math.max(0, 3 - allRounders.length) }).map((_, i) => (
                 <EmptySlot key={`ar-empty-${i}`} label="AR" />
               ))}
             </AnimatePresence>
          </div>

          {/* Bowlers */}
          <div className="flex justify-center gap-12 translate-y-10 scale-110 pointer-events-auto">
             <AnimatePresence>
               {bowlers.map(player => (
                 <PitchPlayerSlot key={player.id} player={player} onRemove={onRemovePlayer} color="border-white" />
               ))}
               {Array.from({ length: Math.max(0, 4 - bowlers.length) }).map((_, i) => (
                 <EmptySlot key={`bowl-empty-${i}`} label="BOWL" />
               ))}
             </AnimatePresence>
          </div>

        </div>
      </div>
    </div>
  );
}

function PitchPlayerSlot({ player, onRemove, color }: { player: Player, onRemove: (id: string) => void, color: string, key?: React.Key }) {
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="flex flex-col items-center group relative cursor-pointer"
      onClick={() => onRemove(player.id)}
    >
      <div className={`w-14 h-14 rounded-full border-2 ${color} bg-black/80 flex items-center justify-center shadow-[0_0_20px_rgba(255,215,0,0.2)] overflow-hidden transition-transform group-hover:scale-110`}>
         {player.image ? (
           <img src={player.image} alt={player.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
         ) : (
           <span className="text-xl font-black text-white/50">{player.name[0]}</span>
         )}
      </div>
      <span className={`text-[10px] mt-1 font-black bg-black/80 px-2 py-0.5 rounded ${color === 'border-championship-gold' ? 'text-championship-gold' : 'text-white'} border border-white/10 uppercase`}>
        {player.name.split(' ').pop()}
      </span>
      {/* Remove indicator on hover */}
      <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity bg-stadium-red text-white p-0.5 rounded-full scale-75">
         <X size={12} />
      </div>
    </motion.div>
  );
}

function EmptySlot({ label }: { label: string, key?: React.Key }) {
  return (
    <div className="flex flex-col items-center opacity-30 grayscale">
      <div className="w-12 h-12 rounded-full border-2 border-white/20 bg-white/5 flex items-center justify-center border-dashed">
        <span className="text-xl text-white/20 italic">+</span>
      </div>
      <span className="text-[8px] mt-1 font-bold text-white/40 uppercase tracking-widest">{label}</span>
    </div>
  );
}
