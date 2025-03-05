# NoteSpeech

Note Speech is a web application that allows you to create text notes using your voice. It utilizes the voice recognition technology of API's and frameworks platform to provide a smooth and intuitive user experience.

## Requirements

- [Node.js](https://nodejs.org/) (Latest version recommended)

## Installation

1. **Clone this repository**:
   ```sh
   git clone https://github.com/EnricoGF/NoteSpeech
   ```
2. **Install dependencies**:
   ```sh
   npm install express sqlite3 cors
   ```
3. **Start the server**:
   ```sh
   node server.js
   ```
4. **Open `index.html` in your browser**.

## How It Works

1. Click "Start Recording" to begin speech recognition.
2. Click "Stop Recording" to finalize the transcription.
3. Click "Save Recording" to store the transcription in the database.
4. Saved transcriptions will be displayed in the "Saved Notes" section.
5. You can delete a saved note by clicking the "Delete" button.

## Technologies Used
- Node.js
- Express.js
- SQLite
- Web Speech API
- JavaScript (Frontend & Backend)
- HTML & CSS

## License
This project is open-source and available under the MIT License.