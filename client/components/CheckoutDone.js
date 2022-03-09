import React from 'react';

class CheckoutDone extends React.Component {
  render() {
    return (
      <div >
        <h2 style={{color: '#1FA2F8'}}>Thank you for ordering</h2>
        <h3 style={{color: '#584C56'}}>Enjoy your hippo tea!</h3>
        <div style={{ alignItems: "center" }}>
        <img style={{ alignContent: "center" }} src= 'https://media.giphy.com/media/lqMg6hf8Mie9cvsrmi/giphy.gif'
        align-items='center'/>
        </div>
        
      </div>
    );
  }
}

export default CheckoutDone;
