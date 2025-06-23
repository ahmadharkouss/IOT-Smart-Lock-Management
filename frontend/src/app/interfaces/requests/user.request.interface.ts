export interface UserLoginRequest {
  email: string;
  password: string;
}
export interface UserRequest
{
  name: string;
  isadmin: boolean;
  email: string;

}

export interface UserPatchRequest
{
  id: number;
  name: string;
  isadmin: boolean;
  email: string;

}
