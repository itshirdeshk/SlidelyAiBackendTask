import { Request, Response } from 'express';
import { readDatabase, writeDatabase } from '../db/dbConfig';

export const pingController = (req: Request, res: Response) => {
    res.json(true);
}

export const submitController = (req: Request, res: Response) => {
    const { Name, Email, Phone, GithubLink, StopwatchTime } = req.body;

    if (!Name || !Email || !Phone || !GithubLink || !StopwatchTime) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    const submissions = readDatabase();
    submissions.push({ Name, Email, Phone, GithubLink, StopwatchTime });
    writeDatabase(submissions);

    res.status(201).json({ message: 'Submission saved successfully' });
}

export const readController = (req: Request, res: Response) => {
    const { index } = req.query;

    const submissions = readDatabase();
    const submissionIndex = parseInt(index as string, 10);

    if (typeof index === 'undefined') {
        return res.status(200).json(submissions);
    }

    if (isNaN(submissionIndex) || submissionIndex < 0 || submissionIndex >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found' });
    }

    res.json(submissions[submissionIndex]);
}

export const deleteController = (req: Request, res: Response) => {
    const { index } = req.query;

    if (typeof index === 'undefined') {
        return res.status(400).json({ error: 'Index is required' });
    }

    const submissions = readDatabase();
    const submissionIndex = parseInt(index as string, 10);

    if (isNaN(submissionIndex) || submissionIndex < 0 || submissionIndex >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found' });
    }

    submissions.splice(submissionIndex, 1);
    writeDatabase(submissions);

    res.json({ message: 'Submission deleted successfully' });
}

export const editController = (req: Request, res: Response) => {
    const { index, Name, Email, Phone, GithubLink, StopwatchTime } = req.body;

    if (typeof index === 'undefined') {
        return res.status(400).json({ error: 'Index is required' });
    }

    const submissions = readDatabase();
    const submissionIndex = parseInt(index, 10);

    if (isNaN(submissionIndex) || submissionIndex < 0 || submissionIndex >= submissions.length) {
        return res.status(404).json({ error: 'Submission not found' });
    }

    if (!Name || !Email || !Phone || !GithubLink || !StopwatchTime) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    submissions[submissionIndex] = { Name, Email, Phone, GithubLink, StopwatchTime };
    writeDatabase(submissions);

    res.json({ message: 'Submission updated successfully' });
}

export const searchController = (req: Request, res: Response) => {
    const { email } = req.query;

    if (!email) {
        return res.status(400).json({ error: 'Email is required' });
    }

    const submissions = readDatabase();
    const result = submissions.filter((submission: any) => submission.Email === email);

    if (result.length === 0) {
        return res.status(404).json({ error: 'No submissions found with the provided email' });
    }

    res.json(result);
}