import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Footer from './footer';

const mockTasks = [
  { title: 'Backlog', issues: [{ name: 'Task 1' }, { name: 'Task 2' }] },
  { title: 'Finished', issues: [{ name: 'Task 3' }] }
];

describe('Footer', () => {
  it('renders the footer with active and finished tasks count', () => {
    render(<Footer tasks={mockTasks} />);

    expect(screen.getByText('Active tasks: 2')).toBeInTheDocument();
    expect(screen.getByText('Finished tasks: 1')).toBeInTheDocument();
  });
});
