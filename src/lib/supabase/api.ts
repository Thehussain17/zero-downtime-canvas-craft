
import { supabase } from './client';
import { Technician, WorkOrder, Equipment } from './types';
import { useQuery } from '@tanstack/react-query';

// Fetch technicians
export const fetchTechnicians = async (): Promise<Technician[]> => {
  const { data, error } = await supabase
    .from('technichians')
    .select('*');
  
  if (error) {
    console.error('Error fetching technicians:', error);
    throw new Error(`Failed to fetch technicians: ${error.message}`);
  }
  
  return data || [];
};

// Fetch work orders from maintenance_log
export const fetchWorkOrders = async (): Promise<WorkOrder[]> => {
  const { data, error } = await supabase
    .from('maintenance_log')
    .select('*')
    .order('Date', { ascending: false });
  
  if (error) {
    console.error('Error fetching work orders:', error);
    throw new Error(`Failed to fetch work orders: ${error.message}`);
  }
  
  return data || [];
};

// Fetch equipment from machines table
export const fetchEquipment = async (): Promise<Equipment[]> => {
  const { data, error } = await supabase
    .from('machines')
    .select('*');
  
  if (error) {
    console.error('Error fetching equipment:', error);
    throw new Error(`Failed to fetch equipment: ${error.message}`);
  }
  
  return data || [];
};

// React Query hooks for easy data fetching
export const useTechnicians = () => {
  return useQuery({
    queryKey: ['technichians'],
    queryFn: fetchTechnicians,
  });
};

export const useWorkOrders = () => {
  return useQuery({
    queryKey: ['maintenance_log'],
    queryFn: fetchWorkOrders,
  });
};

export const useEquipment = () => {
  return useQuery({
    queryKey: ['machines'],
    queryFn: fetchEquipment,
  });
};
