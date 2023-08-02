interface User {
  createdAt: string;
  deletedAt: string | null;
  id: number;
  role: {
    createdAt: string;
    id: number;
    name: string;
  };
  name: string;
  surname: string;
  email: string;
  password: string;
  enabled: boolean;
  username: string;
  authorities: {
    authority: string;
  }[];
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  credentialsNonExpired: boolean;
}