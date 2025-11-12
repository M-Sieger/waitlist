# Testing Guide – Option C Survey (13 Questions)

**URL:** https://m-recon.com/validation-survey  
**Expected Behavior:** Conditional questions appear/disappear based on answers

---

## 🧪 Test Scenarios

### **TEST 1: Short Path (11 Questions) – No Loan Applied**

**Steps:**
1. Open /validation-survey
2. Answer Q1-Q3 (Business Type, SACCO Member, M-Pesa Usage)
3. **Q4:** "Have you ever applied for any type of loan?" → Select **"No"**
4. **Expected:** Survey jumps to Q7 (Record Keeping) - Q5 and Q6 should NOT appear
5. Continue Q7-Q14 (11 questions total)
6. Submit with phone number

**Result:**
- ✅ Progress bar shows 11 questions total
- ✅ Q5 (loan outcome) never appears
- ✅ Q6 (rejection reason) never appears
- ✅ Completion time: 4-5 min

---

### **TEST 2: Medium Path (12 Questions) – Loan Approved**

**Steps:**
1. Open /validation-survey
2. Answer Q1-Q3
3. **Q4:** "Have you ever applied for any type of loan?" → Select **"Yes"**
4. **Expected:** Q5 appears
5. **Q5:** "What was the outcome?" → Select **"Approved"** or **"Still waiting"**
6. **Expected:** Survey jumps to Q7 (Record Keeping) - Q6 should NOT appear
7. Continue Q7-Q14 (12 questions total)
8. Submit

**Result:**
- ✅ Q5 appears after Q4="Yes"
- ✅ Q6 (rejection reason) does NOT appear
- ✅ 12 questions total
- ✅ Completion time: 5-6 min

---

### **TEST 3: Full Path (13 Questions) – Loan Rejected**

**Steps:**
1. Open /validation-survey
2. Answer Q1-Q3
3. **Q4:** "Have you ever applied for any type of loan?" → Select **"Yes"**
4. **Expected:** Q5 appears
5. **Q5:** "What was the outcome?" → Select **"Rejected"**
6. **Expected:** Q6 appears
7. **Q6:** "What reason were you given?" → Select any option
8. Continue Q7-Q14 (13 questions total)
9. Submit

**Result:**
- ✅ Q5 appears after Q4="Yes"
- ✅ Q6 appears after Q5="Rejected"
- ✅ 13 questions total (maximum)
- ✅ Completion time: 6-7 min

---

## 🔍 Detailed Checks

### **Q4 Wording Check:**
**Expected Text:**
> "4. Have you ever applied for any type of loan? (Business, Personal, SACCO, Chama, etc.)"

**Options:**
- [ ] "Yes"
- [ ] "No"

**NO "Skip This" or "N/A" options** ✅

---

### **Q5 (Conditional on Q4="Yes"):**
**Expected Text:**
> "5. What was the outcome of your loan application?"

**Options:**
- [ ] "Approved"
- [ ] "Rejected"
- [ ] "Still waiting"

**NO "Never applied" or "Skip this" options** ✅

---

### **Q6 (Conditional on Q5="Rejected"):**
**Expected Text:**
> "6. What reason were you given for rejection?"

**Options:**
- [ ] "Insufficient financial records"
- [ ] "No bank account"
- [ ] "No collateral"
- [ ] "Credit history issues"
- [ ] "Other/Don't know"

**NO "Not applicable" option** ✅

---

## 📱 Mobile Testing

**Test on:**
- [ ] iPhone Safari (320px - 375px width)
- [ ] Android Chrome (360px - 412px width)
- [ ] Chrome DevTools Mobile View

**Check:**
- [ ] Radio buttons are tappable (44px min touch target)
- [ ] Text is readable without zoom (16px base font)
- [ ] Progress bar updates correctly
- [ ] "Next" button is always visible (not hidden by keyboard)
- [ ] Success screen shows phone number correctly

---

## 🗄️ Supabase Data Check

After submitting TEST 1, TEST 2, TEST 3, check Supabase table:

**Expected Rows:**

| phone_number | loan_applied | loan_outcome | rejection_reason | Question Count |
|--------------|--------------|--------------|------------------|----------------|
| 0712345678   | No           | NULL         | NULL             | 11             |
| 0723456789   | Yes          | Approved     | NULL             | 12             |
| 0734567890   | Yes          | Rejected     | Insufficient financial records | 13 |

**Check:**
- [ ] `loan_outcome` is NULL when `loan_applied = "No"`
- [ ] `rejection_reason` is NULL when `loan_outcome != "Rejected"`
- [ ] All other fields populated correctly
- [ ] `submitted_at` timestamp is correct
- [ ] `payment_sent = FALSE` (default)

---

## ⚠️ Known Issues to Watch For

### **Issue 1: Question Numbering**
- **Problem:** If Q5/Q6 are hidden, does Q7 still show "7." or does it renumber to "5."?
- **Current:** Questions are hardcoded with numbers (e.g., "7. How do you...")
- **Expected:** Numbers stay consistent (Q7 is always Q7, even if Q5/Q6 hidden)
- **Fix if Needed:** Questions array already has hardcoded numbers, should be fine

### **Issue 2: Progress Bar**
- **Problem:** Progress bar shows `/16` instead of actual question count
- **Check:** Does progress bar say "Question 1 of 11" (TEST 1) or "Question 1 of 16"?
- **Expected:** Progress bar should adjust to visible question count
- **Implementation:** `{questions.length}` updates dynamically ✅

### **Issue 3: Back Button**
- **Problem:** If user clicks "Previous" from Q7 (after skipping Q5/Q6), does it crash?
- **Expected:** User should go back to Q4 (last visible question)
- **Test:** Answer Q4="No" → Next → Q7 appears → Click "Previous" → Should show Q4

---

## 📊 Success Criteria

✅ **All 3 test paths work** (11, 12, 13 questions)  
✅ **No "Skip This" options** visible in Q5/Q6  
✅ **Q4 wording** includes "(Business, Personal, SACCO, Chama, etc.)"  
✅ **Progress bar** shows correct question count (not hardcoded 16)  
✅ **Supabase data** matches expected NULL values  
✅ **Mobile responsive** (readable, tappable, no layout breaks)  
✅ **Completion time** 5-7 min average (down from 8+ min)

---

**Next Step After Testing:** Share link with Grace for 10-20 handpicked contacts 🚀
