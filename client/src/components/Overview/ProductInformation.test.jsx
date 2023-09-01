/**
 * @jest-environment jsdom
 */

import React from 'react';
import {
  render, screen, waitFor, fireEvent,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ProductInformation from './ProductInformation.jsx';
import StyleEntry from './StyleEntry.jsx';
import Overview from './Overview.jsx';
import AddToCart from './AddToCart.jsx';

// 2 products in products array
const products = [
  {
    id: 1,
    name: 'Camo Onesie',
    slogan: 'Blend in to your crowd',
    description: 'The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.',
    category: 'Jackets',
    default_price: '140',
  },
  {
    id: 2,
    name: 'Bright Future Sunglasses',
    slogan: 'You\'ve got to wear shades',
    description: 'Where you\'re going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.',
    category: 'Accessories',
    default_price: '69',
  }];

// product 1 with 2 styles
const styles = {
  product_id: '1',
  results: [
    {
      'style_id': 1,
      'name': 'Forest Green & Black',
      'original_price': '140',
      'sale_price': '100',
      'default?': true,
      'photos': [
        {
          thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
          url: 'urlplaceholder/style_1_photo_number.jpg',
        },
        {
          thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail2.jpg',
          url: 'urlplaceholder/style_1_photo_number.jpg',
        },
      ],
      'skus': {
        37: {
          quantity: 8,
          size: 'XS',
        },
        38: {
          quantity: 16,
          size: 'S',
        },
        39: {
          quantity: 17,
          size: 'M',
        },
      },
    },
    {
      'style_id': 2,
      'name': 'Desert Brown & Tan',
      'original_price': '140',
      'sale_price': '70',
      'default?': false,
      'photos': [
        {
          thumbnail_url: 'urlplaceholder/style_2_photo_number_thumbnail.jpg',
          url: 'urlplaceholder/style_2_photo_number.jpg',
        },
      ],
      'skus': {
        37: {
          quantity: 4,
          size: 'XS',
        },
        38: {
          quantity: 2,
          size: 'S',
        },
        39: {
          quantity: 5,
          size: 'L',
        },
      },
    }],
};
// product 2 with 3 styles
const styles2 = {
  product_id: '2',
  results: [
    {
      'style_id': 1,
      'name': 'Gray',
      'original_price': '140',
      'sale_price': '0',
      'default?': true,
      'photos': [
        {
          thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail.jpg',
          url: 'urlplaceholder/style_1_photo_number.jpg',
        },
        {
          thumbnail_url: 'urlplaceholder/style_1_photo_number_thumbnail2.jpg',
          url: 'urlplaceholder/style_1_photo_number.jpg',
        },
      ],
      'skus': {
        37: {
          quantity: 8,
          size: 'XS',
        },
        38: {
          quantity: 16,
          size: 'S',
        },
        39: {
          quantity: 17,
          size: 'M',
        },
      },
    },
    {
      'style_id': 2,
      'name': 'Orange',
      'original_price': '140',
      'sale_price': '0',
      'default?': false,
      'photos': [
        {
          thumbnail_url: 'urlplaceholder/style_2_photo_number_thumbnail.jpg',
          url: 'urlplaceholder/style_2_photo_number.jpg',
        },
      ],
      'skus': {
        37: {
          quantity: 8,
          size: 'XS',
        },
        38: {
          quantity: 16,
          size: 'S',
        },
        39: {
          quantity: 17,
          size: 'M',
        },
      },
    },
    {
      'style_id': 3,
      'name': 'Ocean Blue & Gray',
      'original_price': '140',
      'sale_price': '0',
      'default?': false,
      'photos': [
        {
          thumbnail_url: 'urlplaceholder/style_3_photo_number_thumbnail.jpg',
          url: 'urlplaceholder/style_3_photo_number.jpg',
        },
      ],
      'skus': {
        37: {
          quantity: 8,
          size: 'XS',
        },
        38: {
          quantity: 16,
          size: 'S',
        },
        39: {
          quantity: 17,
          size: 'M',
        },
      },
    }],
};

const review = {
  'product_id': '40349',
  'ratings': {
    '1': '1',
    '2': '2',
    '3': '3',
    '4': '2',
    '5': '3',
  },
  'recommended': {
    'false': '2',
    'true': '9',
  },
  'characteristics': {
    'Size': {
      'id': 135236,
      'value': '2.1538461538461538',
    },
    'Width': {
      'id': 135237,
      'value': '1.9230769230769231',
    },
    'Comfort': {
      'id': 135238,
      'value': '2.3076923076923077',
    },
    'Quality': {
      'id': 135239,
      'value': '2.6428571428571429',
    },
  },
};
describe('Overview component', () => {
  it('Overview component contains ImageGallery component', async () => {
    render(<Overview
      currentProduct={products[0]}
      currentProductID={1}
    />);
    await waitFor(() => {
      expect(screen.getAllByTestId('imageGallery')).toBeTruthy();
    });
  });
  it('Overview component contains ProductInformation component', async () => {
    render(<Overview
      currentProduct={products[0]}
      currentProductID={1}
    />);
    await waitFor(() => {
      expect(screen.getByText(/Camo Onesie/i)).toBeTruthy();
    });
  });
});
describe('product title', () => {
  it('renders first product title in products array', async () => {
    const mockSize = jest.fn(() => false);
    const mockQuantity = jest.fn(() => false);
    render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      styles={styles}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />);
    await waitFor(() => {
      const productName = screen.getByText('Camo Onesie');
      expect(productName).toBeTruthy();
    });
  });
  it('renders second product title in products array', async () => {
    render(<ProductInformation
      currentProduct={products[1]}
      currentProductID={2}
      styles={styles}
    />);
    await waitFor(() => {
      const productName = screen.getByText('Bright Future Sunglasses');
      expect(productName).toBeTruthy();
    });
  });
});
describe('product description', () => {
  const mockSize = jest.fn(() => false);
  const mockQuantity = jest.fn(() => false);
  it('renders first product description', async () => {
    render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      styles={styles}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />);
    await waitFor(() => {
      const productDescription = screen.getByText('The So Fatigues will wake you up and fit you in. This high energy camo will have you blending in to even the wildest surroundings.');
      expect(productDescription).toBeTruthy();
    });
  });
  it('renders second product description', async () => {
    render(<ProductInformation
      currentProduct={products[1]}
      currentProductID={1}
      styles={styles}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />);
    await waitFor(() => {
      const productDescription = screen.getByText('Where you\'re going you might not need roads, but you definitely need some shades. Give those baby blues a rest and let the future shine bright on these timeless lenses.');
      expect(productDescription).toBeTruthy();
    });
  });
});
describe('style thumbnails', () => {
  it('renders the first thumbnail of the style', async () => {
    render(<StyleEntry
      style={styles.results[0]}
    />);
    await waitFor(() => {
      const imageElement = screen.getByAltText('Forest Green & Black');
      expect(imageElement).toBeTruthy();
      expect(imageElement.src).toContain('urlplaceholder/style_1_photo_number_thumbnail.jpg');
    });
  });
  it('renders the first thumbnail of the style', async () => {
    render(<StyleEntry
      style={styles.results[1]}
    />);
    await waitFor(() => {
      const imageElement = screen.getByAltText('Desert Brown & Tan');
      expect(imageElement).toBeTruthy();
      expect(imageElement.src).toContain('urlplaceholder/style_2_photo_number_thumbnail.jpg');
    });
  });
  it('renders 2 style icons when product has 2 styles', async () => {
    const mockSize = jest.fn(() => false);
    const mockQuantity = jest.fn(() => false);
    render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      styles={styles}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />);
    await waitFor(() => {
      const element = screen.getAllByTestId('styleEntry');
      expect(element).toHaveLength(2);
    });
  });
  it('renders 3 style icons when product has 3 styles', async () => {
    const mockSize = jest.fn(() => false);
    const mockQuantity = jest.fn(() => false);
    render(<ProductInformation
      currentProduct={products[1]}
      currentProductID={2}
      styles={styles2}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />);
    await waitFor(() => {
      const element = screen.getAllByTestId('styleEntry');
      expect(element).toHaveLength(3);
    });
  });
});
describe('render price', () => {
  const mockSize = jest.fn(() => false);
  const mockQuantity = jest.fn(() => false);
  it('renders the original price of the style', async () => {
    await waitFor(() => render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      selectedStyle={styles.results[0]}
      selectedStylePrice={styles.results[0].original_price}
      selectedStyleSalePrice={styles.results[0].sale_price}
      selectedStyleName={styles.results[0].name}
      styles={styles}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />));
    expect(screen.getByText('140')).toBeTruthy();
  });
  it('renders the sales price of the style', async () => {
    const mockSize = jest.fn(() => false);
    const mockQuantity = jest.fn(() => false);
    await waitFor(() => render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      selectedStyle={styles.results[0]}
      selectedStylePrice={styles.results[0].original_price}
      selectedStyleSalePrice={styles.results[0].sale_price}
      selectedStyleName={styles.results[0].name}
      styles={styles}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />));
    const salePrice = screen.getByText('100');
    expect(salePrice).toBeTruthy();
  });
});
describe('render category', () => {
  it('renders the category of the product', async () => {
    render(<Overview currentProduct={products[0]} currentProductID={1} />);
    await waitFor(() => {
      const category = screen.getByText('Jackets');
      expect(category).toBeTruthy();
    });
  });
});
describe('share anchor element "button" tests', () => {
  it('should have link to Twitter', async () => {
    render(<ProductInformation
      currentProduct={products[1]}
      currentProductID={2}
      styles={styles2}
    />);
    await waitFor(() => {
      const anchorElement = screen.getAllByRole('link')[0];
      expect(anchorElement.href).toContain('https://twitter.com/');
    });
  });
  it('should have link to Facebook', async () => {
    render(<ProductInformation
      currentProduct={products[1]}
      currentProductID={2}
      styles={styles2}
    />);
    await waitFor(() => {
      const anchorElement = screen.getAllByRole('link')[1];
      expect(anchorElement.href).toContain('http://www.facebook.com/');
    });
  });
  it('should have link to Pinterest', async () => {
    render(<ProductInformation
      currentProduct={products[1]}
      currentProductID={2}
      styles={styles2}
    />);
    await waitFor(() => {
      const anchorElement = screen.getAllByRole('link')[2];
      expect(anchorElement.href).toContain('https://pinterest.com/');
    });
  });
});

describe('render style\s info', () => {
  it('render the default style\'s name which is the first product\s first style', async () => {
    await waitFor(() => render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      selectedStyle={styles.results[0]}
      selectedStylePrice={styles.results[0].original_price}
      selectedStyleSalePrice={styles.results[0].sale_price}
      selectedStyleName={styles.results[0].name}
      styles={styles}
    />));
    const style1 = screen.getByText('Forest Green & Black');
    expect(style1).toBeTruthy();
  });
  it('renders only one checkmark over style thumbnails', async () => {
    await waitFor(() => render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      selectedStyle={styles.results[0]}
      selectedStylePrice={styles.results[0].original_price}
      selectedStyleSalePrice={styles.results[0].sale_price}
      selectedStyleName={styles.results[0].name}
      styles={styles}
    />));
    const checkmark = screen.getByText('✓');
    expect(checkmark).toBeTruthy();
  });
  it('should change style name after another style is clicked', async () => {
    const mockGetStyle = jest.fn(() => styles.results[1]);
    const { rerender } = await waitFor(() => render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      selectedStyle={styles.results[0]}
      selectedStyleName={styles.results[0].name}
      setSelectedStyle={mockGetStyle}
      styles={styles}
    />));
    const image = screen.getByAltText('Desert Brown & Tan');
    fireEvent.click(image);
    expect(mockGetStyle).toHaveBeenCalled();
    rerender(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      selectedStyle={mockGetStyle()}
      selectedStyleName={mockGetStyle().name}
      setSelectedStyle={mockGetStyle}
      styles={styles}
    />);
    const style = screen.getByText('Desert Brown & Tan');
    expect(style).toBeTruthy();
  });
  it('should change style sale price after another style is clicked', async () => {
    const mockGetStyle = jest.fn(() => styles.results[1]);
    const { rerender } = await waitFor(() => render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      selectedStyle={styles.results[0]}
      selectedStyleName={styles.results[0].name}
      selectedStyleSalePrice={styles.results[0].sale_price}
      setSelectedStyle={mockGetStyle}
      styles={styles}
    />));
    const oldPrice = screen.getByText('100');
    expect(oldPrice).toBeTruthy();
    const image = screen.getByAltText('Desert Brown & Tan');
    fireEvent.click(image);
    expect(mockGetStyle).toHaveBeenCalled();
    rerender(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      selectedStyle={mockGetStyle()}
      selectedStyleName={mockGetStyle().name}
      selectedStyleSalePrice={mockGetStyle().sale_price}
      setSelectedStyle={mockGetStyle}
      styles={styles}
    />);
    const newPrice = screen.getByText('70');
    expect(newPrice).toBeTruthy();
  });
});
describe('size selector', () => {
  it('displays Please select size when user has not selected size from dropdown', async () => {
    const mockSize = jest.fn(() => false);
    const mockQuantity = jest.fn(() => false);
    await waitFor(() => render(<AddToCart
      selectedStyle={styles}
      setOpenSize={mockSize}
      setOpenQuantity={mockQuantity}
    />));
    userEvent.click(screen.getByText('Add to Cart'));
    await waitFor(() => expect(screen.getByText('Please select size.')).toBeTruthy());
  });
});
describe('quantity selector', () => {
  it('quantity button is disabled if no size selected', async () => {
    await waitFor(() => render(<AddToCart
      selectedStyle={styles}
    />));
    expect(screen.getByText('-')).toHaveProperty('disabled', true);
  });
});
describe('Display review and rating in product information', () => {
  it('displays the review count in product information', async () => {
    render(<ProductInformation
      currentProduct={products[0]}
      currentProductID={1}
      styles={styles}
      reviewData={review}
    />);
    const reviewCount = screen.getByText('11');
    expect(reviewCount).toBeTruthy();
  });
});
