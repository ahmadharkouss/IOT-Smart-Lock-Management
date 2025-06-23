export interface UserGroupRequest
{
  name: string; // name of the user group
}

export interface UserGroupPatchRequest
{
  id: number;
  name: string; //name of the user group
  isadmin: boolean; //is the user an admin
  email: string; //email of the user

}

