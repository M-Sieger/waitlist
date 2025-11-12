# 📊 Validation Survey – Deployment & Tracking Guide

**Created:** 12.11.2025  
**URL:** https://m-recon.com/validation-survey  
**Purpose:** Product-Market Fit validation + WTP testing + SACCO segmentation

---

## 🎯 WHAT THIS IS

**16-Question Survey** to validate:
1. **Pain Points:** How much time SMEs spend on M-Pesa bookkeeping
2. **Loan Rejection:** Is "insufficient records" the #1 reason?
3. **Willingness to Pay:** Would users pay KES 500/mo for M-Recon?
4. **SACCO Membership:** % of respondents in SACCOs (for GTM strategy)

**Incentive:** KES 150 M-Pesa payment per completed survey (8 minutes)

---

## 📋 SURVEY STRUCTURE

### **Section 1: Business Info (2 questions)**
- Q1: Business type (Duka, Mama Mboga, Salon, etc.)
- Q2: SACCO/Chama member? → **KEY for segmentation**

### **Section 2: M-Pesa Usage (1 question)**
- Q3: How do you use M-Pesa? (checkbox: payments, suppliers, etc.)

### **Section 3: Loan Experience (3 questions)**
- Q4: Ever applied for loan? (Yes/No)
- Q5: Outcome? (Approved, Rejected, Waiting)
- Q6: If rejected, why? → **KEY: "Insufficient financial records"**

### **Section 4: Current Record Keeping (3 questions)**
- Q7: How do you track finances? (Notebook, Excel, M-Pesa only, etc.)
- Q8: Time spent organizing records per MONTH? → **Pain quantification**
- Q9: Tell us ONE specific problem (open-ended) → **Qualitative gold**

### **Section 5: Time & Cost (1 question)**
- Q10: If loan approval took 5 min instead of days, how helpful?

### **Section 6: Solution Fit (2 questions)**
- Q11: Would M-Recon help? (No, Maybe, Yes, Game-changing)
- Q12: What would it change for you? (open-ended)

### **Section 7: Pricing (3 questions)**
- Q13: Current spending on bookkeeping tools?
- Q14: Would you try FREE 1-month trial? → **Conversion signal**
- Q15: After trial, pay KES 500/mo? → **KEY WTP metric**

### **Section 8: Payment (1 question)**
- Q16: M-Pesa phone number (for KES 150 payment)

---

## 🚀 DEPLOYMENT CHECKLIST

### **Step 1: Supabase Schema (CRITICAL!)**

```bash
# Run this in Supabase SQL Editor:
# https://app.supabase.com/project/jakqhnvgbjtrjjirqlqa/editor/sql

# Copy-paste content from: supabase-survey-schema.sql
# Creates table: validation_survey_responses
```

**Verify:**
- ✅ Table exists in Supabase → Table Editor
- ✅ RLS policies enabled (public can INSERT, authenticated can SELECT)

---

### **Step 2: Deploy to Vercel**

```bash
# From /home/mo/dev/waitlist directory:
git add app/validation-survey app/api/validation-survey supabase-survey-schema.sql
git commit -m "feat: validation survey page (16-question PMF test)"
git push origin main

# Vercel auto-deploys to: https://m-recon.com/validation-survey
```

**Test Deployment:**
1. Open: https://m-recon.com/validation-survey
2. Fill out 1 question → Click "Next" → Should work
3. Submit survey (use test phone: 0712345678)
4. Check Supabase → Table Editor → validation_survey_responses
5. Should see 1 row with your test data

---

### **Step 3: Manual M-Pesa Payments (KES 150 per response)**

**TEMPORARY PROCESS (until Daraja API integration):**

1. **Daily:** Check Supabase for new responses
   ```sql
   SELECT phone_number, submitted_at, paid_commitment
   FROM validation_survey_responses
   WHERE payment_sent = FALSE
   ORDER BY submitted_at DESC;
   ```

2. **Send M-Pesa:** For each phone_number
   - Open M-Pesa app → Send Money
   - Amount: KES 150
   - Recipient: [phone_number from table]
   - Message: "M-Recon Survey Payment - Asante!"

3. **Mark as Paid:**
   ```sql
   UPDATE validation_survey_responses
   SET payment_sent = TRUE, payment_sent_at = NOW()
   WHERE phone_number = '0712345678';
   ```

**Time:** ~2 minutes per payment (10 responses = 20 min/day)

**LATER (Phase 2):** Automate via Daraja API (M-Pesa B2C)
- See: https://developer.safaricom.co.ke/APIs/BusinessToCustomer
- Requires Business Paybill (not needed for now)

---

## 📢 DISTRIBUTION STRATEGY

### **Channel 1: Grace's Network (PRIMARY)**

**WhatsApp Message Template:**
```
🎁 EARN KES 150 in 8 minutes!

Help us improve financial tools for small businesses in Kenya.

Take our quick survey:
👉 https://m-recon.com/validation-survey

What you get:
✅ KES 150 via M-Pesa (sent within 24h)
✅ Early access to M-Recon app
✅ Help build better loan application tools

Only 8 minutes! 📱

Asante sana! 🙏
- Mo & Grace, M-Recon Team
```

**Target Groups:**
- Grace's 10 SME contacts (personal outreach)
- WhatsApp business groups (Mama Mbogas, Dukas)
- Grace's cousins (family network)

**Goal:** 30-50 responses in Week 1

---

### **Channel 2: Waitlist Page CTA (SECONDARY)**

**Add to waitlist page (`/`):**
```jsx
// After waitlist form submission success:
<div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mt-6">
  <h3 className="font-semibold text-gray-900 mb-2">
    🎁 Earn KES 150 - Help Us Build M-Recon
  </h3>
  <p className="text-sm text-gray-700 mb-3">
    Take our 8-minute survey about M-Pesa bookkeeping.
    Get paid KES 150 via M-Pesa!
  </p>
  <a 
    href="/validation-survey"
    className="inline-block bg-green-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-green-700"
  >
    Take Survey & Get Paid →
  </a>
</div>
```

**Goal:** 10-20 additional responses from organic traffic

---

### **Channel 3: Facebook Ads (IF NEEDED)**

**Campaign Setup:**
- Budget: KES 5,000 (covers 30 responses × KES 150 + ad spend)
- Audience: Kenya, 25-45 years, Small Business Owners
- Placement: Mobile only (News Feed)

**Ad Copy:**
```
Headline: Earn KES 150 in 8 Minutes 💰
Body: Help improve loan application tools for Kenyan SMEs.
      Answer 16 quick questions → Get KES 150 via M-Pesa today!
CTA: Take Survey Now
Link: https://m-recon.com/validation-survey
```

**Only run IF:**
- Grace's network delivers <20 responses in Week 1
- Need 50+ total for statistical significance

---

## 📊 SUCCESS METRICS

### **Week 1 Targets:**

```yaml
Quantity:
  - 50+ total responses (minimum for valid analysis)
  - 30+ from Grace's network
  - 10+ from waitlist CTA
  - 10+ from paid ads (optional)

Quality:
  - 40%+ say "Yes, definitely" or "Yes, if it helps me get a loan" to Q15 (WTP KES 500/mo)
  - 60%+ mention "Insufficient financial records" as loan rejection reason (Q6)
  - 30%+ are SACCO/Chama members (Q2) → validates SACCO GTM strategy
  - 50%+ spend 2+ hours/month on financial records (Q8) → pain quantification

Engagement:
  - <10% drop-off rate (measure: incomplete responses)
  - Average completion time: 6-10 minutes
  - 5+ qualitative stories in Q9 (concrete problem examples)
```

---

## 📈 DATA ANALYSIS (End of Week 1)

### **Export Responses from Supabase:**

```sql
-- All responses
SELECT * FROM validation_survey_responses
ORDER BY submitted_at DESC;

-- Export to CSV (Supabase Dashboard → Table Editor → Download CSV)
```

### **Key Metrics to Calculate:**

**1. Willingness to Pay (WTP):**
```sql
-- Q15: After free trial, pay KES 500/mo?
SELECT 
  paid_commitment,
  COUNT(*) as count,
  ROUND(COUNT(*) * 100.0 / SUM(COUNT(*)) OVER(), 1) as percentage
FROM validation_survey_responses
GROUP BY paid_commitment
ORDER BY count DESC;

-- Target: 40%+ "Yes, definitely" + "Yes, if it helps me get a loan"
```

**2. SACCO Membership Segmentation:**
```sql
-- Q2: SACCO/Chama member?
SELECT 
  sacco_member,
  COUNT(*) as count
FROM validation_survey_responses
GROUP BY sacco_member;

-- Target: 30%+ "Yes, SACCO member"
```

**3. Loan Rejection Reasons:**
```sql
-- Q6: If rejected, why?
SELECT 
  rejection_reason,
  COUNT(*) as count
FROM validation_survey_responses
WHERE rejection_reason IS NOT NULL
GROUP BY rejection_reason
ORDER BY count DESC;

-- Target: "Insufficient financial records" = top reason
```

**4. Time Spent on Records:**
```sql
-- Q8: Time spent per month?
SELECT 
  time_spent,
  COUNT(*) as count
FROM validation_survey_responses
GROUP BY time_spent
ORDER BY count DESC;

-- Target: 50%+ spend "2-5 hours" or more
```

---

## 🚨 TROUBLESHOOTING

### **Problem: No responses coming in**

**Check:**
1. Is `/validation-survey` page live? (test URL)
2. Supabase table created? (check Table Editor)
3. API route working? (check Vercel logs)
4. Grace shared link? (WhatsApp confirmation)

**Fix:**
- Test submission yourself → check Supabase for new row
- If 0 rows → API issue (check Vercel Function Logs)
- If rows appearing → distribution issue (need more promo)

---

### **Problem: Submissions fail (500 error)**

**Check Vercel Logs:**
```bash
# https://vercel.com/m-sieger/waitlist/deployments
# → Select latest deployment → Functions → validation-survey
```

**Common Errors:**
- `SUPABASE_SERVICE_ROLE_KEY missing` → Add to Vercel ENV
- `Table does not exist` → Run supabase-survey-schema.sql
- `RLS policy blocks insert` → Check RLS settings

---

### **Problem: M-Pesa payments slow**

**Current Process (manual):**
- Pay within 24h (as promised in survey)
- Batch payments daily (10-20 at once)
- Update `payment_sent = TRUE` in Supabase

**Future Process (automated):**
- Integrate Daraja API (M-Pesa B2C)
- Auto-send KES 150 on survey submit
- Requires: Business Paybill setup (~2 weeks)

---

## 🎯 NEXT STEPS (After 50+ Responses)

### **1. Data Analysis (1-2 hours)**
- Export CSV from Supabase
- Calculate WTP %, SACCO %, Pain quantification
- Read all Q9 + Q12 qualitative responses

### **2. Decision Gate:**

```yaml
IF 40%+ WTP + 60%+ loan rejection pain:
  ✅ GREEN LIGHT: Proceed with MVP build
  → Start PDF PoC (see docs/PDF-POC-PLAN.md)
  → Update pricing: KES 500/mo confirmed
  → Focus SACCO partnerships (if 30%+ members)

IF 20-40% WTP + weak pain signals:
  ⚠️ YELLOW: Adjust positioning
  → Maybe pricing too high? Try KES 300/mo
  → Maybe loan-access messaging not resonating?
  → Need deeper interviews (Grace's 10 SMEs)

IF <20% WTP + low pain:
  ❌ RED LIGHT: Pivot or stop
  → M-Recon might not be strong value prop
  → Consider different solution (e.g., Daraja API integration)
```

### **3. Share Results (with stakeholders)**
- Grace: "Here's what your network told us..."
- SACCO outreach: Use data in pitch ("60% of SMEs rejected due to insufficient records")
- Investors (later): "We validated WTP with 50+ paid surveys"

---

## 📚 FILES REFERENCE

```
Codebase:
  - app/validation-survey/page.tsx (Survey UI)
  - app/api/validation-survey/route.ts (API endpoint)
  - supabase-survey-schema.sql (Database schema)

Docs:
  - docs/VALIDATION-SURVEY-GUIDE.md (This file)
  - docs/PRODUCT-VISION-2.0.md (Survey strategy context)
  - docs/GTM-STRATEGY.md (SACCO segmentation usage)
  - docs/PDF-POC-PLAN.md (Next step after survey validation)
```

---

**Last Updated:** 12.11.2025 by Mo Sieger + Copilot  
**Next Review:** After 50+ survey responses (target: end of Week 1)
