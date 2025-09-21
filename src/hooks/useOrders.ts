import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// Query keys
export const orderKeys = {
  all: ['orders'] as const,
  user: (userId: string) => [...orderKeys.all, 'user', userId] as const,
  venue: (venueId: string) => [...orderKeys.all, 'venue', venueId] as const,
};

// Types
export interface Order {
  id: string;
  user_id: string;
  venue_id: string;
  status: string;
  payment_status: string;
  payment_method: string;
  total_amount: number;
  final_amount: number;
  pickup_time: string;
  created_at: string;
  updated_at: string;
  special_instructions: string;
  order_type: string;
  barcode: string;
  order_items?: any[];
}

export const useOrders = (userId?: string) => {
  const queryClient = useQueryClient();

  const fetchOrders = async (): Promise<Order[]> => {
    // TODO: Replace with API call
    return [];
  };

  const {
    data: orders = [],
    isLoading,
    error,
    refetch
  } = useQuery({
    queryKey: ['orders', userId],
    queryFn: fetchOrders,
    enabled: !!userId,
  });

  const updateOrderStatus = useMutation({
    mutationFn: async ({ orderId, status }: { orderId: string; status: string }) => {
      // TODO: Replace with API call
      return { id: orderId, status };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });

  return {
    orders,
    isLoading,
    error,
    refetch,
    updateOrderStatus: updateOrderStatus.mutate,
    isUpdating: updateOrderStatus.isPending,
  };
};