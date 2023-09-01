import React from 'react';
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Item, Image } from '../../styled-components/horizontal-carousel.jsx';
import Compare from './CompareButton.jsx';
import Remove from './RemoveItemButton.jsx';
import { StarView } from '../../styled-components/common-elements.jsx';
import { calculateAverage } from '../RatingsAndReviews/arithmetic.js';
import ThemeContext from '../ThemeContext.jsx';

const ProductCard = function ({ product, updateProduct, listType }) {
  const [img1, setImg1] = useState('https://tinyurl.com/bp78yn9f');
  const [img2, setImg2] = useState('https://tinyurl.com/2tb6ry8d'); //random imgs for defaults
  const [salePrice, setSalePrice] = useState('');
  const [hover, setHover] = useState(false);
  const [starRating, setStarRating] = useState(0);

  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    axios.get('/api/product/relatedStyle', {
      params: {
        currentProductID: product.id,
      },
      responseType: 'json',
    })
      .then((response) => {
        const defaultStyle = response.data.results.find((style) => style['default?']);
        // check for data existing on the backend
        // check for default style, fallback on alt style, then stock img
        if (defaultStyle?.sale_price) { setSalePrice(defaultStyle.sale_price); }
        if (defaultStyle?.photos[0]?.url) {
          setImg1(defaultStyle.photos[0].url);
          if (defaultStyle?.photos[1]?.url) { setImg2(defaultStyle.photos[1].url); }
        } else {
          const altStyle = response.data.results.find((style) => style.photos[0].url);
          if (altStyle) {
            setImg1(altStyle.photos[0].url);
            if (altStyle.sale_price) { setSalePrice(altStyle.sale_price); }
            if (altStyle?.photos[1]?.url) { setImg2(altStyle.photos[1].url); }
          }
        }
      })
      .catch((error) => console.log(`Missing product data for ${product.name}: `, error.message));
  }, [product]);

  useEffect(() => {
    axios.get('/reviews/meta', {
      params: {
        product_id: product.id,
      },
    })
      .then((response) => setStarRating(calculateAverage(response.data.ratings)))
      .catch((error) => console.log(error.message));
  }, [product]);

  const onHover = () => setHover(!hover);

  const handleClick = () => {
    updateProduct(product.id, product);
  };

  return (
    <Item onClick={handleClick} $theme={theme}>
      <div>
        <span style={{ right: 0, position: 'absolute' }}>
          {listType === 'related' && <Compare item={product} />}
          {listType === 'outfit' && <Remove item={product} />}
        </span>
        {img1 && (
          <Image src={hover ? img2 : img1} alt={product.name} onMouseEnter={onHover} onMouseLeave={onHover} />
        )}
      </div>
      <div>
        <small>{product.category}</small>
      </div>
      <div>
        <strong>{product.name}</strong>
      </div>
      <div>
        <p><em>{product.slogan}</em></p>
      </div>
      <div>
        {salePrice
          ? (
            <>
              <em style={{ color: 'red' }}>
                $
                {salePrice}
                &nbsp;
              </em>
              <s>
                $
                {product.default_price}
              </s>
            </>
          )
          : `$${product.default_price}`}
      </div>
      <div>
        {starRating ? (
          <>
            <StarView rating={starRating} fontSize={20} />
            <em><small> ({starRating})</small></em>
          </>
        ) : <em><small>...loading star rating</small></em>}
      </div>
    </Item>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string.isRequired,
    category: PropTypes.string.isRequired,
    default_price: PropTypes.string.isRequired,
    slogan: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductCard;

// return (
//   <Item onClick={handleClick} $theme={theme}>
//     <tbody>
//       <tr>
//         <td>
//           <span style={{ right: 0, position: 'absolute' }}>
//             {listType === 'related' && <Compare item={product} />}
//             {listType === 'outfit' && <Remove item={product} />}
//           </span>
//           {img1 && (
//             <Image src={hover ? img2 : img1} alt="product image" onMouseEnter={onHover} onMouseLeave={onHover} />
//           )}
//         </td>
//       </tr>
//       <tr>
//         <td>
//           <small>{product.category}</small>
//         </td>
//       </tr>
//       <tr>
//         <td>
//           <strong>{product.name}</strong>
//         </td>
//       </tr>
//       <tr>
//         <td  style={{ textOverflow: 'ellipsis' }}>
//           <em>{product.slogan}</em>
//         </td>
//       </tr>
//       <tr>
//         <td>
//           {salePrice
//             ? (
//               <>
//                 <em style={{ color: 'red' }}>
//                   $
//                   {salePrice}
//                   &nbsp;
//                 </em>
//                 <s>
//                   $
//                   {product.default_price}
//                 </s>
//               </>
//             )
//             : `$${product.default_price}`}
//         </td>
//       </tr>
//       <tr>
//         <td>
//           {starRating ? (
//             <>
//               <StarView rating={starRating} fontSize={20} />
//               <em><small> ({starRating})</small></em>
//             </>
//           ) : <em><small>...loading star rating</small></em>}
//         </td>
//       </tr>
//     </tbody>

//   </Item>
// );
// };