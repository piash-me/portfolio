import { NextRequest, NextResponse } from 'next/server';

// Sends contact form submissions to your email via Resend (resend.com — free tier
// covers portfolio-level traffic). Get an API key at resend.com, add it as
// RESEND_API_KEY in your .env.local and in Vercel's environment variables.

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      // Falls back to logging so the form doesn't hard-fail before Resend is configured.
      console.log('Contact form submission (RESEND_API_KEY not set):', { name, email, message });
      return NextResponse.json({ ok: true, note: 'Logged only — set RESEND_API_KEY to send real emails.' });
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Portfolio Contact Form <onboarding@resend.dev>',
        to: 'piashm03@gmail.com',
        subject: `New message from ${name}`,
        reply_to: email,
        text: `From: ${name} <${email}>\n\n${message}`,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Resend error:', err);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 502 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
  }
}
