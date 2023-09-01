/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ImageModal from './ImageModal.jsx';

describe('ImageModal', () => {
  it('calls onClos when close button is clicked', () => {
    const mockClose = jest.fn();

    render(<ImageModal imageUrl="eric.jpg" onClose={mockClose} />);

    const closeButton = screen.getByText('X');
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalledTimes(1);
  });
});