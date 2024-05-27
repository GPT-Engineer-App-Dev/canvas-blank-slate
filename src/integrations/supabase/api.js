import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from './client';

// Helper function to handle Supabase queries
const fromSupabase = async (query) => {
  const { data, error } = await query;
  if (error) throw new Error(error.message);
  return data;
};

// Fetch events
export const useEvents = () => useQuery({
  queryKey: ['events'],
  queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

// Add a new event
export const useAddEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

// Update an event
export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updatedEvent) => fromSupabase(supabase.from('events').update(updatedEvent).eq('id', updatedEvent.id)),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

// Delete an event
export const useDeleteEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (eventId) => fromSupabase(supabase.from('events').delete().eq('id', eventId)),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
    },
  });
};

/**
 * Types and relations based on openapi.json:
 * 
 * type Event = {
 *   id: number;
 *   created_at: string;
 *   name: string;
 *   date: string;
 *   description: string;
 * };
 * 
 * - id: Primary Key
 * - created_at: Timestamp
 * - name: Text
 * - date: Date
 * - description: Text
 */