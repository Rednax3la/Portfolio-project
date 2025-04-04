
Built by https://www.blackbox.ai

---

```markdown
# Portfolio - Alexander Kihoi

## Project Overview
This project is a personal portfolio website designed to showcase the skills and projects of Alexander Kihoi, a Data Scientist and Analyst. It highlights key information about his education, skills, relevant projects, and provides contact details. The website is built using HTML, CSS, and JavaScript, incorporating modern web technologies for a responsive design.

## Installation
To set up this portfolio project locally, you need to have Node.js installed. After ensuring Node.js is installed, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rednax3la/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**
   Run the following command to install all necessary dependencies:
   ```bash
   npm install
   ```

3. **Set up the database (MySQL):**
   Ensure you have MySQL installed and create a database called `portfolio_db`. The server script initializes the necessary table. 

4. **Run the server:**
   Start the server with the following command:
   ```bash
   node server.js
   ```

5. **Open the portfolio:**
   Open the `index.html` file in a web browser to view the portfolio.

## Usage
1. Navigate the sidebar to view various sections such as **Contact**, **Education**, **Skills**, and **Languages**.
2. Click on the **Projects** buttons to view relevant projects hosted on external links.
3. Leave a comment in the comment box, which will be saved via the API.

## Features
- Responsive design that adapts to different screen sizes.
- Dropdown navigation for easy access to different sections.
- Comment submission feature, which utilizes a backend API to save responses to a MySQL database.
- Visually appealing design aesthetics through the use of CSS and modern frameworks like Tailwind CSS.

## Dependencies
The following dependencies are required for the backend server:
- `express` (Version: ^5.1.0)
- `mysql2` (Version: ^3.14.0)
- `cors` (Version: ^2.8.5)
- `body-parser` (Version: ^2.2.0)

These dependencies are specified in the `package.json` file:
```json
{
  "dependencies": {
    "body-parser": "^2.2.0",
    "cors": "^2.8.5",
    "express": "^5.1.0",
    "mysql2": "^3.14.0"
  }
}
```

## Project Structure
The project consists of the following main files and directories:
- `index.html`: The main HTML file for the portfolio's structure.
- `style2.css`: The styling for the portfolio, providing visual elements and layout.
- `script.js`: JavaScript functionality for dropdown navigation, comment submissions, and other interactive features.
- `server.js`: The backend server script that handles API requests and database connections.
- `package.json`: Lists project dependencies and scripts for managing the application.

### File Tree
```
portfolio/
├── index.html
├── style2.css
├── script.js
├── server.js
├── package.json
└── package-lock.json
```

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contact
For inquiries, please contact Alexander Kihoi via the following methods:
- Email: [wambugualexander09@gmail.com](mailto:wambugualexander09@gmail.com)
- GitHub: [Rednax3la](https://github.com/Rednax3la)
```