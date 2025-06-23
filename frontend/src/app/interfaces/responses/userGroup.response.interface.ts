export interface UserGroupResponse {
    code: number;
    description: string;
    data: UserGroup | UserGroup[];
  }
  

export interface UserGroup {
    id: number;
    name: string;
    users: number[];
    door_groups: number[];
    CreatedAt: Date;
}
export interface UserGroupIdsReponse {
  code: number;
  description: string;
  data: number[];
}
