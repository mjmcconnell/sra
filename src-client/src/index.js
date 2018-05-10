import React from 'react';
import ReactDOM from 'react-dom';
import Table from './components/table/Table';

import './index.css';

const App = () => (
    <Table />
);

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
