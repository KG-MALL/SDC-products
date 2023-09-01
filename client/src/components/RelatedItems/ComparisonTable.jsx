import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StyledTable from '../../styled-components/comparison-table.jsx';
import CloseTable from './CloseTableButton.jsx';

const ComparisonTable = function ({currentProduct, comparedProduct}) {
  const[currentFeatures, setCurrentFeatures] = useState([]);
  const[comparedFeatures, setComparedFeatures] = useState([]);
  const[comparisonObject, setComparisonObject] = useState({});

  //get features for both products
  useEffect(() => {
    axios.get('/api/product/features', {
      params: {
        currentProductID: currentProduct.id,
      },
      responseType: 'json',
    })
      .then((response) => {
        setCurrentFeatures(response.data.features);
      })
      .catch((error) => error.message);
  }, [currentProduct]);

  useEffect(() => {
    axios.get('/api/product/features', {
      params: {
        currentProductID: comparedProduct.id,
      },
      responseType: 'json',
    })
      .then((response) => {
        setComparedFeatures(response.data.features);
      })
      .catch((error) => error.message);
  }, [comparedProduct]);

  // Create a comparison object and set new object state
  useEffect(() => {
    const comparison = {};
    currentFeatures.forEach((feature) => {
      comparison[feature.feature] = [feature.value, ''];
      if (feature.feature === null) {
        comparison[feature.feature] = ['✓', ''];
      }
    });
    comparedFeatures.forEach((feature) => {
      if (comparison[feature.feature] === undefined) {
        comparison[feature.feature] = ['', feature.value];
      } else if (feature.feature === null) {
        comparison[feature.feature][1] = '✓';
      } else {
        comparison[feature.feature][1] = feature.value;
      }
    });
    setComparisonObject(comparison);
  }, [currentFeatures, comparedFeatures]);

  // map to table rows
  const tableRows = Object.keys(comparisonObject)
    .sort()
    .map((key) => (
      <tr key={key}>
        <td>{comparisonObject[key][0]}</td>
        <td>{key}</td>
        <td>{comparisonObject[key][1]}</td>
      </tr>
    ));

  return (
    <StyledTable data-testid="compareTableTest">
      <thead>
        <tr style={{ position: 'sticky' }}>
          <th>{currentProduct.name}</th>
          <th>Comparing</th>
          <th>{comparedProduct.name}</th>
        </tr>
      </thead>
      <tbody>
        {tableRows}
      </tbody>
      <tfoot>
        <tr>
          <td> </td>
          <td> </td>
          <td><CloseTable /></td>
        </tr>
      </tfoot>
    </StyledTable>
  );
};

export default ComparisonTable;
