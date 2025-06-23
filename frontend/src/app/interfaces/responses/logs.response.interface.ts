export interface LogsResponse {
    code: number;
    description: string;
    data: Log[];
    }


export interface Log {

    id: number;
    timestamp: Date;
    type: number;
    user: number;
    usergroup: number;
    door: number;
    doorgroup: number;

}

export interface DeleteLogsResponse {
    code: number;
    description: string;
    data: boolean;
    }


