-- Validation Survey Responses Table
-- Stores responses from /validation-survey page (16-question PMF survey)
-- Purpose: Product-Market Fit validation + WTP analysis + SACCO segmentation

CREATE TABLE IF NOT EXISTS validation_survey_responses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  
  -- SECTION 1: Business Info
  business_type VARCHAR(100),
  sacco_member VARCHAR(100),
  
  -- SECTION 2: M-Pesa Usage (array of selected options)
  mpesa_usage TEXT[],
  
  -- SECTION 3: Loan Experience
  loan_applied VARCHAR(10),
  loan_outcome VARCHAR(100),
  rejection_reason VARCHAR(255),
  
  -- SECTION 4: Current Record Keeping
  record_keeping VARCHAR(100),
  time_spent VARCHAR(50),
  concrete_problem TEXT,
  
  -- SECTION 5: Pain Quantification
  time_savings VARCHAR(255),
  
  -- SECTION 6: Solution Fit
  solution_fit VARCHAR(100),
  solution_impact TEXT,
  
  -- SECTION 7: Willingness to Pay
  current_spending VARCHAR(100),
  free_trial VARCHAR(50),
  paid_commitment VARCHAR(100),
  
  -- Contact & Payment
  phone_number VARCHAR(20) NOT NULL,
  payment_sent BOOLEAN DEFAULT FALSE,
  payment_sent_at TIMESTAMP,
  
  -- Metadata
  submitted_at TIMESTAMP DEFAULT NOW(),
  user_agent TEXT,
  ip_address VARCHAR(45),
  
  -- Indexes
  created_at TIMESTAMP DEFAULT NOW()
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_survey_business_type ON validation_survey_responses(business_type);
CREATE INDEX IF NOT EXISTS idx_survey_sacco_member ON validation_survey_responses(sacco_member);
CREATE INDEX IF NOT EXISTS idx_survey_paid_commitment ON validation_survey_responses(paid_commitment);
CREATE INDEX IF NOT EXISTS idx_survey_submitted_at ON validation_survey_responses(submitted_at DESC);

-- Row Level Security (RLS)
ALTER TABLE validation_survey_responses ENABLE ROW LEVEL SECURITY;

-- Policy: Public can INSERT (for survey form submissions)
CREATE POLICY IF NOT EXISTS "Allow public insert" ON validation_survey_responses
  FOR INSERT TO anon
  WITH CHECK (true);

-- Policy: Only authenticated users can SELECT (for admin dashboard)
CREATE POLICY IF NOT EXISTS "Allow authenticated read" ON validation_survey_responses
  FOR SELECT TO authenticated
  USING (true);

-- Comments for documentation
COMMENT ON TABLE validation_survey_responses IS 'Stores responses from validation survey (/validation-survey page) - used for Product-Market Fit analysis';
COMMENT ON COLUMN validation_survey_responses.mpesa_usage IS 'Array of M-Pesa usage types (checkbox selections)';
COMMENT ON COLUMN validation_survey_responses.concrete_problem IS 'Open-ended response: Real problem user faced with M-Pesa bookkeeping';
COMMENT ON COLUMN validation_survey_responses.solution_impact IS 'Open-ended response: How M-Recon would help them specifically';
COMMENT ON COLUMN validation_survey_responses.phone_number IS 'M-Pesa number for KES 150 payment (incentive)';
COMMENT ON COLUMN validation_survey_responses.payment_sent IS 'Whether KES 150 has been sent via M-Pesa';
