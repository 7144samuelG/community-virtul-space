import create from 'zustand';

// Define the state type
type ChannelState = {
 channel: string | null;
 setChannel: (channel: string) => void;
};

// Create the store
const useChannelStore = create<ChannelState>((set) => ({
 channel: null, // Initial state
 setChannel: (channel) => set({ channel }), // Function to update the channel
}));

export default useChannelStore;