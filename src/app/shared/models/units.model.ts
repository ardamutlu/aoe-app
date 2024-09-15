export interface Unit {
  id: number;
  name: string;
  description: string;
  expansion: string;
  age: Age;
  cost?: Partial<Record<Cost, number>> | null;
  build_time?: number;
  reload_time?: number;
  attack_delay?: number;
  movement_rate?: number;
  line_of_sight: number;
  hit_points: number;
  range?: number | string;
  search_radius?: number;
  attack?: number;
  attack_bonus?: string[];
  armor_bonus?: string[];
  armor: string;
  accuracy?: string;
  blast_radius?: number;
}

export type Age = 'Dark' | 'Feudal' | 'Castle' | 'Imperial';
export type Cost = 'Food' | 'Gold' | 'Wood';
