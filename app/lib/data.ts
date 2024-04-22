import axios from "axios";
import { getErrorMessage } from "./utils";

type User = {
  id: number;
  name: string;
  email: string;
  company: {
    name: string;
  };
}

type Post = {
  userId: number;
  title: string;
  body: string;
}

interface MergedData extends Post {
  name: string;
  email: string;
  company: string;
}

export async function fetchTableData () {
  'use server';
    try {
        const usersResponse = await axios.get<any>(
          "https://jsonplaceholder.typicode.com/users"
        );
        const postsResponse = await axios.get<any>(
          "https://jsonplaceholder.typicode.com/posts"
        );
        console.log(usersResponse.data)
        const mergedData = postsResponse.data.map((post:any) => {
          const user = usersResponse.data.filter(
            (user:any) => user.id === post.userId
          );
          return {
            name: user[0].name,
            email: user[0].email,
            company: user[0].company.name,
            ...post,
          };
        })
        
        return mergedData.flat();
        
      } catch (error:unknown) {
        console.error("Error fetching data:", error);
        return {
            error: getErrorMessage(error),
        }
      }
}