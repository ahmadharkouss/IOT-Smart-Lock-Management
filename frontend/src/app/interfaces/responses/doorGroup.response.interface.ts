export interface DoorGroupResponse {
    code: number;
    description: string;
    data: DoorGroup  | DoorGroup [];
  }


  export interface DoorGroup {
    id: number;
    zone_name: string;
    createdAt: Date;
    doors: number[];
}

export interface DoorGroupIdsReponse {
  code: number;
  description: string;
  data: number[];
}
