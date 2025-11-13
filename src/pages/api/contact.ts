import type { APIRoute } from 'astro';

/**
 * RATE LIMITING NOTE FOR PRODUCTION:
 *
 * ⚠️ WARNING: In-memory rate limiting does NOT work in serverless environments!
 * Each request may be handled by a different instance, so the rate limit map
 * will not be shared across requests.
 *
 * For production deployment on Vercel, implement one of these solutions:
 *
 * 1. Vercel KV (Redis) - Recommended:
 *    ```bash
 *    npm install @vercel/kv
 *    ```
 *    ```typescript
 *    import { kv } from '@vercel/kv';
 *    const key = `rate_limit:${ip}`;
 *    const count = await kv.incr(key);
 *    if (count === 1) await kv.expire(key, 3600); // 1 hour
 *    if (count > 5) return error;
 *    ```
 *
 * 2. Upstash Redis:
 *    ```bash
 *    npm install @upstash/redis
 *    ```
 *    Similar implementation to Vercel KV
 *
 * 3. Vercel Edge Middleware with rate limiting
 *
 * Current implementation is kept for development only.
 */
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const limit = rateLimitMap.get(ip);

  if (!limit || now > limit.resetTime) {
    rateLimitMap.set(ip, {
      count: 1,
      resetTime: now + 3600000, // 1 hour
    });
    return true;
  }

  if (limit.count >= 5) {
    return false;
  }

  limit.count++;
  return true;
}

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  try {
    // Rate limiting
    if (!checkRateLimit(clientAddress)) {
      return new Response(
        JSON.stringify({ error: 'Too many requests. Please try again later.' }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const data = await request.json();
    const { name, email, message, purpose, honeypot } = data;

    // Honeypot check (bot protection)
    if (honeypot) {
      return new Response(
        JSON.stringify({ success: true }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Validation
    if (!name || !email || !message) {
      return new Response(
        JSON.stringify({ error: 'Please fill in all required fields.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!emailRegex.test(email)) {
      return new Response(
        JSON.stringify({ error: 'Please enter a valid email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (name.length > 100 || email.length > 100 || message.length > 5000) {
      return new Response(
        JSON.stringify({ error: 'Input too long.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Email sending configuration
    const emailConfig = {
      to: import.meta.env.EMAIL_TO || 'info@kunolapidary.com',
      from: import.meta.env.EMAIL_FROM || 'noreply@kunolapidary.com',
      subject: `Contact Form: ${purpose || 'General Inquiry'} from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Purpose:</strong> ${purpose || 'General Inquiry'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>Sent from: ${clientAddress}</small></p>
      `,
      text: `
        New Contact Form Submission
        
        Name: ${name}
        Email: ${email}
        Purpose: ${purpose || 'General Inquiry'}
        
        Message:
        ${message}
        
        ---
        Sent from: ${clientAddress}
      `,
    };

    // Send email using your preferred service
    // Example with Resend (uncomment and configure):
    /*
    if (import.meta.env.EMAIL_API_KEY) {
      const resend = new Resend(import.meta.env.EMAIL_API_KEY);
      await resend.emails.send({
        from: emailConfig.from,
        to: emailConfig.to,
        subject: emailConfig.subject,
        html: emailConfig.html,
        text: emailConfig.text,
      });
    }
    */

    // For development/demo, just log the email
    if (import.meta.env.DEV) {
      console.log('📧 Email would be sent:', emailConfig);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        message: 'Thank you for your message. We will get back to you soon!' 
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Contact form error:', error);
    return new Response(
      JSON.stringify({ error: 'An error occurred. Please try again later.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

export const prerender = false;
