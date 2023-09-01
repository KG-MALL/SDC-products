// Horizontal list rendering
//import React from 'react';
import styled from 'styled-components';

export const Carousel = styled.div`
  list-style-type: none;
  inline-size: min-content;
  display: flex;
  flex-wrap: nowrap;
  overflow: hidden;
  flex: 0 0 auto;
  padding: 0;
  margin-top: 1vh;
  justify-content: center;
  height: 35em;
  align-items: center;
  border: 0;
  top: 50%;
  left: 50%;
`;

export const Item = styled.div`
  width: 20vw;
  height: auto;
  max-height: min-height;
  align-items: center;
  position: relative;
  margin: .5rem;
  padding-bottom: .6em;
  background-color: ${({ $theme }) => ($theme === 'dark' ? '#2c2c2c' : '#f5f5f5')};
  border: 0;
  line-height: 1.2em;
  flex-shrink: 2;
  & p {
    margin: 0;
    padding: 4px;
    font-size: small;
    overflow-x: hidden;
    white-space:nowrap;
    text-overflow:ellipsis;
  }
`;

export const Image = styled.img`
  padding: 0;
  margin: 0;
  object-fit: cover;
  height: 28em;
  width: 20vw;
`;
