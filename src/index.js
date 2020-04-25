import React from 'react';
import ReactDOM from 'react-dom';

const myh1 = React.createElement('h1',{class:'title'},'这是一个标题');

ReactDOM.render(myh1,document.getElementById('app'))