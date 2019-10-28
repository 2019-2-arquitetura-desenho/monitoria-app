import React from 'react';
import ReactDOM from 'react-dom';

import Root from './skins/root';

import './index.css';


require('dotenv').config();

ReactDOM.render(<Root />, document.getElementById('root'));
