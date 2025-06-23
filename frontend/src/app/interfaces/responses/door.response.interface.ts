export interface DoorResponse {
    code: number;
    description: string;
    data: Door  | Door [];
  }


export interface Door {
    id: number;
    name: string;
    door_groups: number[];
    created_at: Date;
}