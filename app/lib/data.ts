import axios, { AxiosResponse } from "axios";
import { getErrorMessage } from "./utils";
import { MergedData, Post, User } from "./definitions";

export async function fetchTableData(currentPage: number): Promise<MergedData[] | { error: string }> {
  'use server'
  try {
    console.log(currentPage);
    const usersResponse: AxiosResponse<User[]> = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );
    const postsResponse: AxiosResponse<Post[]> = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?_start=${String(+currentPage * 10)}&_limit=8`
    );

    const mergedData: MergedData[] = postsResponse.data.map((post: Post) => {
      const [user] = usersResponse.data.filter((user: User) => user.id === post.userId);
      return {
      // userId: post.userId, // Add the userId property
      name: user.name,
      email: user.email,
      company: user.company.name,
      id: post.id,
      title: post.title,
      body: post.body,
      };
    });

    return mergedData.flat();
  } catch (error: unknown) {
    console.error("Error fetching data:", error);
    return {
      error: getErrorMessage(error),
    };
  }
}