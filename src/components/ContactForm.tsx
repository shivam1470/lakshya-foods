import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';

export const ContactForm: React.FC = () => {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Placeholder submission logic
    setTimeout(() => setSubmitted(true), 400);
  }

  if (submitted) {
    return <div className="p-6 rounded-lg bg-herbal/10 text-herbal">Thank you! We will get back to you soon.</div>;
  }

  return (
  <Paper component="form" onSubmit={handleSubmit} elevation={0} sx={{ p: 3, display: 'flex', flexDirection: 'column', gap: 2, borderRadius: 3, border: '1px solid #eee' }}>
      <TextField
        label="Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        fullWidth
        required
        size="small"
      />
      <TextField
        label="Email"
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        fullWidth
        required
        size="small"
      />
      <TextField
        label="Message"
        name="message"
        value={form.message}
        onChange={handleChange}
        fullWidth
        required
        size="small"
        multiline
        minRows={5}
      />
      <Button type="submit" variant="contained" color="primary" fullWidth sx={{ fontWeight: 600 }}>
        Send Message
      </Button>
    </Paper>
  );
};
