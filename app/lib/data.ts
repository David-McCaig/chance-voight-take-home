import axios, { AxiosResponse } from "axios";
import { getErrorMessage } from "./utils";
import { MergedData, Post, User } from "./definitions";

export async function fetchTableData(currentPage: number): Promise<MergedData[] | { error: string }> {
  'use server' 

  try {
    console.log(currentPage);

    // Fetch users data from the API
    const usersResponse: AxiosResponse<User[]> = await axios.get<User[]>(
      "https://jsonplaceholder.typicode.com/users"
    );

    // Fetch posts data from the API, with pagination based on the currentPage parameter
    const postsResponse: AxiosResponse<Post[]> = await axios.get<Post[]>(
      `https://jsonplaceholder.typicode.com/posts?_start=${String(+currentPage * 10)}&_limit=10`
    );

    // Merge the users and posts data into a single array of MergedData objects
    const mergedData: MergedData[] = postsResponse.data.map((post: Post) => {
      // Find the user associated with the current post
      const [user] = usersResponse.data.filter((user: User) => user.id === post.userId);

      return {
        name: user.name,
        email: user.email,
        company: user.company.name,
        id: post.id,
        title: post.title,
        body: post.body,
      };
    });

    return mergedData.flat(); // Flatten the mergedData array and return it
  } catch (error: unknown) {
    console.error("Error fetching data:", error);

    // If an error occurs, return an object with an error property containing the error message
    return {
      error: getErrorMessage(error),
    };
  }
}