#!/bin/bash

#prompt user for new name

read -p "Enter your new projects name: " NEW_NAME
#find and tr all instances of angular-template with the new name

#add exclude dirs
sudo find . -type f -exec sed -i "s/angular-template/$NEW_NAME/g" {} +

read -p "re init git?(y/N): " ans

if [[ $ans -eq "y" || $ans -eq "Y" ]]; then

    sudo rm -rf .git

    git init

    git branch -M main

fi

read -p "add a repo to main?(y/N): " ans
if [[ $ans -eq "y" || $ans -eq "Y" ]]; then
    
    read -p "repo url: " repo 
    git remote add origin $repo
    git add .
    git commit -m "init commit"
    git push --set-upstream origin main

fi

#install deps
npm i 