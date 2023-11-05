
## React CLI Component Documentation

## Overview 
The React CLI component is a command-line interface (CLI) implemented in a React application using create-react-app. It allows users to interact with the application through a text-based interface, providing various commands to execute actions and obtain information.

## Features

  

-  **Execute commands:** The CLI supports various commands to perform actions within the application.

-  **Display output:** The output of executed commands is displayed in a preformatted text area.

-  **Chart rendering:** The CLI can render charts based on data provided as a response.
- **Upload/Delete File:** The CLI can upload  a file to the server as well as delete it from the server.  

## Libraries Used 

-   **File Upload**: multer.js
-   **Line Chart**: recharts.js
-   **Backend Server Logic and Routing**: Node.js, Express.js
-   **CSV Parsing**: papaparse.js
  

## Installation

  

The project contains two directories: `front-end` and `back-end`. The `front-end` contains the front-end source code, while the `back-end` directory contains backend server logic.

  

1. First, navigate to the `front-end` directory.
2. Install the required dependencies using npm:
   ```sh
   npm install` 

1. Start the development server:

   ```sh
   npm start`

2.  Navigate to the `back-end` directory.
    
3.  Install the required dependencies using npm:
    ```sh
    npm install`
    
4.  Start the backend server:
    ```sh
    node server.js`


Access the application in your web browser at [http://localhost:3000](http://localhost:3000/).





## Usage

1.  Launch the CLI by opening the application in your web browser.
    
2.  Enter commands in the input field and press Enter to execute them.
    
3.  The output of executed commands will be displayed in the preformatted text area.
    

### Drawing Charts

To draw charts, use the "draw" command followed by the filename and column names. For example: 

`draw "Solana Historical Data.csv" Date Price 'Change %'` 

This command will draw a chart based on the specified data columns. Use single or double quotes around column names that have spaces in them (e.g. "Change %").

## Available Commands

-   `help`: Display a list of available commands and their descriptions.
-   `about`: Show information about the CLI, including its version and purpose.
-   `fetch-price [pair]`: Fetch the current price of a specified cryptocurrency.
-   `upload`: Open the file explorer to allow uploading CSV files only.
-   `draw [file] [columns]`: Draw a chart based on the specified columns of a file present in the "draw-chart" directory.
-   `delete [file]`: Delete a file on the server.

## Examples

-   To fetch the price of a cryptocurrency (e.g., Bitcoin), use the following command:
     
    `fetch-price BTCUSDT` 
    
-   To upload a CSV file, use the "upload" command and follow the on-screen instructions.
    
-   To draw a chart based on specific data columns from a file, use the "draw" command:
     
    `draw YourFile.csv column1 column2 column3` 
    

## Notes

-   Make sure to replace `YourFile.csv` and column names with actual file and column names.
-   The CLI supports basic keyboard shortcuts, such as Enter to execute commands and Arrow Up to recall the previous command.