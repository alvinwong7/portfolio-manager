import React from 'react';

class NewStockForm extends React.Component {
  render() {
    return (
      <form>
        <h1>Hello</h1>
        <p>Enter the Code of the stock name:</p>
        <input
          type="text"
        />
      </form>
    );
  }
}

export { NewStockForm };
