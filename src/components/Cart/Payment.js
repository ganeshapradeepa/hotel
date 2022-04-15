import React, { useContext } from 'react'

import GooglePayButton from '@google-pay/button-react'
import CartContext from '../../Store/cart-context';

function Payment() {
    const cartCtx = useContext(CartContext);
 
  return (
    
    <div >
     
     
      <GooglePayButton
        environment="TEST"
        paymentRequest={{
          apiVersion: 2,
          apiVersionMinor: 0,
          allowedPaymentMethods: [
            {
              type: 'CARD',
              parameters: {
                allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
                allowedCardNetworks: ['MASTERCARD', 'VISA'],
              },
              tokenizationSpecification: {
                type: 'PAYMENT_GATEWAY',
                parameters: {
                  gateway: 'example',
                  gatewayMerchantId: 'hotelGatewayMerchantId',
                },
              },
            },
          ],
          merchantInfo: {
            merchantId: '123456789012345678901',
            merchantName: 'hotel Merchant',
          },
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPriceLabel: 'Total',
            totalPrice: cartCtx.totalAmount.toFixed(2),
            currencyCode: 'INR',
            countryCode: 'IN',
          },
          shippingAddressRequired: true,
          callbackIntents: ['SHIPPING_ADDRESS', 'PAYMENT_AUTHORIZATION'],
        }}
        onLoadPaymentData={paymentRequest => {
          console.log('Success', paymentRequest);
        }}
        onPaymentAuthorized={paymentData => {
            console.log('Payment Authorised Success', paymentData)
            return { transactionState: 'SUCCESS'}
          }
        }
        onPaymentDataChanged={paymentData => {
            console.log('On Payment Data Changed', paymentData)
            return { }
          }
        }
        existingPaymentMethodRequired='false'
        buttonSizeMode='fill'
        buttonColor='black'
        buttonType='Buy'
      />
    </div>
    
  );
}

export default Payment
