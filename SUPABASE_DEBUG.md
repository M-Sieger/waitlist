# DeepResearch Prompt: Supabase `fetch failed` in Next.js 16 (Vercel)

## Context

**Tech Stack:**
- Framework: Next.js 16.0.1 (App Router) + TypeScript 5.9.3
- Deployment: Vercel (Production URL: `waitlist-nine-hazel.vercel.app`)
- Database: Supabase (Postgres + REST API)
- Package Manager: pnpm 10.13.1
- Runtime: Node.js (forced via `export const runtime = 'nodejs'`)

**API Route Implementation:**
```typescript
// app/api/waitlist/route.ts
export const runtime = 'nodejs'; // Force Node.js runtime

import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.json();
  
  const { data, error } = await supabase
    .from('waitlist_signups')
    .insert([{
      email: body.email,
      phone: body.phone,
      business_type: body.businessType,
      // ...
    }])
    .select()
    .single();
    
  if (error) {
    console.error('Supabase error:', error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
  
  return NextResponse.json({ message: 'Success!', data }, { status: 201 });
}
```

**Environment Variables:**
```bash
# Both in .env.local AND Vercel Environment Variables
NEXT_PUBLIC_SUPABASE_URL=https://jakqhnvgbjtrjjirqlqa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Impha3FobnZnYmp0cmpqaXJxbHFhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNTc1NDIsImV4cCI6MjA3NzkzMzU0Mn0.pSjoDsZGo61Ubswh75SMVL_qdbP_rz_1JZr2CopZf4Y
```

**Supabase Table:**
```sql
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

-- RLS Policies
ALTER TABLE waitlist_signups ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public insert" ON waitlist_signups
  FOR INSERT TO anon
  WITH CHECK (true);

CREATE POLICY "Allow authenticated read" ON waitlist_signups
  FOR SELECT TO authenticated
  USING (true);
```

---

## Error Details

### Production Error (Vercel Runtime Logs)
```
POST /api/waitlist - 500 Internal Server Error

Supabase URL: https://jakqhnvgbjtrjjirqlqa.supabase.co
Supabase error: {
  message: 'TypeError: fetch failed',
  details: 'TypeError: fetch failed\n' +
    '    at node:internal/deps/undici/undici:13510:13\n' +
    '    at process.processTicksAndRejections (node:internal/process/task_queues:105:5)\n' +
    '    at async pq (/var/task/.next/server/chunks/[root-of-the-server]__e5861746._.js:95:143287)\n' +
    '    at async r$.do (/var/task/node_modules/.pnpm/next@16.0.1_react-dom@19.2.0_react@19.2.0__react@19.2.0/node_modules/next/dist/compiled/next-server/app-route-turbo.runtime.prod.js:23:20293)\n',
  hint: '',
  code: ''
}
Waitlist API error: { message: 'TypeError: fetch failed', ... }
```

### Local Reproduction (Node.js REPL)
```bash
$ node -e "const { createClient } = require('@supabase/supabase-js'); const supabase = createClient('https://jakqhnvgbjtrjjirqlqa.supabase.co','eyJhbGci...'); supabase.from('waitlist_signups').select('*').then(r=>{console.log(r)});"

{
  error: {
    message: 'TypeError: fetch failed',
    details: 'TypeError: fetch failed\n' +
      '    at node:internal/deps/undici/undici:13510:13\n' +
      '    at process.processTicksAndRejections (node:internal/process/task_queues:95:5)',
    hint: '',
    code: ''
  },
  data: null,
  count: null,
  status: 0,
  statusText: ''
}
```

### DNS & HTTP Tests
```bash
# Test 1: curl base URL
$ curl -I https://jakqhnvgbjtrjjirqlqa.supabase.co
HTTP/2 404
date: Fri, 07 Nov 2025 23:30:18 GMT
content-type: application/json
server: cloudflare
cf-ray: 99b09e20bc80fa24-FRA

# Test 2: Old typo URL (before fix)
$ curl -I https://jakqhnvgbjtjrjirqlqa.supabase.co
curl: (6) Could not resolve host: jakqhnvgbjtjrjirqlqa.supabase.co

# Test 3: REST endpoint
$ curl https://jakqhnvgbjtrjjirqlqa.supabase.co/rest/v1/waitlist_signups
{"message":"Not Found"}
```

**Observations:**
- Host **resolves** (DNS works, Cloudflare responds)
- Base URL returns `404` (not unreachable)
- REST endpoint `/rest/v1/waitlist_signups` returns `{"message":"Not Found"}`
- Same error occurs both locally (Node.js 20+) and on Vercel production

---

## What We've Tried

1. ✅ **Changed JSX config** (`tsconfig.json`: `"jsx": "preserve"`)
2. ✅ **Removed explicit JSX.Element types** (to fix build errors)
3. ✅ **Forced Node.js runtime** (`export const runtime = 'nodejs'` in API route)
4. ✅ **Fixed Supabase URL typo** (`jakqhnvgbjtjrjirqlqa` → `jakqhnvgbjtrjjirqlqa`)
5. ✅ **Verified ENV variables in Vercel** (all 3 set: URL, ANON_KEY, RESEND_API_KEY)
6. ✅ **Multiple redeployments** (auto + manual, latest commit `85caae5`)
7. ✅ **Confirmed Supabase table exists** (schema executed, no SQL errors)
8. ❌ **Still getting `TypeError: fetch failed`**

---

## Research Questions

### 1. Is the Supabase project active?
- Project reference: `jakqhnvgbjtrjjirqlqa`
- Does this project ID correspond to an **active/running** Supabase project?
- Could the project be **paused**, **deleted**, or **archived**?
- How to verify project status via Supabase Dashboard or CLI?

### 2. Why does REST endpoint return 404?
- Expected endpoint: `https://<ref>.supabase.co/rest/v1/<table>`
- Actual response: `{"message":"Not Found"}`
- Is REST API disabled in project settings?
- Are there **service role requirements** or **authentication issues**?

### 3. Row Level Security (RLS) blocking access?
- Policy allows `INSERT TO anon WITH CHECK (true)`
- Does `anon` key need additional permissions?
- Should we use **service_role** key instead for server-side?
- Are there hidden RLS policies blocking `@supabase/supabase-js` client?

### 4. Network/DNS issues?
- Cloudflare responds with 404, not connection refused
- Could there be a **firewall/geo-blocking** issue?
- Vercel region (Washington DC - iad1) vs Supabase region mismatch?
- Does `fetch` in Node.js need polyfill or custom agent?

### 5. Supabase client configuration?
- Using `@supabase/supabase-js` v2.79.0
- Are there required **client options** missing?
  ```ts
  createClient(url, key, {
    auth: { persistSession: false },
    db: { schema: 'public' },
    global: { headers: { ... } }
  })
  ```
- Does Next.js 16 Edge/Node runtime require special setup?

### 6. Is ANON_KEY valid?
- JWT decodes to:
  ```json
  {
    "iss": "supabase",
    "ref": "jakqhnvgbjtrjjirqlqa",
    "role": "anon",
    "iat": 1762357542,
    "exp": 2077933542
  }
  ```
- Ref matches URL, role is `anon`, not expired
- But does key actually have **permissions** for this project?

### 7. Alternative debugging approaches?
- How to test Supabase connectivity outside Next.js?
- Can we use `curl` with proper headers to replicate client behavior?
- What do Supabase logs show (if accessible)?
- Should we create a **minimal reproduction** with vanilla Node.js?

---

## Goal

**Find root cause and concrete fix for:**
```
supabase.from('waitlist_signups').insert([...])
  → TypeError: fetch failed
```

**Success criteria:**
- API route successfully inserts data into Supabase
- Returns `{ message: 'Success!', data: {...} }` with 201 status
- No `fetch failed` errors in Vercel logs

---

## Additional Context

- **Vercel deployment**: Auto-deploy on Git push works (latest `85caae5`)
- **Domain setup**: `m-recon.com` pending (Namecheap DNS not configured yet)
- **Email service**: Resend configured but untested (blocked by Supabase issue)
- **Timeline**: Critical - project deadline approaching

**Next steps depend on research findings.**
