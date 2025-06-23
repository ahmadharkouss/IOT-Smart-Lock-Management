export interface DoorGroupRequest
{
  name: string; // door group name
}

export interface DoorGroupPatchRequest
{
    id: number; // door group id
    name: string, // new door group name
    isadmin: boolean, // user is admin
    email: string // user email
  
}
