# 🧪 PDF Parsing Proof-of-Concept (PoC) Action Plan

**Last Updated:** 12.11.2025  
**Priority:** CRITICAL (GO/NO-GO gate for MVP)  
**Timeline:** Week 1 (before MVP commit)

---

## 🎯 PURPOSE

**WARUM dieser PoC JETZT passieren muss:**

```yaml
Problem:
  - M-Recon's core value = PDF parsing accuracy
  - IF parsing <70% accuracy → Product doesn't work
  - IF parsing 70-85% → Needs human-in-loop (extra cost)
  - IF parsing >85% → Fully automated (ideal)

Risk:
  - Du hast KEINE realen M-Pesa PDFs getestet
  - Kenya M-Pesa PDF format könnte variieren
  - Password-protection könnte parsing blocken
  - Tabular data extraction ist notoriously tricky

Decision Gate:
  - >85% accuracy → PROCEED with MVP build
  - 70-85% accuracy → ADJUST (human review layer)
  - <70% accuracy → PIVOT (Daraja API for formal businesses)
```

**Bottom Line: Dieser PoC ist DEIN MOST IMPORTANT TASK diese Woche!**

---

## 📋 PoC PHASES

### **Phase 1: Data Collection (Day 1)**

**Goal:** Get 50 real M-Pesa PDFs (redacted for privacy)

**Sources:**
1. **Grace's Network (PRIMARY):**
   - Ask Grace: "Can you get 10-20 M-Pesa statement PDFs from your SME contacts?"
   - Redaction: Black out names, phone numbers, ID numbers (keep transaction data)
   - Tool: Adobe PDF redaction or manual screenshot → blur in Photoshop

2. **Your Own M-Pesa Account:**
   - Download your own statement (12 months if possible)
   - Use as baseline for format understanding

3. **Grace's Cousins (10 KMU interviews):**
   - During interviews, ask: "Can I see your M-Pesa statement? I'll redact personal info"
   - Offer: KES 200 M-Pesa tip for sharing (builds trust)

4. **Online (LAST RESORT):**
   - Google: "Kenya M-Pesa statement sample PDF"
   - Reddit: r/Kenya (ask for anonymized samples)
   - Risk: Might be outdated formats

**Target:**
- Minimum: 20 PDFs (viable PoC)
- Ideal: 50 PDFs (high confidence)
- Distribution: Mix of Dukas, Salons, Mama Mbogas, Transport, etc.

---

### **Phase 2: Technical Setup (Day 2 Morning)**

**Goal:** Setup Python parsing environment + baseline test

**Tech Stack Options:**

```yaml
Option 1: PDFPlumber (RECOMMENDED)
  Pros: Best for tabular data, high accuracy
  Cons: Complex setup, requires debugging
  Installation: pip install pdfplumber pandas

Option 2: Tabula-py
  Pros: Great for tables, Java-based (robust)
  Cons: Requires Java installation, heavier
  Installation: pip install tabula-py

Option 3: PyPDF2 + Regex
  Pros: Lightweight, simple
  Cons: Low accuracy for tables, manual parsing
  Installation: pip install PyPDF2
```

**Setup Steps:**

```bash
# 1. Create PoC directory
mkdir -p ~/dev/mpesa-poc
cd ~/dev/mpesa-poc

# 2. Create Python virtual environment
python3 -m venv venv
source venv/bin/activate

# 3. Install dependencies
pip install pdfplumber pandas tabula-py openpyxl

# 4. Create test script
touch parse_test.py

# 5. Create data folder
mkdir pdfs_redacted
mkdir results
```

**Baseline Test Script (`parse_test.py`):**

```python
import pdfplumber
import pandas as pd
import os
from datetime import datetime

def parse_mpesa_statement(pdf_path):
    """
    Parse M-Pesa PDF statement and extract transactions
    
    Returns:
        DataFrame with columns: Date, Details, Transaction, Paid In, 
                                Withdrawn, Balance, Receipt No
    """
    transactions = []
    
    with pdfplumber.open(pdf_path) as pdf:
        for page in pdf.pages:
            # Extract tables (M-Pesa statements are tabular)
            tables = page.extract_tables()
            
            if tables:
                for table in tables:
                    # Skip header rows
                    for row in table[1:]:  # Skip first row (headers)
                        if len(row) >= 7:  # M-Pesa has 7 columns
                            transactions.append({
                                'Date': row[0],
                                'Details': row[1],
                                'Transaction': row[2],
                                'Paid_In': row[3],
                                'Withdrawn': row[4],
                                'Balance': row[5],
                                'Receipt_No': row[6]
                            })
    
    return pd.DataFrame(transactions)

def test_single_pdf(pdf_path):
    """Test parsing on single PDF"""
    print(f"\n📄 Testing: {pdf_path}")
    
    try:
        df = parse_mpesa_statement(pdf_path)
        
        print(f"✅ Extracted {len(df)} transactions")
        print(f"\nFirst 5 rows:")
        print(df.head())
        
        # Save to Excel for manual inspection
        output_path = f"results/{os.path.basename(pdf_path)}.xlsx"
        df.to_excel(output_path, index=False)
        print(f"💾 Saved to: {output_path}")
        
        return len(df)
    
    except Exception as e:
        print(f"❌ ERROR: {e}")
        return 0

if __name__ == "__main__":
    # Test all PDFs in folder
    pdf_folder = "pdfs_redacted"
    
    if not os.path.exists(pdf_folder):
        print("❌ Folder 'pdfs_redacted' not found!")
        print("Create it and add M-Pesa PDF samples.")
        exit(1)
    
    pdfs = [f for f in os.listdir(pdf_folder) if f.endswith('.pdf')]
    
    if not pdfs:
        print("❌ No PDFs found in 'pdfs_redacted' folder!")
        exit(1)
    
    print(f"🔍 Found {len(pdfs)} PDFs to test\n")
    
    total_transactions = 0
    successful = 0
    
    for pdf_file in pdfs:
        pdf_path = os.path.join(pdf_folder, pdf_file)
        count = test_single_pdf(pdf_path)
        
        if count > 0:
            successful += 1
            total_transactions += count
    
    print(f"\n📊 SUMMARY:")
    print(f"   PDFs tested: {len(pdfs)}")
    print(f"   Successful: {successful} ({successful/len(pdfs)*100:.1f}%)")
    print(f"   Total transactions: {total_transactions}")
    print(f"   Avg per PDF: {total_transactions/successful if successful > 0 else 0:.0f}")
```

---

### **Phase 3: Manual Accuracy Testing (Day 2 Afternoon - Day 3)**

**Goal:** Measure parsing accuracy against ground truth

**Process:**

1. **Select 5 Representative PDFs:**
   - 1 Duka (high transaction volume)
   - 1 Mama Mboga (low volume, simple)
   - 1 Salon (medium volume)
   - 1 Transport (mixed transactions)
   - 1 Grace's own statement (baseline)

2. **Manual Verification:**
   - For EACH PDF, count transactions manually (ground truth)
   - Compare to parsed Excel output
   - Calculate accuracy:
     ```
     Accuracy = (Correctly Parsed Transactions / Total Transactions) × 100
     ```

3. **Error Analysis:**
   - **Missing Rows:** Transaction not extracted
   - **Extra Rows:** Non-transaction row parsed as transaction
   - **Field Errors:** Wrong column mapping (e.g., Paid In → Withdrawn)
   - **Format Errors:** Date parsing fails, numbers as text

**Accuracy Scoring:**

```yaml
TRANSACTION-LEVEL Accuracy:
  - Count: Did we extract the right NUMBER of transactions?
  - Target: 90%+ (e.g., 180/200 transactions found)

FIELD-LEVEL Accuracy:
  - Per Field: Is Date correct? Amount correct? Type correct?
  - Target: 85%+ per field
  
OVERALL Accuracy:
  - Combined: Transaction count × Field accuracy
  - Target: >85% (proceed with MVP)
  - Yellow Zone: 70-85% (need human review layer)
  - Red Zone: <70% (reconsider strategy)
```

**Template for Tracking:**

```
PDF: mama_mboga_001.pdf
Manual Count: 45 transactions
Parsed Count: 42 transactions
Missing: 3 (dates: 15/03, 22/03, 31/03)

Field Accuracy:
  - Date: 40/42 correct (95%)
  - Details: 38/42 correct (90%) [2 merged rows, 2 truncated]
  - Paid In: 42/42 correct (100%)
  - Withdrawn: 41/42 correct (98%) [1 number as text "1,500.00"]
  - Balance: 42/42 correct (100%)

OVERALL: 42/45 transactions × 90% field accuracy = 84% (YELLOW - needs review layer)
```

---

### **Phase 4: Edge Case Testing (Day 4)**

**Goal:** Test parsing on problematic PDFs

**Edge Cases to Test:**

1. **Password-Protected PDFs:**
   - M-Pesa PDFs are password-protected with ID number
   - Test: Can pdfplumber handle this? (Likely YES, but verify)
   - Workaround: Ask users to unlock before upload (add to onboarding)

2. **Multi-Page Statements (6-12 months):**
   - Test: Does parsing work across 20-50 pages?
   - Risk: Page headers/footers might be parsed as transactions
   - Mitigation: Filter out rows with "M-PESA Statement" or "Page X of Y"

3. **Different M-Pesa Formats:**
   - Personal account vs Business account (Paybill/Till)
   - 2023 format vs 2024 format (did Safaricom change layout?)
   - Test: Do older PDFs parse correctly?

4. **Corrupted/Low-Quality PDFs:**
   - Scanned PDFs (image-based, not text-based)
   - Risk: pdfplumber can't extract text from images
   - Detection: If 0 transactions extracted → show error: "Please upload text-based PDF"

5. **Non-English Text (Swahili):**
   - Some transaction details might be in Swahili
   - Test: Does this break categorization?
   - Example: "Biashara" (business), "Matumizi" (expenses)

**Edge Case Handling Strategy:**

```yaml
IF password-protected:
  → Show: "Please unlock PDF with your ID number before uploading"
  
IF scanned/image PDF:
  → Show: "This PDF is scanned. Please request text-based statement from M-Pesa"
  
IF parsing accuracy <70%:
  → Fallback: "We found issues. Do you want manual review? (KES 200 extra)"
  
IF format unknown:
  → Email to support: "New format detected, we'll add support in 48h"
```

---

### **Phase 5: Decision Gate (End of Day 4)**

**GO/NO-GO Criteria:**

```yaml
GREEN LIGHT (Proceed with MVP):
  ✅ 85%+ transaction extraction accuracy
  ✅ 90%+ field-level accuracy (Date, Amount, Type)
  ✅ Works on 80%+ of test PDFs
  ✅ Edge cases have workarounds
  ✅ Processing time <10 seconds per PDF
  
  → ACTION: Start MVP build Week 2

YELLOW LIGHT (Adjust Strategy):
  ⚠️ 70-85% accuracy
  ⚠️ Some PDFs fail completely
  ⚠️ Edge cases are common (>20% of PDFs)
  
  → ACTION: Add human-in-loop review layer
  → Cost: Hire VA (KES 20k/month) to review low-confidence parses
  → Still proceed, but adjust pricing (KES 699/mo for "Verified" tier)

RED LIGHT (Pivot Required):
  ❌ <70% accuracy
  ❌ Majority of PDFs fail
  ❌ No viable workarounds for edge cases
  
  → ACTION: Pivot to Daraja API strategy
  → Target: Formal businesses with Paybill/Till (smaller TAM)
  → OR: Partner with M-Pesa directly (long-term play)
  → OR: Stop M-Recon, explore other ideas
```

---

## 📊 DELIVERABLES

### **End of Week 1:**

1. **Technical Report (`PDF_POC_RESULTS.md`):**
   ```markdown
   # M-Pesa PDF Parsing PoC Results
   
   ## Test Summary
   - PDFs tested: 50
   - Successful: 42 (84%)
   - Average accuracy: 87%
   
   ## Key Findings
   - pdfplumber works well for post-2023 formats
   - Password protection NOT an issue
   - Scanned PDFs fail (10% of samples)
   
   ## Recommendation: GREEN LIGHT
   - Proceed with MVP
   - Add "text-based PDF" check
   - Fallback: Manual review for <80% confidence
   ```

2. **Code Repository:**
   - `parse_test.py` (working script)
   - `pdfs_redacted/` (50 test PDFs)
   - `results/` (Excel outputs for each PDF)

3. **Excel Accuracy Tracker:**
   - PDF name | Manual count | Parsed count | Accuracy | Notes
   - Average accuracy calculation
   - Edge case summary

4. **Decision Document:**
   - GO/NO-GO recommendation
   - Risk assessment
   - Mitigation strategies

---

## 🚨 FAILURE SCENARIOS (What if <70% accuracy?)

### **Scenario 1: PDF Format Too Complex**

```yaml
Problem: M-Pesa PDFs have inconsistent formats
Solution Options:
  A) Partner with Safaricom for API access (long-term)
  B) Pivot to Daraja API (formal businesses only)
  C) Build OCR layer (image-to-text) - expensive
  
Recommendation: Option B (Daraja API pivot)
```

### **Scenario 2: Password Protection Blocks Parsing**

```yaml
Problem: pdfplumber can't open password-protected PDFs
Solution Options:
  A) Ask users to unlock PDFs (bad UX)
  B) Ask for ID number + auto-unlock (privacy risk)
  C) Partner with Safaricom to get unlocked versions
  
Recommendation: Option A (simplest, but educate users)
```

### **Scenario 3: 50%+ of PDFs are Scanned (Image-based)**

```yaml
Problem: Scanned PDFs require OCR (Optical Character Recognition)
Solution Options:
  A) Add OCR layer (Tesseract, Google Vision API) - $$$
  B) Reject scanned PDFs (limit TAM)
  C) Manual transcription service (KES 500/PDF)
  
Recommendation: Option B + educate users to request text PDFs
```

---

## 💡 SUCCESS TIPS

### **For Grace's Data Collection:**

```
Message Template (WhatsApp to Grace):

"Hi Grace! 🚀

For M-Recon, I need to test PDF parsing. Can you help?

NEED: 10-20 M-Pesa statement PDFs (from your SME contacts)
PRIVACY: I'll black out names, phone numbers, IDs (only keep transaction data)
INCENTIVE: KES 200 M-Pesa tip per PDF shared

Can you ask:
- Your cousin (Duka owner)
- Mama Mboga contacts
- Salon owners
- Your own statement?

DM me PDFs via WhatsApp (or Google Drive link).

Asante sana! 🙏"
```

### **For Manual Verification (Speed Hack):**

```yaml
Instead of counting ALL transactions:
  1. Count transactions on PAGE 1 only (e.g., 20 transactions)
  2. Compare to parsed Excel (Page 1 section)
  3. Calculate accuracy for Page 1
  4. Spot-check 2-3 other pages
  5. Assume Page 1 accuracy = overall accuracy (saves time!)
```

### **For Edge Case Detection:**

```yaml
Run this check FIRST (before manual verification):
  - Does PDF open? (password test)
  - Is it text-based or scanned? (OCR test)
  - How many pages? (multi-page test)
  - What date range? (format version test)
  
→ Categorize PDFs by edge case TYPE
→ Test 2-3 from each category (not all 50!)
```

---

## 📅 TIMELINE (Week 1)

```yaml
Monday (Day 1):
  ☐ Ask Grace for PDFs
  ☐ Download your own M-Pesa statement
  ☐ Setup Python environment
  ☐ Run baseline test on 1-2 PDFs
  Time: 3-4 hours

Tuesday (Day 2):
  ☐ Collect 20+ PDFs from Grace
  ☐ Run batch parsing (parse_test.py)
  ☐ Manual verification (5 representative PDFs)
  Time: 4-6 hours

Wednesday (Day 3):
  ☐ Edge case testing (password, scanned, multi-page)
  ☐ Calculate overall accuracy
  ☐ Document findings (PDF_POC_RESULTS.md)
  Time: 3-4 hours

Thursday (Day 4):
  ☐ GO/NO-GO decision
  ☐ If GREEN: Plan MVP build
  ☐ If YELLOW: Design human-review layer
  ☐ If RED: Explore Daraja API pivot
  Time: 2-3 hours
```

---

## 🎯 SUCCESS = 85%+ ACCURACY

**Remember: You're NOT building a perfect parser!**

- 85% accuracy = 170/200 transactions correct
- That's GOOD ENOUGH for MVP (with human review fallback)
- Users will accept 15% error rate IF it saves them 20 hours/month

**Perfection is the enemy of done. Ship at 85%, improve to 95% later!** 🚀

---

**Last Updated:** 12.11.2025 by Mo Sieger + Copilot  
**Next Review:** After PoC completion (GO/NO-GO decision)
