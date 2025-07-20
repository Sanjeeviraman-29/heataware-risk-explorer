// @ts-ignore
const { createClient } = window.supabase;

export const supabase = createClient(
  "https://hlodbqvzgayuhhlidjsn.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imhsb2RicXZ6Z2F5dWhobGlkanNuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMwMTk2NDIsImV4cCI6MjA2ODU5NTY0Mn0.FUI8eaZaSYU19bLIgOlEUIq7QeY3rfWbrYZRtdwSf6Y"
);

export type HeatwaveRisk = {
  id?: number;
  location: string;
  temperature: number;
  risk_level: 'Low' | 'Medium' | 'High' | 'Extreme';
  date: string;
  humidity?: number;
  population?: number;
};

export type MitigationStrategy = {
  id?: number;
  strategy: string;
  description: string;
  risk_level_targeted: 'Low' | 'Medium' | 'High' | 'Extreme' | 'All';
  impact?: string;
  cost?: string;
  timeframe?: string;
};

// Fetch heatwave data from Supabase
export const fetchHeatwaveData = async (location?: string): Promise<HeatwaveRisk[]> => {
  try {
    let query = supabase.from('heatwave_risks').select('*');
    
    if (location) {
      query = query.ilike('location', `%${location}%`);
    }
    
    const { data, error } = await query.order('date', { ascending: false });
    
    if (error) {
      console.error('Error fetching heatwave data:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchHeatwaveData:', error);
    return [];
  }
};

// Fetch mitigation strategies from Supabase
export const fetchMitigationStrategies = async (riskLevel?: string): Promise<MitigationStrategy[]> => {
  try {
    let query = supabase.from('mitigation_strategies').select('*');
    
    if (riskLevel && riskLevel !== 'All') {
      query = query.eq('risk_level_targeted', riskLevel);
    }
    
    const { data, error } = await query;
    
    if (error) {
      console.error('Error fetching mitigation strategies:', error);
      return [];
    }
    
    return data || [];
  } catch (error) {
    console.error('Error in fetchMitigationStrategies:', error);
    return [];
  }
};

// Get latest data for a specific location
export const getLocationData = async (pincode: string) => {
  try {
    const { data, error } = await supabase
      .from('heatwave_risks')
      .select('*')
      .ilike('location', `%${pincode}%`)
      .order('date', { ascending: false })
      .limit(1);
    
    if (error) {
      console.error('Error fetching location data:', error);
      return null;
    }
    
    return data?.[0] || null;
  } catch (error) {
    console.error('Error in getLocationData:', error);
    return null;
  }
};