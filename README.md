# API Documentation

## Backend URL
Base URL: `https://Infl********.com`

---

### 1. Get Brands
- **Endpoint:** `/api/users/portfolios-by-role/brand`
- **Method:** `GET`
- **Parameters:**
  - `currentPage` (int, required)
  - `perPage` (int, required)
  - `sortBy` (string, required): Options - `recent`, `followers`, `oldest`, `name`

---

### 2. Get Influencers
- **Endpoint:** `/api/users/portfolios-by-role/influencer`
- **Method:** `GET`
- **Parameters:**
  - `currentPage` (int, required)
  - `perPage` (int, required)
  - `sortBy` (string, required): Options - `recent`, `followers`, `oldest`, `name`

---

### 3. Get Testimonials
- **Endpoint:** `/api/testimonial`
- **Method:** `GET`

---

### 4. Search Brands
- **Endpoint:** `/api/users/search/brand`
- **Method:** `GET`
- **Query Parameters:**
  - `search` (string, optional): The search term to filter users by username, email, first name, or last name.
  - `currentPage` (number, optional): The page number to retrieve. Default is `1`.
  - `perPage` (number, optional): The number of users per page. Default is `10`.
  - `categories` (array of strings, optional): A list of categories to filter users by.
  - `minFollowers` (number, optional): Minimum number of followers a user must have to be included in the results.
  - `maxFollowers` (number, optional): Maximum number of followers a user can have to be included in the results.
  - `avgMinPostLikes` (number, optional): Minimum average number of likes a user’s posts must have.
  - `avgMaxPostLikes` (number, optional): Maximum average number of likes a user’s posts can have.

---

### 5. Search Influencers
- **Endpoint:** `/api/users/search/influencer`
- **Method:** `GET`
- **Query Parameters:**
  - `search` (string, optional): The search term to filter users by username, email, first name, or last name.
  - `currentPage` (number, optional): The page number to retrieve. Default is `1`.
  - `perPage` (number, optional): The number of users per page. Default is `10`.
  - `categories` (array of strings, optional): A list of categories to filter users by.
  - `minFollowers` (number, optional): Minimum number of followers a user must have to be included in the results.
  - `maxFollowers` (number, optional): Maximum number of followers a user can have to be included in the results.
  - `avgMinPostLikes` (number, optional): Minimum average number of likes a user’s posts must have.
  - `avgMaxPostLikes` (number, optional): Maximum average number of likes a user’s posts can have.

---

### 6. Get Posts
- **Endpoint:** `/api/posts`
- **Method:** `GET`
- **Parameters:**
  - `currentPage` (int, required)
  - `perPage` (int, required)
  - `role` (string, optional)
  - `postType` (string, optional): Options - `post`, `campaign`
  - `status` (string, optional): Options - `active`, `inactive`
  - `sortBy` (string, required): Options - `recent`, `old`, `mostLiked`, `trending`

---

### 7. Get Saved Posts for User
- **Endpoint:** `/api/posts/saved`
- **Method:** `GET`
- **Parameters:**
  - `currentPage` (int, required)
  - `perPage` (int, required)
  - `userId` (string, required)

---

### 8. Update Post
- **Endpoint:** `/api/posts/:id`
- **Method:** `PUT`
- **Body:**
  - `title` (string, optional)
  - `desc` (string, optional)
  - `image` (string, optional)
  - `likedBy` (array of ObjectId, optional)
  - `savedBy` (array of ObjectId, optional)

---

### 9. Create Comment
- **Endpoint:** `/api/posts/comments`
- **Method:** `POST`
- **Body:**
  - `comment` (string, required)
  - `postId` (ObjectId, required)

---

### 10. Get Comments by Post ID
- **Endpoint:** `/api/posts/comments/:postId`
- **Method:** `GET`

---

### 11. Update User Follower
- **Endpoint:** `/api/users/`
- **Method:** `PUT`
- **Body:**
  - `follower` (array of strings, required)

---

### 12. Upload Image
- **Endpoint:** `/api/posts/upload-image`
- **Method:** `POST`
- **Form Data:**
  - `file` (image, required)

---

### 13. Create Post
- **Endpoint:** `/api/posts/`
- **Method:** `POST`
- **Body:**
  - `title` (string, required)
  - `desc` (string, required)
  - `userId` (string, required)
  - `image` (string, optional)
  - `status` (string, required): Options - `active`, `inactive`
  - `postType` (string, required): Options - `post`, `campaign`
  - **If postType is `campaign`:**
    - `minPrice` (number, optional)
    - `maxPrice` (number, optional)