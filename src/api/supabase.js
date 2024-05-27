import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// Example hook to fetch events
export const useEvents = () => useQuery({
    queryKey: ['events'],
    queryFn: () => fromSupabase(supabase.from('events').select('*')),
});

// Example hook to add an event
export const useAddEvent = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newEvent) => fromSupabase(supabase.from('events').insert([newEvent])),
        onSuccess: () => {
            queryClient.invalidateQueries('events');
        },
    });
};

/**
 * Types and relations based on openapi.json
 * 
 * Table: events
 * - id: bigint, primary key
 * - created_at: timestamp with time zone, default: now()
 * - name: text
 * - date: date
 * - description: text
 */