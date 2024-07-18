# AADL3 Registration Application

AADL3 Registration Application is an Electron-based desktop application designed to automate the registration process for AADL3. The application uses a form to collect user data and then sends this data to a server for processing. The application can also save, update, and delete user data locally.

## Features

- Collect user data through a form.
- Send collected data to a server for processing.
- Save, update, and delete user data locally.
- Display user data in a modal.
- Play a notification sound when data is successfully processed.
- Retry mechanism for data submission.

## Installation

To install and run the application, follow these steps:

1. **Clone the repository:**
    ```bash
    git clone https://github.com/TerminalDZ/aadl3-register-request.git
    cd aadl3-register-request
    ```

2. **Install dependencies:**
    ```bash
    yarn install
    ```

3. **Start the application:**
    ```bash
    yarn start
    ```

## Usage

1. **Starting the Application:**
    - Click the "التسجيل" button to start the registration process.
    - Click the "ايقاف" button to stop the registration process.

2. **Adding Data:**
    - Click the "إضافة" button to open a modal for adding new data.
    - Fill in the form and click "حفظ" to save the new data.

3. **Updating Data:**
    - Click the "عرض البيانات" button to view existing data.
    - Click the "تعديل" button on any data card to open a modal for updating data.
    - Fill in the form and click "حفظ التعديلات" to save the changes.

4. **Deleting Data:**
    - Click the "عرض البيانات" button to view existing data.
    - Click the "حذف" button on any data card to delete the data.

5. **Selecting Data:**
    - Click the "عرض البيانات" button to view existing data.
    - Click the "اختيار" button on any data card to fill the form with the selected data.

## Configuration

The application includes a settings panel where you can configure:
- Retry interval (in milliseconds)
- Maximum number of retries
- Cookie value

## File Structure

- `index.html`: The main HTML file for the application.
- `main.js`: The main Electron process script.
- `aadl3.js`: The renderer process script that handles the form and user interactions.
- `info.json`: The local data storage file.
- `package.json`: The project configuration file.

## Development

To build and publish the application:

1. **Build the application:**
    ```bash
    yarn build
    ```

2. **Publish the application:**
    ```bash
    yarn publish_app
    ```

## Contributing

If you would like to contribute to this project, please follow these steps:

1. Fork the repository.
2. Create a new branch: `git checkout -b my-feature-branch`.
3. Make your changes and commit them: `git commit -m 'Add my feature'`.
4. Push to the branch: `git push origin my-feature-branch`.
5. Submit a pull request.


## Contact

For any questions or feedback, please contact the author at [boukemoucheidriss@gmail.com](mailto:boukemoucheidriss@gmail.com).

