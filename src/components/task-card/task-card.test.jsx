import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import TaskCard from './task-card';

const mockTasks = [
  { title: 'Backlog', issues: [{ id: '1', name: 'Task 1', description: 'Description 1' }] },
  { title: 'Finished', issues: [{ id: '2', name: 'Task 2', description: 'Description 2' }] }
];

const renderWithRouter = (ui, { route = '/' } = {}) => {
  window.history.pushState({}, 'Test page', route);

  return render(
    <BrowserRouter>
      <Routes>
        <Route path="/tasks/:id" element={ui} />
      </Routes>
    </BrowserRouter>
  );
};

describe('TaskCard', () => {
  it('renders task details', () => {
    renderWithRouter(<TaskCard tasks={mockTasks} setTasks={() => {}} />, { route: '/tasks/1' });

    expect(screen.getByText('Task 1')).toBeInTheDocument();
    expect(screen.getByText('Description 1')).toBeInTheDocument();
  });

  it('allows editing task description', async () => {
    const setTasks = jest.fn();

    renderWithRouter(<TaskCard tasks={mockTasks} setTasks={setTasks} />, { route: '/tasks/1' });

    fireEvent.click(await screen.findByTestId('edit'));
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Updated description' } });
    fireEvent.click(screen.getByText('Submit'));

    expect(setTasks).toHaveBeenCalledWith([
      {
        title: 'Backlog',
        issues: [{ id: '1', name: 'Task 1', description: 'Updated description' }]
      },
      { title: 'Finished', issues: [{ id: '2', name: 'Task 2', description: 'Description 2' }] }
    ]);
  });
});
