export type Genre = {
    id: string;
    name: string;
    color: string;
  };
  
  export type User = {
    id: number;
    name: string;
    email: string;
    avatar: string;
    coins: number;
    languages: string[]; // ["pt-br", "en"]
    birthdate: string;   // você pode converter para Date se quiser
    genres: Genre[];     // lista de gêneros
    role: "admin" | "user" | string; // ajustável se tiver mais papéis
  };
  
  export type AuthResponse = {
    status: boolean;
    user: User;
  };
  