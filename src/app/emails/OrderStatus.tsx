import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Text,
  Section,
} from '@react-email/components';
import * as React from 'react';

interface OrderStatusProps {
  userName: string;
  orderNumber: string;
  status: 'picked-up' | 'in-progress' | 'ready' | 'out-for-delivery' | 'delivered';
  estimatedDelivery?: string;
  trackingUrl?: string;
}

export const OrderStatus = ({
  userName,
  orderNumber,
  status,
  estimatedDelivery,
  trackingUrl,
}: OrderStatusProps) => {
  const statusConfig = {
    'picked-up': {
      emoji: '📦',
      title: 'Order Picked Up',
      message: 'Our driver has picked up your laundry!',
      color: '#3b82f6',
    },
    'in-progress': {
      emoji: '🧺',
      title: 'Order In Progress',
      message: 'Your laundry is being washed and cleaned with care.',
      color: '#8b5cf6',
    },
    'ready': {
      emoji: '✨',
      title: 'Order Ready',
      message: 'Great news! Your laundry is clean and ready for delivery.',
      color: '#22c55e',
    },
    'out-for-delivery': {
      emoji: '🚚',
      title: 'Out For Delivery',
      message: 'Your order is on its way to you!',
      color: '#f59e0b',
    },
    'delivered': {
      emoji: '🎉',
      title: 'Order Delivered',
      message: 'Your laundry has been delivered. Enjoy your fresh, clean clothes!',
      color: '#22c55e',
    },
  };

  const config = statusConfig[status];

  return (
    <Html>
      <Head />
      <Preview>{config.title} - Order #{orderNumber}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={{ ...h1, color: config.color }}>
            {config.emoji} {config.title}
          </Heading>
          <Text style={text}>Hi {userName},</Text>
          <Text style={text}>{config.message}</Text>
          
          <Section style={orderInfo}>
            <Text style={label}>Order Number:</Text>
            <Text style={value}>#{orderNumber}</Text>
            
            <Text style={label}>Status:</Text>
            <Text style={{ ...value, color: config.color }}>
              {status.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
            </Text>
            
            {estimatedDelivery && (
              <>
                <Text style={label}>Estimated Delivery:</Text>
                <Text style={value}>{estimatedDelivery}</Text>
              </>
            )}
          </Section>

          {trackingUrl && (
            <Section style={trackingSection}>
              <Text style={trackingText}>
                Track your order: <a href={trackingUrl} style={link}>{trackingUrl}</a>
              </Text>
            </Section>
          )}

          <Text style={footer}>
            Thank you for choosing Laundrie. We appreciate your business!
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default OrderStatus;

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
  fontSize: '24px',
  fontWeight: 'bold',
  margin: '40px 0 20px',
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

const trackingSection = {
  padding: '0 40px',
  margin: '20px 0',
};

const trackingText = {
  color: '#333',
  fontSize: '14px',
  margin: 0,
};

const link = {
  color: '#5469d4',
  textDecoration: 'underline',
};

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  padding: '20px 40px 0',
};
