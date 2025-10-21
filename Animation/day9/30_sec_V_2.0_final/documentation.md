# Maze Game Project Documentation

## Aim of the Project
The aim of this project was to create a simple maze game using p5js where the player can move around and find a way out of the maze. I wanted to make a game that had multiple maze layouts and different levels instead of just one single maze. I also wanted to have a start screen before the game begins and an end screen that appears when the player finishes the maze. The idea of the game is to make it look like the player is trapped in hell and has to move through the maze to escape but in the end even the devil is trapped in hell so there is no escape

---

## What I Did
I started by writing a simple version of the maze game where there was only one maze layout. In that version the player could move up down left and right and collide with walls. After I understood that part properly I wanted to make the game more complex and add more levels and game states

So in this version I used two background images and made two different maze layouts. Each maze has its own wall images and background. I used arrays to load all the wall images and added them into the game using a Wall class. The player character uses a sprite sheet that changes animation based on the direction the player moves  

I created a start screen where the game shows a message saying “Press Enter to Start” and the player has to press the enter key to begin the game. Then when the player touches a specific area in the maze the game moves to the next level. When the player finishes the last maze an end screen appears that says “The devil is also trapped in hell”  

I used different game states to control which part of the game is running like start screen, level one, level two, and end screen. This helped to organize the game and make it easier to manage what happens on each screen  

The code has three main classes — Player, Wall, and the main sketch.js file. The Player class controls the movement, direction, animation, and collision with the walls. The Wall class shows the maze walls and textures. The main file handles everything like level changes, transitions, and what to draw on screen  

---

## Problems and Challenges
While writing the code I ran into some small syntax errors and spelling mistakes especially when I was copying parts from the previous version of my maze game. Sometimes the code would not run because of a missing bracket or a misspelled variable name  

I also had some trouble finding where I made mistakes because there were many parts in the code like arrays, loops, and different functions. To fix that I checked my previous class codes and compared them with my current code  

When I was still not able to find the error I used ChatGPT as a debugging tool. It helped me understand what was wrong and most of the time the issue was something simple like a spelling error or missing comma. After fixing those problems the game worked fine  

Another small issue I had was with the transition area between levels. Sometimes the player was not switching to the next level because of wrong coordinates or zone size. After adjusting those values it started working correctly  

---

## Future Improvements
In the future I would like to add background music and sound effects to make the game feel more alive. I also want to add more levels and maybe make the levels loop infinitely so that the player never really escapes and it feels like being trapped in hell forever  

I can also add new obstacles like moving walls or enemies that chase the player to make the game more challenging. I would also like to add a small story or dialogue at the start and end to make it more meaningful  

For now the game works properly and I am happy with how it turned out. It helped me understand how to use classes, images, sprite animations, and game states in p5js  
