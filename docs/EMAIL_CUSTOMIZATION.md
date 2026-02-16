# ✉️ Email Customization Strategy

**Date:** February 16, 2026
**Philosophy:** Give users control, maintain quality, balance automation with personalization

---

## 🎯 Core Question

**Should users be able to customize emails before sending?**

**Answer:** **YES** - with smart defaults and guided editing.

**Why:**
1. **Trust & Control** - Users want to see and approve what's being sent
2. **Personalization** - They know details AI doesn't (inside jokes, specific questions)
3. **Transparency** - Aligns with our Unix philosophy (no black boxes)
4. **Quality Assurance** - Catch AI mistakes before they go to vendors
5. **Relationship Building** - Personal touch improves response rates

---

## 📝 Customization Levels

### **Level 1: Review & Approve (MVP - Current)**
**What it is:** Users see AI-generated emails, can approve or regenerate

**UX Flow:**
1. User selects 8 vendors
2. AI generates 8 personalized emails
3. Preview page shows all emails
4. User clicks "Send All" to approve

**Pros:**
- ✅ Fast (no editing required)
- ✅ AI does heavy lifting
- ✅ Transparency (see before send)

**Cons:**
- ❌ No customization
- ❌ All-or-nothing (can't tweak one email)
- ❌ Can't add personal touches

**Status:** ✅ Already implemented

---

### **Level 2: Edit Before Send (Recommended Next)**
**What it is:** Users can edit any email before sending

**UX Flow:**
1. User selects 8 vendors
2. AI generates 8 personalized emails
3. Preview page shows all emails with **"Edit" button** on each
4. Click "Edit" → Opens inline text editor
5. User makes changes (add questions, adjust tone, fix mistakes)
6. Click "Save" → Changes preserved
7. Click "Send All" → Sends customized emails

**Interface:**

```tsx
// /app/outreach/preview/page.tsx

<div className="space-y-6">
  {emails.map((email, index) => (
    <div key={index} className="border rounded-xl p-6 bg-white">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium">{email.vendorName}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setEditingId(email.id)}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => removeEmail(email.id)}
            className="px-4 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg"
          >
            Remove
          </button>
        </div>
      </div>

      {editingId === email.id ? (
        // Edit mode
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subject</label>
            <input
              type="text"
              value={email.subject}
              onChange={(e) => updateEmail(email.id, 'subject', e.target.value)}
              className="w-full px-4 py-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Message</label>
            <textarea
              value={email.body}
              onChange={(e) => updateEmail(email.id, 'body', e.target.value)}
              rows={12}
              className="w-full px-4 py-2 border rounded-lg font-mono text-sm"
            />
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setEditingId(null)}
              className="px-4 py-2 bg-rose-500 text-white rounded-lg"
            >
              Save Changes
            </button>
            <button
              onClick={() => resetEmail(email.id)}
              className="px-4 py-2 border rounded-lg"
            >
              Reset to Original
            </button>
          </div>
        </div>
      ) : (
        // Preview mode
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="mb-2 text-sm text-gray-600">
            <strong>Subject:</strong> {email.subject}
          </div>
          <div className="whitespace-pre-wrap text-sm">
            {email.body}
          </div>
        </div>
      )}
    </div>
  ))}

  <button
    onClick={handleSendAll}
    className="w-full py-4 bg-gradient-to-r from-rose-500 to-purple-500 text-white rounded-xl text-lg font-medium"
  >
    Send All ({emails.length} emails)
  </button>
</div>
```

**Implementation:**
- Simple inline text editor (textarea)
- Edit subject + body
- Save changes to state
- Send modified version

**Effort:** 1 day

---

### **Level 3: Template Customization (Future)**
**What it is:** Users can customize the AI prompt template itself

**Use case:** "I always want to ask about vegan menu options"

**UX Flow:**
1. Settings page: "Email Preferences"
2. User adds custom questions:
   - "Do you offer vegan/gluten-free menu options?"
   - "Can we bring our own alcohol?"
   - "Is there wheelchair access?"
3. AI includes these questions in all emails automatically

**Implementation:**
```prisma
model EmailPreferences {
  id                String   @id @default(cuid())
  userId            String   @unique
  user              User     @relation(fields: [userId], references: [id])

  // Custom questions to always include
  customQuestions   String[] // ["Do you offer vegan options?", "Can we see the venue on Sundays?"]

  // Tone preference
  tonePreference    EmailTone @default(PROFESSIONAL) // CASUAL, PROFESSIONAL, FORMAL

  // Signature
  customSignature   String? // "Looking forward to hearing from you!\nSarah & James"

  createdAt         DateTime @default(now())
  updatedAt         DateTime @updatedAt
}

enum EmailTone {
  CASUAL        // "Hey! We're planning our wedding..."
  PROFESSIONAL  // "Dear [Vendor], We are planning our wedding..."
  FORMAL        // "To Whom It May Concern, We wish to inquire..."
}
```

**Prompt template:**
```typescript
const emailPrompt = `
Generate a ${preferences.tonePreference} email to ${vendor.name}...

Include these custom questions:
${preferences.customQuestions.join('\n')}

End with:
${preferences.customSignature || 'Best regards,\n' + user.name}
`
```

**Effort:** 2-3 days

---

## 🎨 UI/UX Considerations

### **Design Principles:**

**1. Default to AI, allow refinement**
- AI does 80% of work
- User adds 20% personal touch
- Not a blank slate (overwhelming)

**2. Visible changes**
- Show "Edited" badge on customized emails
- Yellow highlight for changed text (optional)
- "View original" to compare

**3. Easy reset**
- "Reset to AI version" button
- Undo changes if user doesn't like their edit

**4. Quick actions**
- "Add a question" button → Appends to email body
- "Change tone" → Casual ↔ Professional ↔ Formal
- "Shorten" → AI condenses email

**5. Validation**
- Warn if email is too short (<100 chars)
- Warn if key details missing (date, guest count)
- Suggest improvements

---

## 📋 Common Customization Scenarios

### **Scenario 1: Add specific question**
**User wants to ask:** "Do you offer a rain backup plan?"

**Flow:**
1. Click "Edit" on venue email
2. Scroll to questions section
3. Add new bullet point: "5. What's your rain backup plan?"
4. Save

**Alternative (quick action):**
- Click "Add Question" button
- Type: "rain backup plan"
- AI inserts properly formatted question

---

### **Scenario 2: Fix AI mistake**
**AI incorrectly assumed:** "outdoor ceremony"

**Flow:**
1. User notices error in preview
2. Click "Edit"
3. Change "outdoor ceremony" → "indoor ceremony"
4. Save

---

### **Scenario 3: Personal touch**
**User wants to add:** "We've heard great things about you from our friend Emma!"

**Flow:**
1. Click "Edit"
2. Add line after introduction
3. Save

**Result:**
```
Hi [Vendor],

My name is Sarah and I'm planning my wedding for June 14, 2027.
We've heard great things about you from our friend Emma!

...
```

---

### **Scenario 4: Different tone for different vendors**
**Casual caterer, formal venue**

**Flow:**
1. Edit caterer email → Use casual tone ("Hey! We're so excited...")
2. Edit venue email → Keep professional tone ("Dear [Name], We are planning...")

---

## 🛠️ Implementation Plan

### **Phase 1: Basic Editing (Week 1)**

**Files to create/modify:**

1. **Update preview page state management:**
```typescript
// app/outreach/preview/page.tsx
const [emails, setEmails] = useState<Email[]>([])
const [editingId, setEditingId] = useState<string | null>(null)

const updateEmail = (id: string, field: string, value: string) => {
  setEmails(emails.map(email =>
    email.id === id ? { ...email, [field]: value, edited: true } : email
  ))
}

const resetEmail = (id: string) => {
  // Re-fetch original from API or keep originalEmails copy
  setEmails(emails.map(email =>
    email.id === id ? originalEmails.find(e => e.id === id)! : email
  ))
}

const removeEmail = (id: string) => {
  setEmails(emails.filter(email => email.id !== id))
}
```

2. **Add edit UI components:**
- Edit button for each email
- Inline textarea editor
- Save/Cancel buttons
- Reset to original button
- Remove vendor button

3. **Persist edited emails:**
- Store in component state
- Send edited version to `/api/outreach/send-batch`

**Testing:**
- Edit subject line → Verify sends edited version
- Edit body → Verify formatting preserved
- Reset email → Verify original restored
- Remove vendor → Verify not sent

---

### **Phase 2: Quick Actions (Week 2)**

**Add convenience features:**

1. **"Add Question" button:**
```typescript
const addQuestion = (emailId: string, question: string) => {
  const email = emails.find(e => e.id === emailId)
  const updatedBody = email.body + `\n${questionsSection.length + 1}. ${question}`
  updateEmail(emailId, 'body', updatedBody)
}
```

2. **Tone switcher:**
```typescript
const changeTone = async (emailId: string, newTone: 'casual' | 'professional' | 'formal') => {
  const email = emails.find(e => e.id === emailId)

  // Call AI to rewrite in new tone
  const response = await fetch('/api/outreach/rewrite-tone', {
    method: 'POST',
    body: JSON.stringify({
      originalEmail: email.body,
      tone: newTone
    })
  })

  const { rewrittenEmail } = await response.json()
  updateEmail(emailId, 'body', rewrittenEmail)
}
```

3. **Smart suggestions:**
- "This email is quite long - would you like to shorten it?"
- "You haven't mentioned dietary restrictions - add a question?"

---

### **Phase 3: Templates & Preferences (Month 2)**

1. **Create settings page** (`/settings/email`)
2. **Add EmailPreferences model** to Prisma schema
3. **Update AI prompt** to use preferences
4. **Test across all vendor categories**

---

## 📊 Success Metrics

**User Customization Behavior:**
- % of users who edit at least one email (target: 60-80%)
- Average edits per send (target: 2-3 emails edited per batch)
- Most common edits (questions, tone, personal touches)

**Quality Metrics:**
- Vendor response rate (edited vs non-edited emails)
- User satisfaction with email control
- Time spent in preview/edit flow (should be <5 min)

**A/B Test (Future):**
- Control: AI-only emails (no editing)
- Treatment: Editable emails
- Measure: Response rates, user satisfaction

---

## 🎯 Recommended Priority

**Do this NEXT (after dark mode):**
1. ✅ Basic editing (1 day) - High value, simple implementation
2. ⏳ Quick actions (1 day) - Nice-to-have enhancements
3. ⏳ Templates & preferences (later) - Power user feature

**Why prioritize:**
- Users WANT control (transparency = trust)
- Prevents "AI sent something embarrassing" anxiety
- Improves response rates (personal touch)
- Competitive advantage (most tools don't allow editing)

---

## 💡 Pro Tips

**Tip 1:** Default to showing preview mode, not edit mode (less overwhelming)

**Tip 2:** Highlight what AI included automatically (transparency)

**Tip 3:** Save draft edits even if user doesn't send (can come back later)

**Tip 4:** Show character count to prevent overly long emails

**Tip 5:** Offer "Copy to all venues" button if user writes a great question

---

**Next:** Implement basic editing on preview page (1 day effort, high impact)
