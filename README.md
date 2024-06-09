# 'Mark-It' Chrome Extension

Mark-It is a Chrome extension that allows users to highlight text on any webpage and save the highlighted text to a backend server for later retrieval and analysis. This README provides an overview of the project, installation instructions, usage guidelines, and contribution details.

## Table of Contents

- [Features](#features)
- [Usage](#usage)
- [File Directory](#FileDirectory)
- [Softwares Used](#Softwares)


## Features

- **Text Highlighting:** Easily highlight text on any webpage.
- **Save Highlights:** Save the highlighted text to a backend server.
- **Retrieve Highlights:** Retrieve saved highlights from the backend.
- **User-Friendly Interface:** Simple and intuitive interface for managing highlights.
- **Color:** Different color can be chosen by the user.

## Usage

1. **Highlight Text**

   - After installing the extension, first you need to Signup/Login on the webpage (to save your highlighted text in the backend).
   - Now, open any webpage and Select the text you want to highlight.
   - Open the extension.
   - Choose any color from color picker(optional)
   - Then, Click on **Highlight Text** button.

2. **Save Highlighted Text**

   - The highlighted text will be sent to the backend server and saved.

3. **View Saved Highlights**

   - You can view your saved highlights by navigating to the dashboard on the website of Mark-It  or You can click on the **See Your Highlighted Text**

4. **Delete Saved Highlights**

   - You can delete your saved highlights by clicking **DELETE** button on the dashboard on the website of Mark-It.

## File Directory

- **'HIGHLIGHTER':** It is the main Folder of the Project.
   - **'build':** Build Folder which is required for loading the Extension on chrome. 
   - **'public':** It contains the code for the interface of the Extension.
   - **'Server':** Whole Backend code is contained in it.
   - **'src':** The Frontend code for the webpage is present here.

## Softwares Used

- **Reactjs, MongoDB, Tailwind CSS**

(Due to privacy issues, the important data/keys are erased from the '.env' file in 'Server')

Thank you for using Mark-It! We hope this tool enhances your browsing experience by making it easy to highlight and save important information from the web. If you have any questions or feedback, please feel free to open an issue on GitHub.

Happy highlighting!