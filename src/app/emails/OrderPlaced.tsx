import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
  Hr,
} from '@react-email/components';
import * as React from 'react';

interface OrderPlacedProps {
  userName: string;
  orderNumber: string;
  orderDate: string;
  pickupDate: string;
  deliveryDate: string;
  totalAmount: string;
  items: Array<{ name: string; quantity: number; price: string }>;
}

export const OrderPlaced = ({
  userName,
  orderNumber,
  orderDate,
  pickupDate,
  deliveryDate,
  totalAmount,
  items,
}: OrderPlacedProps) => (
  <Html>
    <Head />
    <Preview>Your Laundrie order has been placed successfully!</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Order Confirmation 📦</Heading>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>
          Thank you for your order! We've received your laundry and will take good care of it.
        </Text>
        
        <Section style={orderInfo}>
          <Text style={label}>Order Number:</Text>
          <Text style={value}>#{orderNumber}</Text>
          
          <Text style={label}>Order Date:</Text>
          <Text style={value}>{orderDate}</Text>
          
          <Text style={label}>Pickup Date:</Text>
          <Text style={value}>{pickupDate}</Text>
          
          <Text style={label}>Expected Delivery:</Text>
          <Text style={value}>{deliveryDate}</Text>
        </Section>

        <Hr style={hr} />

        <Heading style={h2}>Order Summary</Heading>
        {items.map((item, index) => (
          <Section key={index} style={itemRow}>
            <Text style={itemName}>{item.name} (x{item.quantity})</Text>
            <Text style={itemPrice}>{item.price}</Text>
          </Section>
        ))}

        <Hr style={hr} />

        <Section style={totalRow}>
          <Text style={totalLabel}>Total Amount:</Text>
          <Text style={totalValue}>{totalAmount}</Text>
        </Section>

        <Text style={footer}>
          We'll notify you when your order is ready for delivery. If you have any questions, feel free to contact our support team.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default OrderPlaced;

const main = {
  backgroundColor: '#f6f9fc',
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Ubuntu,sans-serif',
};

const container = {
  backgroundColor: '#ffffff',
  margin: '0 auto',
  padding: '20px 0 48px',
  marginBottom: '64px',
};

const h1 = {
  color: '#333',
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
  padding: '0 40px',
};

const h2 = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: '20px 0',
  padding: '0 40px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '10px 0',
};

const orderInfo = {
  padding: '20px 40px',
  backgroundColor: '#f8f9fa',
  margin: '20px 0',
};

const label = {
  color: '#666',
  fontSize: '14px',
  margin: '8px 0 4px',
};

const value = {
  color: '#333',
  fontSize: '16px',
  fontWeight: '600',
  margin: '0 0 12px',
};

const hr = {
  borderColor: '#e6ebf1',
  margin: '20px 40px',
};

const itemRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 40px',
  margin: '10px 0',
};

const itemName = {
  color: '#333',
  fontSize: '14px',
  margin: 0,
};

const itemPrice = {
  color: '#333',
  fontSize: '14px',
  fontWeight: '600',
  margin: 0,
};

const totalRow = {
  display: 'flex',
  justifyContent: 'space-between',
  padding: '20px 40px',
  backgroundColor: '#f8f9fa',
  margin: '20px 0',
};

const totalLabel = {
  color: '#333',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: 0,
};

const totalValue = {
  color: '#5469d4',
  fontSize: '18px',
  fontWeight: 'bold',
  margin: 0,
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  padding: '20px 40px 0',
};
