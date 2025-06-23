export interface DoorRequest
{
    name: string; // door name

}

export interface DoorPatchRequest
{
    id : number; // door id
    name: string; // new door name
    isadmin: boolean; // user is admin
    email: string; // user email
  
}
