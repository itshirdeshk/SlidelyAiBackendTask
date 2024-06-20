# Slidely AI Forms App API

RESTful APIs for Slidely AI Forms App.

## Setup Instructions

1. Clone the repository:

```
git clone https://github.com/itshirdeshk/slidelyaibackendtask.git
```

2. Install dependencies:

```
npm install
```

3. Start the server:
```
npm start
```

## API Documentation

### Endpoints

#### 1. Ping Endpoint:

- `GET /ping`: A GET request that always returns True.

#### 2. Submit Endpoint:

- `POST /submit`: A POST request with parameters "Name", "Email", "Phone", "GithubLink" and "StopwatchTime" to create a submission.

#### 3. Read Endpoint:

- `GET /read`: A GET request that returns all the submissions.
- `GET /read?index=index_value`: A GET request with query parameter "index" which is a 0-index for reading the (index+1)th form submission.

#### 4. Delete Endpoint:

- `DELETE /delete?index=index_value`: A DELETE request with query parameter "index" which is a 0-index for deleting the (index+1)th form submission.

#### 5. Edit Endpoint:

- `PUT /edit`: A PUT request with parameters "index", "Name", "Email", "Phone", "GithubLink" and "StopwatchTime" to update that (index + 1)th form submission.

#### 6. Search Endpoint:

- `Get /search?email=email_address`: A GET request with query parameter "email" to search all the forms belongs to that email address.