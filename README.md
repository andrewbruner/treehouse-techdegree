# Welcome to **Library Manager**!

Library Manager is a dynamic and intuitive application for managing any literary collection. Add, modify and delete books from your digital library database and see your entire collection update in real-time.

## Getting Started

1) Download the Library Manager application from the [GitHub repository](https://github.com/andrewbruner/fsjs-techdegree-unit-08/archive/master.zip).

2) In your machine's terminal, run the following command (You must have **Node.js** and **npm** installed):
    ### `npm install`
    This will download and install all the project dependencies: Express, Pug, Sequelize and SQLite.

3) Finally, run this last command:
    ### `npm start`
    This syncs the `library.db` database and starts a server, listening on `port 3000` of your local environment

## Features

### View Collection

- You can view you entire collection on the homepage.

### Search Collection

- From the collection list, you may submit a searchterm  matching any part of a book's `title`, `author`, `genre` or `year` fields and see your matches displayed on the page.

### Add a Book

- Add a book to your collection (must include at least `title` and `author` details)

### Modify a Book

- You can modify a book's details and see the changes immediately reflected in your collection.

### Delete a Book

- `Warning:` Deleting a book entry is irreversible, but should you need to remove an item from your collection, you may do so from the Update Book form.