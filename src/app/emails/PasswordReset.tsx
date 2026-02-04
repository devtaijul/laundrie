import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Text,
  Section,
  Button,
} from '@react-email/components';
import * as React from 'react';

interface PasswordResetProps {
  resetUrl: string;
  userName: string;
  expiryTime?: string;
}

export const PasswordReset = ({
  resetUrl,
  userName,
  expiryTime = '1 hour',
}: PasswordResetProps) => (
  <Html>
    <Head />
    <Preview>Reset your Laundrie password</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>Password Reset Request 🔐</Heading>
        <Text style={text}>Hi {userName},</Text>
        <Text style={text}>
          We received a request to reset your password for your Laundrie account. Click the button below to create a new password.
        </Text>
        <Section style={buttonContainer}>
          <Button style={button} href={resetUrl}>
            Reset Password
          </Button>
        </Section>
        <Text style={text}>
          Or copy and paste this link in your browser:
        </Text>
        <Link href={resetUrl} style={link}>
          {resetUrl}
        </Link>
        <Section style={warningBox}>
          <Text style={warningText}>
            ⚠️ This link will expire in {expiryTime}. If you didn't request a password reset, you can safely ignore this email.
          </Text>
        </Section>
        <Text style={footer}>
          For security reasons, this password reset link can only be used once. If you need to reset your password again, please request a new link.
        </Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordReset;

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
  margin: '40px 0',
  padding: '0 40px',
};

const text = {
  color: '#333',
  fontSize: '16px',
  lineHeight: '26px',
  padding: '0 40px',
  margin: '10px 0',
};

const buttonContainer = {
  padding: '27px 40px',
};

const button = {
  backgroundColor: '#5469d4',
  borderRadius: '8px',
  color: '#fff',
  fontSize: '16px',
  fontWeight: 'bold',
  textDecoration: 'none',
  textAlign: 'center' as const,
  display: 'block',
  padding: '12px 20px',
};

const link = {
  color: '#5469d4',
  fontSize: '14px',
  textDecoration: 'underline',
  padding: '0 40px',
  wordBreak: 'break-all' as const,
  display: 'block',
  margin: '10px 0',
};

const warningBox = {
  backgroundColor: '#fff3cd',
  border: '1px solid #ffc107',
  borderRadius: '8px',
  padding: '16px',
  margin: '20px 40px',
};

const warningText = {
  color: '#856404',
  fontSize: '14px',
  margin: 0,
  lineHeight: '20px',
};

const footer = {
  color: '#8898aa',
  fontSize: '12px',
  lineHeight: '16px',
  padding: '20px 40px 0',
};
