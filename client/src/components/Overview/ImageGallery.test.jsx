/**
 * @jest-environment jsdom
 */

import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DefaultView from './DefaultView.jsx';
import DefaultThumbnails from './DefaultThumbnails.jsx';
import ExpandedView from './ExpandedView.jsx';
import Data from './OverviewDummyData.js';

describe('default view', () => {
  it('renders the first photo as main image of first selected style', async () => {
    await waitFor(() => render(<DefaultView
      selectedStyle={Data.styles.results[0]}
      mainImage={Data.styles.results[0].photos[0].url}
    />));
    const style1 = screen.getByAltText('White & White');
    expect(style1).toBeTruthy();
  });
  it('on first style thumbnail, it should only have left arrow after right arrow is clicked', async () => {
    const mockSize = jest.fn(() => false);
    const mockQuantity = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[0].photos[1].url);
    await waitFor(() => render(<DefaultThumbnails
      selectedStyle={Data.styles.results[0]}
      mainImage={Data.styles.results[0].photos[0].url}
      setMainImage={mockSetImg}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />));
    const leftButton = screen.queryByText('<');
    expect(leftButton).toBeFalsy();
    const rightButton = screen.getByText('>');
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.getByText('<')).toBeTruthy());
  });
  it('should not have right arrow if on the last thumbnail', async () => {
    const mockSize = jest.fn(() => false);
    const mockQuantity = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[1].photos[1].url);
    await waitFor(() => render(<DefaultThumbnails
      selectedStyle={Data.styles.results[1]}
      mainImage={Data.styles.results[1].photos[0].url}
      setMainImage={mockSetImg}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />));
    const rightButton = screen.queryByText('>');
    expect(rightButton).toBeTruthy();
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeFalsy());
  });
  it('should have both left and right arrows when not at the first or last thumbnail', async () => {
    let count = 1;
    const mockSize = jest.fn(() => false);
    const mockQuantity = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[0].photos[count++].url);
    await waitFor(() => render(<DefaultThumbnails
      selectedStyle={Data.styles.results[0]}
      mainImage={Data.styles.results[0].photos[0].url}
      setMainImage={mockSetImg}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />));
    const rightButton = screen.queryByText('>');
    expect(rightButton).toBeTruthy();
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    expect(rightButton).toBeTruthy();
    const leftButton = screen.queryByText('<');
    expect(leftButton).toBeTruthy();
  });
  it('should only show 7 thumbnails when in the middle of a list of 17 styles', async () => {
    let count = 1;
    const mockSize = jest.fn(() => false);
    const mockQuantity = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[2].photos[count++].url);
    await waitFor(() => render(<DefaultThumbnails
      selectedStyle={Data.styles.results[2]}
      mainImage={Data.styles.results[2].photos[0].url}
      setMainImage={mockSetImg}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />));
    const rightButton = screen.queryByText('>');
    expect(rightButton).toBeTruthy();
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    await waitFor(() => expect(screen.queryByText('>')).toBeTruthy());
    userEvent.click(rightButton);
    for (let i = 0; i < 7; i++) {
      const imageElement = screen.getByAltText(`White & Black ${i}`);
      expect(imageElement).toBeTruthy();
    }
    const imageElement = screen.queryByAltText('White & Black 7');
    expect(imageElement).toBeFalsy();
  });
});
describe('normal expanded view', () => {
  it('renders all of the style\'s thumbnails to the page', async () => {
    let count = 1;
    const mockModal = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[0].photos[count++].url);
    await waitFor(() => render(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={Data.styles.results[0].photos[0].url}
      setExpandedMainImage={mockSetImg}
    />));
    for (let i = 0; i < Data.styles.results[0].photos.length; i++) {
      const imageElement = screen.getByAltText(`White & White ${i}`);
      expect(imageElement).toBeTruthy();
    }
  });
  it('no left button and present right button when expanded view main image is the first image in the thumbnail set', async () => {
    let count = 1;
    const mockModal = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[0].photos[count++].url);
    await waitFor(() => render(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={Data.styles.results[0].photos[0].url}
      setExpandedMainImage={mockSetImg}
    />));
    const leftButton = screen.queryByText('<');
    expect(leftButton).toBeFalsy();
    const rightButton = screen.getByText('>');
    expect(rightButton).toBeTruthy();
  });
  it('makes the thumbnail clicked the main image of expanded view', async () => {
    const mockModal = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[0].photos[1].url);
    const { rerender } = await waitFor(() => render(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={Data.styles.results[0].photos[0].url}
      setExpandedMainImage={mockSetImg}
    />));
    const mainImage = screen.getByAltText('White & White');
    expect(mainImage).toBeTruthy();
    expect(mainImage.src).toContain('https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80');
    fireEvent.click(screen.getByAltText('White & White 1'));
    expect(mockSetImg).toHaveBeenCalled();
    rerender(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={mockSetImg()}
      setExpandedMainImage={mockSetImg}
    />);
    const newImage = screen.getByAltText('White & White');
    await waitFor(() => expect(newImage.src).toContain('https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'));
  });
  it('makes the thumbnail clicked the main image of expanded view', async () => {
    const mockModal = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[0].photos[1].url);
    const { rerender } = await waitFor(() => render(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={Data.styles.results[0].photos[0].url}
      setExpandedMainImage={mockSetImg}
    />));
    const mainImage = screen.getByAltText('White & White');
    expect(mainImage).toBeTruthy();
    expect(mainImage.src).toContain('https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80');
    fireEvent.click(screen.getByAltText('White & White 1'));
    expect(mockSetImg).toHaveBeenCalled();
    rerender(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={mockSetImg()}
      setExpandedMainImage={mockSetImg}
    />);
    const newImage = screen.getByAltText('White & White');
    await waitFor(() => expect(newImage.src).toContain('https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'));
  });
  it('when right button is clicked, change main image to next image in list', async () => {
    const mockModal = jest.fn(() => false);
    const mockClickRight = jest.fn(() => Data.styles.results[0].photos[1].url);
    const { rerender } = await waitFor(() => render(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={Data.styles.results[0].photos[0].url}
      setExpandedMainImage={mockClickRight}
    />));
    const mainImage = screen.getByAltText('White & White');
    expect(mainImage).toBeTruthy();
    expect(mainImage.src).toContain('https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80');
    const rightButton = screen.getByText('>');
    fireEvent.click(rightButton);
    expect(mockClickRight).toHaveBeenCalled();
    rerender(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={mockClickRight()}
      setExpandedMainImage={mockClickRight}
    />);
    const newImage = screen.getByAltText('White & White');
    await waitFor(() => expect(newImage.src).toContain('https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80'));
  });
  it('when left button is clicked, change main image to previous image in list', async () => {
    const mockModal = jest.fn(() => false);
    const mockClickLeft = jest.fn(() => Data.styles.results[0].photos[0].url);
    const { rerender } = await waitFor(() => render(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={Data.styles.results[0].photos[1].url}
      setExpandedMainImage={mockClickLeft}
    />));
    const mainImage = screen.getByAltText('White & White');
    expect(mainImage).toBeTruthy();
    expect(mainImage.src).toContain('https://images.unsplash.com/photo-1514590734052-344a18719611?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80');
    const leftButton = screen.getByText('<');
    fireEvent.click(leftButton);
    expect(mockClickLeft).toHaveBeenCalled();
    rerender(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={mockClickLeft()}
      setExpandedMainImage={mockClickLeft}
    />);
    const newImage = screen.getByAltText('White & White');
    await waitFor(() => expect(newImage.src).toContain('https://images.unsplash.com/photo-1544441892-794166f1e3be?ixlib=rb-1.2.1&auto=format&fit=crop&w=1650&q=80'));
  });
});
describe('expanded view zoom', () => {
  it('no arrows button functionality when in zoomed view', async () => {
    let count = 1;
    const mockModal = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[0].photos[count++].url);
    await waitFor(() => render(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={Data.styles.results[0].photos[0].url}
      setExpandedMainImage={mockSetImg}
    />));
    const rightButton = screen.queryByText('>');
    expect(rightButton).toBeTruthy();
    const imageElement = screen.getByAltText(`White & White`);
    fireEvent.click(imageElement);
    await waitFor(() => expect(screen.queryByText('>')).toBeFalsy());
  });
  it('no image icon click functionality when in zoomed view', async () => {
    let count = 1;
    const mockModal = jest.fn(() => false);
    const mockSetImg = jest.fn(() => Data.styles.results[0].photos[count++].url);
    await waitFor(() => render(<ExpandedView
      currentProduct={Data.product}
      selectedStyle={Data.styles.results[0]}
      displayModal
      setDisplayModal={mockModal}
      expandedMainImage={Data.styles.results[0].photos[0].url}
      setExpandedMainImage={mockSetImg}
    />));
    let icon = screen.getByAltText(`White & White 1`);
    expect(icon).toBeTruthy();
    const imageElement = screen.getByAltText(`White & White`);
    fireEvent.click(imageElement);
    icon = screen.queryByAltText(`White & White 1`);
    await waitFor(() => expect(icon).toBeFalsy());
  });
});
