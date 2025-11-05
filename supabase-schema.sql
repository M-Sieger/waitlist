-- M-Recon Waitlist Table Schema
-- Kopiere dieses SQL und führe es in Supabase SQL Editor aus

-- Waitlist-Table erstellen
CREATE TABLE waitlist_signups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email VARCHAR(255) NOT NULL UNIQUE,
  phone VARCHAR(20) NOT NULL,
  business_type VARCHAR(100) NOT NULL,
  transactions_per_month VARCHAR(20),
  referral_source VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  email_confirmed BOOLEAN DEFAULT FALSE,
  notes TEXT
);

-- Index für Performance
CREATE INDEX idx_email ON waitlist_signups(email);
CREATE INDEX idx_created_at ON waitlist_signups(created_at DESC);

-- Row Level Security (RLS) aktivieren
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

-- Policy: Public kann INSERTen (für Waitlist-Form)
CREATE POLICY "Allow public insert" ON waitlist_signups
  FOR INSERT TO anon
  WITH CHECK (true);

-- Policy: Nur Authenticated kann SELECTen (für Admin-Dashboard später)
CREATE POLICY "Allow authenticated read" ON waitlist_signups
  FOR SELECT TO authenticated
  USING (true);
