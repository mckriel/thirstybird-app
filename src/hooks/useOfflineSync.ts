import { useState, useEffect } from "react";

interface OfflineAction {
  id: string;
  type: string;
  data: any;
  timestamp: number;
  priority: number;
}

export const useOfflineSync = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [pendingActions, setPendingActions] = useState<OfflineAction[]>([]);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Load pending actions from localStorage
    const stored = localStorage.getItem('thirstybird-offline-actions');
    if (stored) {
      try {
        setPendingActions(JSON.parse(stored));
      } catch (error) {
        console.error('Failed to parse offline actions:', error);
      }
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  useEffect(() => {
    // Save pending actions to localStorage
    localStorage.setItem('thirstybird-offline-actions', JSON.stringify(pendingActions));
  }, [pendingActions]);

  const addOfflineAction = (type: string, data: any, priority: number = 3) => {
    const action: OfflineAction = {
      id: Date.now().toString(),
      type,
      data,
      timestamp: Date.now(),
      priority
    };

    setPendingActions(prev => [...prev, action]);

    // If we're online, try to sync immediately
    if (isOnline) {
      syncPendingActions();
    }
  };

  const syncPendingActions = async () => {
    if (!isOnline || pendingActions.length === 0) return;

    // Prioritize actions: 1 > 2 > 3
    const sortedActions = [...pendingActions].sort((a, b) => a.priority - b.priority);
    const actionsToSync = [...sortedActions];

    for (const action of actionsToSync) {
      try {
        // Simulate API call - replace with actual API calls
        await simulateApiCall(action);

        // Remove successful action
        setPendingActions(prev => prev.filter(a => a.id !== action.id));
      } catch (error) {
        console.error('Failed to sync action:', action, error);
        // Keep action in queue for retry
      }
    }
  };

  const simulateApiCall = async (action: OfflineAction) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    switch (action.type) {
      case 'ADD_TO_CART':
        console.log('Syncing cart addition:', action.data);
        break;
      case 'PLACE_ORDER':
        console.log('Syncing order placement:', action.data);
        break;
      case 'UPDATE_FAVORITES':
        console.log('Syncing favorites update:', action.data);
        break;
      default:
        console.log('Unknown action type:', action.type);
    }
  };

  // Auto-sync when coming back online
  useEffect(() => {
    if (isOnline) {
      syncPendingActions();
    }
  }, [isOnline]);

  return {
    isOnline,
    pendingActions,
    addOfflineAction,
    syncPendingActions
  };
};
