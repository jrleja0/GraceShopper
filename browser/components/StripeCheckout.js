import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchRecentOrder, removeCart, removeItem, updateSubmitCart } from '../action-creators/cart';
import Stripe from 'react-stripe-checkout';
import browserHistory from 'react-router';
import Cart from './Cart';

/* -----------------    COMPONENT     ------------------ */

class StripeCheckout extends Component {
    constructor(props) {
        super(props);
        this.onToken = this.onToken.bind(this);
    }

    onToken (token) {
        const completedOrder = this.props.currentCart;
        this.props.submitOrder(completedOrder, this.props.user.id);
    }
   
    render(){
        return (
            <div>
            <Cart currentCart={this.props.currentCart}
                user={this.props.user}
                processingOrder={true}
                discount={this.props.discount}
            />
            <h4 className="table-headers">Total: $ {this.props.currentCart.totalPrice}</h4>
            <Stripe
                // email={this.props.user ? this.props.user.email : null}
                token={this.onToken}
                stripeKey="pk_test_bPEj4xOuaYUyPkOjv6Om7s46"
                name="Dining with the Stars" // the pop-in header title
                description="Please enter your billing information below" // the pop-in header subtitle
                ComponentClass="div"
                panelLabel="Place Order for" // prepended to the amount in the bottom pay button
                amount={ this.props.currentCart.totalPrice * 100 } // cents
                currency="USD"
                shippingAddress
                billingAddress={false}
                zipCode={false}
            />
            </div> 
        )
    }
}


const mapState = state => {
    return {
        currentCart: state.cart.current,
        user: state.user,
        discount:state.cart.discount
    };
};

const mapDispatch = dispatch => {
    return {
        submitOrder: (cart, userId) => {
            dispatch(updateSubmitCart(cart.id, userId));
        }
    };
};

export default connect(mapState, mapDispatch)(StripeCheckout);