interface Role {
  id: number;
  name: String
}

export interface Employee {
    id: number;
    name: string;
    email:string;
    roles: Role;
    phone: string;
    image: string;
    municipalite: String
}
