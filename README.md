Backend for a blocket.se like app for cars, which is meant to be used between car selling companies.

It is quite common that a company trades in a car from a customer as part of a sell.
A lot of the times though, this car selling company might not want to sell that particular 
car type. With this app they can put up these cars on an app that only other car selling 
companies can access. 
Today, this whole process of selling cars between companies is done via phone. This app
would streamline the process.

## How to run
You have to have a `.env` file looking like this:

```
DB_HOST=<host>
DB_USER=<user>
DB_PASSWORD=<password>
DB_NAME=<database-name>
```

Then simply run npm start.

***I have not tested this other than on my own computer, so something in the setup might not work for you***