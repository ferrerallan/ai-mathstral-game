
# AI Mathstral Game: Star Hunter

## Description

**Star Hunter** is a browser-based game where a player-controlled square moves within a canvas to collect stars. The game integrates with a locally hosted **Mathstral** model to analyze and automate player movements based on simple mathematical comparisons. This project demonstrates the combination of game development and AI model integration using JavaScript.

The game includes:

- A responsive game canvas with collision detection and scoring mechanics.
- Integration with a Mathstral AI model to decide the best moves for the player.
- Autoplay functionality that utilizes AI decisions to control the player's movement toward stars.

## Requirements

To run the game and enable the AI model integration:

1. A web browser supporting HTML5 and JavaScript.
2. A locally hosted Mathstral model running with Ollama.
3. [Ollama](https://ollama.com/) installed to serve the Mathstral model.

## Mode of Use

### Game Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ferrerallan/ai-mathstral-game.git
   ```
2. Navigate to the project directory:
   ```bash
   cd ai-mathstral-game
   ```
3. Open the `index.html` file in a browser:
   - Double-click the file, or use a local web server like:
     ```bash
     python -m http.server
     ```
   - Navigate to `http://localhost:8000` in your browser if using a local server.

### Running the Mathstral Model Locally

1. Install [Ollama](https://ollama.com/) on your machine.
2. Download the Mathstral model:
   - Use the following command in your terminal:
     ```bash
     ollama pull mathstral
     ```
   - This will download and set up the `mathstral` model locally.
3. Start the Mathstral model:
   - Use Ollama to serve the model with the following command:
     ```bash
     ollama serve
     ```
   - By default, the server will run at `http://localhost:11434`.

### Game Controls

- **Manual Mode**:
  - Use the input field to type `U` (up), `D` (down), `L` (left), or `R` (right).
  - Press the "Move" button to move the player.
- **Autoplay Mode**:
  - The AI model automatically decides the player's movement toward the star.

## Features

1. **Interactive Gameplay**: Players can manually control or watch the AI take over with autoplay.
2. **AI Integration**:
   - Uses Mathstral's model for generating movement decisions based on star and player positions.
   - Prompts are structured to ensure precise mathematical comparisons and decisions.
3. **Dynamic Environment**:
   - Player and stars are rendered on a responsive HTML5 canvas.
   - Real-time distance calculation and collision detection.
4. **Score Tracking**:
   - Tracks the number of stars collected during gameplay.
   - Displays the distance between the player and the star in real-time.

## License

This project is licensed under the MIT License.
