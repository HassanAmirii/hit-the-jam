# 🍞 BREADJAM: The Arcade Word Game

## Overview

BREADJAM is a fast-paced, reflex-driven arcade word game designed to challenge players' quick thinking and pattern recognition. The objective is to identify and select the correct "BREAD" or "JAM" related words from a dynamic set of choices, avoiding deceptive decoys, all while racing against an increasing time pressure.

## Features

- **Engaging Gameplay**: A simple yet addictive core loop focused on quick decision-making.
- **Responsive Design**: Optimized for a seamless experience across various screen sizes, from desktop to mobile.
- **Local High Score Tracking**: Persistently saves the player's highest score using browser local storage.
- **Combo System**: Rewards players with bonus experience points for correctly identifying the special "BREADJAM" target.
- **Dynamic Difficulty**: The game speed increases with each correct answer, progressively challenging player reflexes.
- **Retro Terminal Aesthetic**: A sleek, minimal UI with a dark theme and neon accents, reminiscent of classic arcade terminals.
- **Clear Feedback**: Instant visual and scoring updates for correct and incorrect selections.

## Usage

To play BREADJAM, follow these simple steps:

1.  **Access the Game**:
    - Open the `index.html` file in your preferred web browser. This will take you to the game's welcome screen.

2.  **Understand the Rules**:
    - On the welcome screen, you'll find a brief overview of the game's mechanics:
      - **Objective**: Match the target word displayed by an emoji.
      - **Avoid**: Words like "Bred", "Braid", "Jamb", which are similar but incorrect.
      - **Hit Rate**: Correctly selecting "bread" or "jam" words grants +10 XP.
      - **Combo**: Hitting the special "breadjam" target yields +50 XP.
      - **Time**: Decisions must be made quickly; the game speeds up as you progress.

3.  **Start the Game**:
    - Click the prominent "Start Game" button on the welcome screen. You will be redirected to the active game session.

4.  **Gameplay**:
    - An emoji (🍞 for BREAD, 🍓 for JAM, or 🥪 for BREADJAM) will appear at the top, indicating your target category.
    - Below the emoji, a set of four buttons will display various words.
    - Your task is to quickly identify and click the button that contains the _correct_ word corresponding to the target emoji.
    - If you choose correctly, your XP score will increase, the game speed will slightly accelerate, and a new target will appear.
    - If you choose incorrectly or fail to make a selection before the timer runs out, the game will end.

5.  **Game Over**:
    - Upon game over, your final XP will be displayed, along with the option to "START AGAIN" to reboot the session. Your highest score will persist across sessions, stored in your browser's local storage.

## Technologies Used

| Technology     | Description                                  |
| :------------- | :------------------------------------------- |
| **HTML5**      | Structures the game's interface and content  |
| **CSS3**       | Styles the visual presentation and layout    |
| **JavaScript** | Implements core game logic and interactivity |
