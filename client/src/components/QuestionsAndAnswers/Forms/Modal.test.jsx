/**
 * @jest-environment jsdom
 */
/* eslint-env jest */
import React from 'react';
import { render, screen } from '@testing-library/react';
import Modal from './Modal.jsx';

describe('Modal', () => {
  const mockOnClose = jest.fn();
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders the modal if isOpen is true', () => {
    render(
      <Modal isOpen onClose={mockOnClose}>
        <div>Hey</div>
      </Modal>,
    );

    expect(screen.getByText('Hey')).toBeTruthy();
  });
});