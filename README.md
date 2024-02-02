# Dependencies and tech used
- express.js
- mongoose
- cheerio (for scraping)
- axios
- jwt
- bcrypt
- express-validator
- cors

# Install and run

```
git clone https://github.com/scarface68/red-baton-HNserver.git

npm install

npm start
```

# Create .env at root and add the variables provided via mail
```
touch .env
```

# Api endpoints
 - /signup 
  - /login
  - /news-items (get news from backend and crawl hacker news website)
  - /news-items/:id/read (put request handles user marking item as read)
  - /news-items/:id/delete' (put request handles user deleting item)

  # Web Scraper script
  - sraper.js
  - It runs either on command (button available in site) or whenever new user logs in.
  - It "crawls the first three pages" as mentioned in the task
