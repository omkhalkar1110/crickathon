import { collection, doc, addDoc, updateDoc, onSnapshot, serverTimestamp, getDoc } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { Player } from '../data/players';

export interface Challenge {
  id: string;
  creatorId: string;
  creatorName: string;
  creatorSquad: Player[];
  opponentId?: string;
  opponentName?: string;
  opponentSquad?: Player[];
  status: 'pending' | 'active' | 'completed';
  winnerId?: string;
  createdAt: any;
  penaltyShared?: boolean;
}

export async function createChallenge(squad: Player[], userName: string) {
  if (!auth.currentUser) throw new Error('Not authenticated');

  const challengeData = {
    creatorId: auth.currentUser.uid,
    creatorName: userName || 'Legendary Player',
    creatorSquad: squad,
    status: 'pending',
    createdAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, 'challenges'), challengeData);
  return docRef.id;
}

export async function acceptChallenge(challengeId: string, squad: Player[], userName: string) {
  if (!auth.currentUser) throw new Error('Not authenticated');

  const challengeRef = doc(db, 'challenges', challengeId);
  await updateDoc(challengeRef, {
    opponentId: auth.currentUser.uid,
    opponentName: userName || 'Challenger',
    opponentSquad: squad,
    status: 'active',
  });
}

export async function completeChallenge(challengeId: string) {
  const challengeRef = doc(db, 'challenges', challengeId);
  const challengeSnap = await getDoc(challengeRef);
  
  if (!challengeSnap.exists()) return;
  
  const data = challengeSnap.data();
  // Simple mock resolution: random winner
  const winnerId = Math.random() > 0.5 ? data.creatorId : data.opponentId;

  await updateDoc(challengeRef, {
    status: 'completed',
    winnerId: winnerId,
  });
}

export async function markPenaltyShared(challengeId: string) {
  const challengeRef = doc(db, 'challenges', challengeId);
  await updateDoc(challengeRef, {
    penaltyShared: true,
  });
}
