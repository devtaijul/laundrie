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

interface PaymentStatusProps {
  userName: string;
  orderNumber: string;
  paymentStatus: 'success' | 'failed' | 'pending';
  amount: string;
  paymentMethod: string;
  transactionId?: string;
  paymentDate: string;
}

export const PaymentStatus = ({
  userName,
  orderNumber,
  paymentStatus,
  amount,
  paymentMethod,
  transactionId,
  paymentDate,
}: PaymentStatusProps) => {
  const statusConfig = {
    success: {
      emoji: '✅',
      title: 'Payment Successful',
      message: 'Your payment has been processed successfully!',
      color: '#22c55e',
    },
    failed: {
      emoji: '❌',
      title: 'Payment Failed',
      message: 'Unfortunately, your payment could not be processed. Please try again or use a different payment method.',
      color: '#ef4444',
    },
    pending: {
      emoji: '⏳',
      title: 'Payment Pending',
      message: 'Your payment is being processed. We will notify you once it is confirmed.',
      color: '#f59e0b',
    },
  };

  const config = statusConfig[paymentStatus];

  return (
    <Html>
      <Head />
      <Preview>{config.title}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Heading style={{ ...h1, color: config.color }}>
            {config.emoji} {config.title}
          </Heading>
          <Text style={text}>Hi {userName},</Text>
          <Text style={text}>{config.message}</Text>
          
          <Section style={paymentInfo}>
            <Text style={label}>Order Number:</Text>
            <Text style={value}>#{orderNumber}</Text>
            
            <Text style={label}>Amount:</Text>
            <Text style={value}>{amount}</Text>
            
            <Text style={label}>Payment Method:</Text>
            <Text style={value}>{paymentMethod}</Text>
            
            {transactionId && (
              <>
                <Text style={label}>Transaction ID:</Text>
                <Text style={value}>{transactionId}</Text>
              </>
            )}
            
            <Text style={label}>Date:</Text>
            <Text style={value}>{paymentDate}</Text>
          </Section>

          <Text style={footer}>
            {paymentStatus === 'failed' 
              ? "If you need assistance, please contact our support team."
              : "Thank you for choosing Laundrie!"}
          </Text>
        </Container>
      </Body>
    </Html>
  );
};

export default PaymentStatus;

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

const paymentInfo = {
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

const footer = {
  color: '#8898aa',
  fontSize: '14px',
  lineHeight: '20px',
  padding: '20px 40px 0',
};
