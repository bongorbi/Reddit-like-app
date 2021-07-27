# Reddit-like-app

The application is something like a simple reddit for posts. It has backend and frontend directories.

## Backend

Contains koa server which is working on port 3002. Contains Posts.js file that stores the test data and the methods for
it. Methods.js file maps and contains the exported methods from posts.test.js and exports them to the router.js. Router.js
contains all the endpoints of the server.

## Frontend

Contains basic Login page to identify the current user and stores all the users in array in the Local storage. Contains
Posts.js file that stores all the posts that came from the backend trough requests and displays them on the fron page.
Every user can upvote and downvote the posts and can make new ones. Everyone can open a specific post and there can see
all the comments, upvotes, downvotes, and autor of the post. Every user can reply to the post or the comments of the
post and can upvote or downvore them. After all the user can logout and the app goes on the login page.

## Install

This project uses [node](http://nodejs.org), [npm](https://npmjs.com), [koa](https://koajs.com/)
, [React](https://reactjs.org/). You can install all the dependencies of the project using

```sh
$ npm install
```

After that you can start the project using

```sh
$ npm run server
```

to start the koa server and

```sh
$ npm run serve
```

to start the React app. After that go on http://localhost:3000 and the app is running. 
