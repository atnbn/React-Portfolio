import { render, screen } from '@testing-library/react';
import App from './App';

test('renders the portfolio sections', () => {
  render(<App />);
  expect(screen.getByRole('heading', { name: /skills/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /projects/i })).toBeInTheDocument();
  expect(screen.getByRole('heading', { name: /get in touch/i })).toBeInTheDocument();
});
