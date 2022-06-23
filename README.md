# DogeWallet

Welcome to the initial version of DogeWallet.

You can log in, and **DogeWallet** will allow you to check your balance and add more money to your wallet.

Let's walk through the platform a little bit depeer.  
We will talk about its usability as well as its technical information. If you want to try it out directly, please jump to the Usability section.

## Technical info

> BACKEND

- The backend was developed with ExpressJS and the frontend with NextJS.
  In the future we could migrate everything on a single project with NextJS.

- You can login with username and password. In order to manage the session and auth, JWT is being used.
  For checking and generating the token, I created a middleware and a helper in order to stick to good practices.

- Once logged in, a token is sent to the front, and it is required to be sent on the headers to make a transaction.

- When making a new transaction, the input of the wallet address is not editable to avoid mistakes typing the address.

- The login form is also validated through a middleware, and send different errors according to the case.
  The add money form is not fully validated since I ran out of time.

- The users are stored in a MongoDB cluster online. I will provide the credentials needed also in the usability area. It was my first time using Mongo, I believe I set the DB correctly in order to you to get access, but please let me know if there is any inconvenience.
  You can find the model in the folder called so. I connect to the database through mongoose and with MongoDBCompass.

**CREDENTIALS:**
MongoDBCompass -> mongodb+srv://userDoge:passwordDoge@dogecluster.xdd54.mongodb.net/test

- I used a MVC desgin pattern in order to separate responsabilities and try to get the code more maintainable.

> FRONTEND

- Bootstrap, flexbox, and Next SSR have been used in the frontend among other technologies

- All the apiCalls are stored in a separate module

- A custom hook is used in order to check if there is a user in session

- The login form is checking and showing all the possible errors

- The styles are all linked on a modular way, except the globals

## Usability

> ### How to Run the Project
>
> 1. Clone the repository
>
> - git clone https://github.com/jorgeHerrando/DogeWallet.git
>
> 2. Open the folder created in VSCode or other IDE
>
> 3. There are two folders, access to one of each and install dependencies
>
> 4. Open MongoDB Compass, or download first if you do not have it
>
> 5. Enter the following url to connect to the DB
>
> mongodb+srv://userDoge:passwordDoge@dogecluster.xdd54.mongodb.net/test
>
> 6. Run the front end:
>
> npm run dev
>
> 7. Run the back end:
>
> npm start
>
> 8. In order to login, you can check the user and password in MongoDB Compass, but here it is some credentials below
>
> email --> jorge@gmail.com
> password --> jorgePassword
>
> 9. Time to navigate through the app!

Please let me knwo if you have any question!
