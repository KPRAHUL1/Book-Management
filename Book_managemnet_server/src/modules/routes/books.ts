import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

// Validation middleware
const validateBook = [
  body('title').trim().notEmpty().withMessage('Title is required'),
  body('author').trim().notEmpty().withMessage('Author is required'),
  body('genre').trim().notEmpty().withMessage('Genre is required'),
  body('publishedYear')
    .isInt({ min: 1000, max: new Date().getFullYear() })
    .withMessage(`Published year must be between 1000 and ${new Date().getFullYear()}`),
  body('status')
    .isIn(['Available', 'Issued'])
    .withMessage('Status must be either Available or Issued'),
];

// GET /api/books - Get all books with pagination, search, and filters
router.get('/', async (req: Request, res: Response) => {
  try {
    const page = parseInt(String(req.query.page)) || 1;
    const limit = parseInt(String(req.query.limit)) || 10;
    const search = (req.query.search as string) || '';
    const genre = (req.query.genre as string) || '';
    const status = (req.query.status as string) || '';

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};
    
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { author: { contains: search, mode: 'insensitive' } },
      ];
    }

    if (genre) {
      where.genre = genre;
    }

    if (status) {
      where.status = status as any;
    }

    // Get books and total count
    const [books, totalCount] = await Promise.all([
      prisma.book.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.book.count({ where }),
    ]);

    res.json({
      data: books,
      total: totalCount,
      page,
      limit,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error('Error fetching books:', error);
    res.status(500).json({ error: 'Failed to fetch books' });
  }
});

// GET /api/books/:id - Get single book
router.get('/:id', async (req: Request, res: Response) => {
  try {
    const book = await prisma.book.findUnique({
      where: { id: req.params.id },
    });

    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json(book);
  } catch (error) {
    console.error('Error fetching book:', error);
    res.status(500).json({ error: 'Failed to fetch book' });
  }
});

// POST /api/books - Create new book
router.post('/', validateBook, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array(),
      });
    }

    const { title, author, genre, publishedYear, status } = req.body as {
      title: string; author: string; genre: string; publishedYear: number | string; status: string;
    };

    const book = await prisma.book.create({
      data: {
        title,
        author,
        genre,
        publishedYear: parseInt(String(publishedYear)),
        status: status as any,
      },
    });

    res.status(201).json(book);
  } catch (error) {
    console.error('Error creating book:', error);
    res.status(500).json({ error: 'Failed to create book' });
  }
});

// PUT /api/books/:id - Update book
router.put('/:id', validateBook, async (req: Request, res: Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        error: 'Validation failed', 
        details: errors.array(),
      });
    }

    const { title, author, genre, publishedYear, status } = req.body as {
      title: string; author: string; genre: string; publishedYear: number | string; status: string;
    };

    const book = await prisma.book.update({
      where: { id: req.params.id },
      data: {
        title,
        author,
        genre,
        publishedYear: parseInt(String(publishedYear)),
        status: status as any,
      },
    });

    res.json(book);
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Book not found' });
    }
    console.error('Error updating book:', error);
    res.status(500).json({ error: 'Failed to update book' });
  }
});

// DELETE /api/books/:id - Delete book
router.delete('/:id', async (req: Request, res: Response) => {
  try {
    await prisma.book.delete({
      where: { id: req.params.id },
    });

    res.status(204).send();
  } catch (error: any) {
    if (error?.code === 'P2025') {
      return res.status(404).json({ error: 'Book not found' });
    }
    console.error('Error deleting book:', error);
    res.status(500).json({ error: 'Failed to delete book' });
  }
});

export default router;


