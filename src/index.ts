import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import { deleteController, editController, pingController, readController, searchController, submitController } from './controllers/controllers';

const app = express();
const PORT = 3000;

app.use(bodyParser.json());

// /ping endpoint
app.get('/ping', pingController);

// /submit endpoint
app.post('/submit', submitController);

// /read endpoint
app.get('/read', readController);

// /delete endpoint
app.delete('/delete', deleteController);

// /edit endpoint
app.put('/edit', editController);

// /search endpoint
app.get('/search', searchController);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
