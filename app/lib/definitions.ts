export type User = {
    id: number;
    name: string;
    email: string;
    company: {
      name: string;
    };
  }
  
  export type Post = {
    userId: number;
    title: string;
    body: string;
    id: number;
  }
  
  export interface MergedData {
    name: string;
    email: string;
    company: string;
    id: number;
    title: string;
    body: string;
  }