import React from 'react';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Content from './content';

jest.mock('../task-box/task-box.tsx', () => ({ name, tasks, setTasks }) => {
    return <div>{name}</div>;
  });
  
  const mockTasks = [
    { title: 'Backlog', issues: [{ name: 'Task 1' }, { name: 'Task 2' }] },
    { title: 'Ready', issues: [] },
    { title: 'In Progress', issues: [] },
    { title: 'Finished', issues: [{ name: 'Task 3' }] }
  ];
  
  describe('Content', () => {
    it('renders task boxes with correct titles', () => {
      render(<Content tasks={mockTasks} setTasks={() => {}} />);
  
      expect(screen.getByText('Backlog')).toBeInTheDocument();
      expect(screen.getByText('Ready')).toBeInTheDocument();
      expect(screen.getByText('In Progress')).toBeInTheDocument();
      expect(screen.getByText('Finished')).toBeInTheDocument();
    });
  });
