# STEP BY STEP ENVIROMNENT SETTING AND GIT SETUP

On windows

Open Terminal and go to the address
user/<username>/documents/FCC-Backend-Certification

or simply start the terminal in the address

## clone the repo
git clone https://github.com/freeCodeCamp/boilerplate-project-urlshortener/

## Install node modules
npm install

## Install nodemon globally
npm install -g nodemon

## Check if it is installed
nodemon -v

## Run with nodemon
nodemon index.js

## Open with vs code
code .

# WRITE THE index.js CODE

# SET UP GIT 

## Initiate git
git init

## find which repo is used
git remote -v

## change repo url
git remote set-url origin https://github.com/Hamid6426/url-shortner

## Again find which repo is used
git remote -v

## In case: there is no repo is connected
git remote add origin https://github.com/Hamid6426/url-shortner

### NOW THE LAST STEP

git add .

git commit -m "Initial commit"

## add email and name there is an error

git config --global user.email "mianhamid6426@gmail.com"
git config --global user.name "Mian Hamid Ur Rehman"

git add .

git commit -m "Initial commit"

git branch -M main

git push -u origin main

# EASY WAY

Go to project directory
Select every file that need to be uploaded. ignore .env and node_modules
Drag and drop into github repo
Message: Initial commit
Commit

