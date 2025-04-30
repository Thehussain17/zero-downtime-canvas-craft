
export interface Technician {
  Log_ID: string;
  Machine_ID: string;
  Technician: string;
  Date: string;
  Issue: string;
  Type: string;
  Action_Taken: string;
  Status: string;
}

export interface WorkOrder {
  Log_ID: string;
  Machine_ID: string;
  Technician: string;
  Date: string;
  Issue: string;
  Type: string;
  Action_Taken: string;
  Status: string;
}

export interface Equipment {
  Machine_ID: string;
  Machine_Name: string;
  Type: string;
  Location: string;
  Status: string;
  Health: string;
  Last_Check: string;
  Image_URL: string;
}
