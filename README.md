# Team4-MOSS 

Hi we are team Moss. Our goal is to create a website to help children learn about a new vocab word everyday. This can help children easily prepare for the SAT from an early age. 

Using Javascript and MongoDB. 

## User Manual
### To Run

Clone the code into visual studio code.

``` node seed.js ``` to run the seed file

``` npm i ``` to install packages

``` npm start ``` to start on local 3000

## Security Feature

### To Sign up or Log in 
Click on the sign up or log in buttons on the upper right corner. 

#### Sign Up
1. Provide your valid email, username, and password. 
2. You can choose the visibility of the password by clicking on the 'eye'
3. If you are a parent, you can input you child's username, and you are allowed to add children to your account
4. Child accounts must be made first before parent as it is required for the parent to provide the username of the child account on sign-up.
5. If you are a child, you can go ahead and create your account.

#### Log In
1. Provide your valid username and password
2. If you successfully sign in, you will see the home page with no sign up/log in button. They are replaced by 'Profile' 

#### Log Out
1. You are able to log out of your current account if you need to log into other accounts. 

#### Passwords
All passwords are bcrypt hashed, offering save and secure user usability.

#### Payment Feature
Allows only parent users to pay for a feature that allows all his/her children to see hints for fill in the blank.

## Core Features

### To Explore Vocab Features

#### Learning Feature
Website generates one word to learn each day. Learn vocab with type and definition. 

#### Spelling Feature
Play a game to check if you know how to spell the word!

#### Fill In The Blank Feature
Play a game where there would be blank spaces where you would need to fill in the right word!
Child has access to help to make the game easier.

#### Multiple Choice Feature
Take a multiple choice quiz. Parents and Children are able to take a multiple choice quiz that shows whether they get it correct or not. If a child gets it correct, their score then gets incremented. Note that the correct and level only account for the number of correct answers to multiple choice.

### Leaderboard Feature
See who has answered the most amount of questions correctly. Child users will be compared to other child users. This score is taken from the Multiple Choice Quiz.

## Profile Feature
User opens a page where it displays all of the user's information. Within the website, parents are able to see their child's progess and see ho much they have improved. Parents can also see what words they have learned for the day. The parent is able to make a payment on the profile page. 
