import { Request, Response, NextFunction } from 'express';

// Middleware untuk menangani kesalahan "Not Found"
export function errorNotFoundMiddleware(req: Request, res: Response, next: NextFunction) {
  res.status(404).json({ message: 'Resource not found' });
}

// Middleware untuk menangani kesalahan server umum
export function errorServerMiddleware(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
}
