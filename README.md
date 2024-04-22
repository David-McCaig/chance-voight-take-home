## chance-voight-take-home

Checkout the live site here 👉   [chance-voight-take-home](https://chance-voight-take-home-n9mr.vercel.app/table?page=0)


## My approach 

The first thing I did before starting this project was I sketched out a little plan for myself using eraser.io. I always find it's nice to plan out features I'd like to implement as well as what order I'd like to implement them to make everything as efficient as possible. After planning everything out I created my folder structure. I created a lib folder which held a data.ts file for fetching data, a definitions.ts to store all of my types for TypeScript and a utils file to hold any utility functions that I might make along the way. I also created one route for the table.

The data fetching was done using the newer server actions. Fetching data   on the server allowed me to only send the data I needed to the client. It can also be a more secure way of doing things since you're not exposing sensitive information like a user id. 

I implemented pagination for the table to reduce the amount of data that is being fetched every time the user loads the page. I ended up using the router to store the page number state in the url. I really like using this pattern because it means less state variables and it also creates a better user experience where users can bookmark the page that they are on.

I also set up a loading skeleton to give the user feedback when they are fetching more data. I've also set up error handling when there is an issue with fetching data. I set up a utility function that converts the error message format into a readable string so the user has a better idea what the issue might be.

## Challenges faced along the way

One challenge that I ran into was implementing a fallback loading screen using suspense. I think part of the issue might have been where I was fetching the data which was causing the fallback to not run. In the end I decided to create a loading state variable in the user-table and use conditional rendering to implement the loading skeleton. If I had more time I would have problem solved the issue I was having with suspense and the fallback.

## Some things I would have added if I had more time.

Some things I would have added if I had time would have been a way to search for different users and possibly a filter as well.  I would have also figured out a way to only fetch the user data that I needed for the page. At the moment I'm fetching all the user data every time I change the page. I would have also implemented an error tracking system like Sentry so I can know if users are experiencing any bugs while using the app.

## Run Locally

Clone the project

```bash
  git git@github.com:David-McCaig/chance-voight-take-home.git
```

Go to the project directory

cd into chance-voight-take-home

Install dependencies

```bash
  npm install 
```

Start the server on the client side 

```bash
  npm run start
```
Now the app should be live! 
