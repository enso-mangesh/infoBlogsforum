import { create } from 'zustand';
import { Discussion } from '../types/forum.types';


interface DiscussionsState {
  discussions: Discussion[];
  addDiscussion: (discussion: Discussion) => void;
}

export const useDiscussionsStore = create<DiscussionsState>((set) => ({
  discussions: [],
  addDiscussion: (discussion) =>
    set((state) => ({ discussions: [discussion, ...state.discussions] })),
}));