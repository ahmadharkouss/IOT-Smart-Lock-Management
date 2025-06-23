export interface UserRespsonse {
    code: number;
    description: string;
    data: User | User[];
  }
  

  export interface User {
    id: number;
    name: string;
    email: string;
    is_admin: boolean;
    user_groups: any[];
    CreatedAt: Date;
  }