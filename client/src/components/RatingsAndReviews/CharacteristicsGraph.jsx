import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import descriptionArr from './descriptionArr.js';
import ThemeContext from '../ThemeContext.jsx';

function CharacteristicsGraph({ metaData }) {
  const [characteristics, setCharacteristics] = useState([]);
  useEffect(() => setCharacteristics(Object.keys(metaData)), [metaData]);
  const { theme } = useContext(ThemeContext);

  return (
    <div>
      <Title data-testid="char-graph-component">Characteristics</Title>
      <Container>
        {characteristics.length && characteristics.map((char) => (
          <BarGraphContainer key={char}>
            <div className="descriptions">
              {descriptionArr
                .filter((descObj) => (descObj.attribute === char.toLowerCase()))[0]
                .descArr.filter((desc, index) => !(index % 2))
                .map((feedback) => <Description key={feedback}>{feedback}</Description>)}
            </div>
            <BarGraph>
              <Characteristic>{char}</Characteristic>
              <LeftBar $theme={theme} $metaData={metaData} $char={char} />
              <span>X</span>
              <RightBar $theme={theme} $metaData={metaData} $char={char} />
            </BarGraph>
          </BarGraphContainer>
        ))}
      </Container>
    </div>
  );
}

const Title = styled.h5`
  margin-top: 0;
  text-align: center`;

const Container = styled.div`
  margin-top: 0.625rem;`;

const Description = styled.span`
  font-size: 0.625em;
  width: 33%;`;

const BarGraphContainer = styled.div`
  margin-top: 0.325rem`;

const BarGraph = styled.div`
  display: flex;
  align-items: center;`;

const Characteristic = styled.span`
  width: 6.25rem;
  font-size: 0.938em;`;

const LeftBar = styled.div`
  height: 1px;
  width: ${({ $metaData, $char }) => (100 - (($metaData[$char]?.value - 1) / 5) * 100)}%;
  background: ${({ $theme }) => ($theme === 'light' ? '#303030' : 'white')};`;

const RightBar = styled(LeftBar)`
  width: ${({ $metaData, $char }) => ((($metaData[$char]?.value - 1) / 5) * 100)}%;`;

CharacteristicsGraph.propTypes = {
  // eslint-disable-next-line react/require-default-props
  metaData: propTypes.shape({
    Comfort: propTypes.shape({
      id: propTypes.number,
      value: propTypes.string,
    }),
    Size: propTypes.shape({
      id: propTypes.number,
      value: propTypes.string,
    }),
    Width: propTypes.shape({
      id: propTypes.number,
      value: propTypes.string,
    }),
    Fit: propTypes.shape({
      id: propTypes.number,
      value: propTypes.string,
    }),
    Length: propTypes.shape({
      id: propTypes.number,
      value: propTypes.string,
    }),
  }),
};
export default CharacteristicsGraph;
