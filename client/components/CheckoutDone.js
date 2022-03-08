import React from 'react';

class CheckoutDone extends React.Component {
  render() {
    return (
      <div >
        <h2>Thank you for ordering</h2>
        <h3>Enjoy your hippo tea!</h3>
        <div display = 'flex'>
        <img src= 'https://media.giphy.com/media/lqMg6hf8Mie9cvsrmi/giphy.gif'
        align-items='center'/>
        </div>
        
      </div>
    );
  }
}

export default CheckoutDone;
