# 30 Second Interaction 2.0 – Design Document

**AIM**  
My aim is to make the next version of my maze game. In this version, I want to add five levels. When the player reaches the end of one maze, the next level will start. The goal is to make the game feel like a journey where the player moves from one maze to another until they finish all the levels.

**HOW I WOULD DO IT**  
I will use classes and objects to organize the code.  
I will make a **Game** class to control the game state and levels.  
Each level will be made using a **Level** class that will store the walls, background, and castle position.  
The player will be a **Player** class with movement, animation, and collision functions.  
I will use a **gameState** variable to keep track of which level is active.  
When the player reaches the end of the maze, the gameState will change and load the next level.  
After the fifth level, a final message or ending screen will show that the game is complete.  
I will also make the code easier to read by keeping setup and drawing for each level inside their own functions.  
I will add **sounds** for walking, hitting walls, and reaching the end to make the game feel more alive.

**WHAT I WANT TO DO WITH IT**  
I want to make a fun and simple game that teaches me how to use object-oriented programming in p5.js.  
I also want to learn how to make smooth level transitions and manage game states.  
In the future, I may add new sprites or different maze designs to make it more exciting.  
This project will help me understand how real games handle multiple levels and organized code.
