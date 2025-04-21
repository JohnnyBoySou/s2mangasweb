interface User {
    id: number;
    name: string;
    avatar: string;
  }
  
  interface Comment {
    id: number;
    manga_id: string;
    message: string;
    parent_id: number | null;
    created_at: string;
    likes: number;
    user: User;
  }
  