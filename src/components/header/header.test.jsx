import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from './header';

describe('Header', () => {
  it('renders the header with title and user image', () => {
    render(<Header />);

    expect(screen.getByText('Awesome Kanban Board')).toBeInTheDocument();
    expect(screen.getByAltText('user avatar')).toBeInTheDocument();
  });

  it('toggles the user dropdown', () => {
    render(<Header />);
    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Log Out')).toBeInTheDocument();

    fireEvent.click(button);

    expect(screen.queryByText('Profile')).not.toBeInTheDocument();
    expect(screen.queryByText('Log Out')).not.toBeInTheDocument();
  });
});
