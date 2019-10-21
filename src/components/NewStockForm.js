import React from 'react';

class NewStockForm extends React.Component {
  render() {
    let AV = window.alphavantage.default({ key: 'Q57E765E5P4NIGUH' });
    let data = AV.data.quote('msft').then(data => {
      console.log(data);
    });
    return (
      <form>
        <h1>Hello</h1>
        <p>Enter the Code of the stock name:</p>
        <script src="../node_modules/alphavantage/dist/bundle.js"></script>
        <input
          type="text"
        />
      </form>
    );
  }
}

export { NewStockForm };
