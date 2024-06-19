import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import TaskBox from './task-box';

jest.mock('react-dropdown', () => ({ options, onChange }) => (
    <select data-testid="dropdown" onChange={(e) => onChange({ value: e.target.value })}>
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  ));
    
  const initialTasks = [
    { title: 'Backlog', issues: [] },
    { title: 'Ready', issues: [] },
    { title: 'In Progress', issues: [] },
    { title: 'Finished', issues: [] },
  ];
  
  describe('TaskBox Component', () => {
    let tasks;
    let setTasks;
  
    beforeEach(() => {
      tasks = [...initialTasks];
      setTasks = jest.fn((newTasks) => (tasks = newTasks));
    });
  
    test('renders TaskBox component', () => {
      render(<TaskBox name="Backlog" tasks={tasks} setTasks={setTasks} />);
      expect(screen.getByText('Backlog')).toBeInTheDocument();
    });
  
    test('adds a task to the backlog', () => {
      render(<TaskBox name="Backlog" tasks={tasks} setTasks={setTasks} />);
  
      const button = screen.getByTestId('task-button');
      fireEvent.click(button);
  
      const input = screen.getByTestId('task-input');
      fireEvent.change(input, { target: { value: 'New Task' } });
      fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
  
      expect(setTasks).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            title: 'Backlog',
            issues: expect.arrayContaining([expect.objectContaining({ name: 'New Task' })]),
          }),
        ])
      );
    });
  
    test('moves a task to the next box', () => {
      tasks[0].issues.push({ name: 'New Task', id: '1' });
  
      render(<TaskBox name="Ready" tasks={tasks} setTasks={setTasks} />);
  
      const button = screen.getByTestId('task-button');
      fireEvent.click(button);
  
      const dropdown = screen.getByTestId('dropdown');
      fireEvent.change(dropdown, { target: { value: 'New Task' } });
  
      expect(setTasks).toHaveBeenCalledWith(
        expect.arrayContaining([
          expect.objectContaining({
            title: 'Backlog',
            issues: expect.not.arrayContaining([expect.objectContaining({ name: 'New Task' })]),
          }),
          expect.objectContaining({
            title: 'Ready',
            issues: expect.arrayContaining([expect.objectContaining({ name: 'New Task' })]),
          }),
        ])
      );
    });
  });
