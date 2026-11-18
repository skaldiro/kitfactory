> Original PRD v1.0. The uploaded copy ends mid-sentence in the S06 section; the rest of the PRD (S07 to S13) is superseded by the design canvas and `design/screens.md`, and will be replaced by `spec-v2.md` in week 2.

# Family Packing AI — Detailed UX & Engineering PRD

**Version:** 1.0  
**Status:** Ready for design and implementation planning  
**Platform:** Responsive mobile-first web application / PWA  
**Visual direction:** Warm Family Minimalism  
**Primary audience:** Parents traveling with children  
**Core use case:** Create, personalize, manage and collaboratively complete family packing lists using AI.

---

# 1. Scope and product decisions

## P0 capabilities

1. Natural-language trip creation and AI clarification
2. Family profiles with reusable preferences
3. Personalized packing list generation
4. AI-powered conversational list modification
5. Structured packing checklist with traveler and bag views
6. Shared household packing and collaboration
7. Trip reuse and persistent family memory

## Decisions we are locking in

- Start with a mobile-first web app, not native mobile.
- Generate a useful list before requiring signup.
- Use text-based AI interaction for v1; no voice input.
- Make the packing checklist the primary screen after trip creation.
- Keep AI accessible through a floating or sticky action.
- Offer one shared family workspace with up to two collaborating adult accounts initially.
- Allow multiple child profiles without separate logins.
- Use explicit packing quantities and separate packed states.
- Treat shared family items as independent items, not duplicates across travelers.
- Save preferences between trips, but require confirmation before adding inferred permanent preferences.
- Use a curated catalog and deterministic rules alongside AI.
- Keep monetization outside the initial private beta.

## Not in this MVP

Jet lag, itinerary planning, reservations, flight imports, live weather APIs, passport storage, price comparison, shopping integrations, voice interaction, photo recognition, native mobile applications or complex offline synchronization.

---

# 2. Information architecture

## Main screens and routes

| ID | Route / component | Screen |
|---|---|---|
| S01 | `/` | Home / Trips |
| S02 | `/trips/new` | Conversational trip creation |
| S03 | Trip creation step | AI clarification |
| S04 | Trip creation step | Trip review and generation |
| S05 | `/trips/[id]` | Trip overview / first-list reveal |
| S06 | `/trips/[id]/packing` | Main packing checklist |
| S07 | Item detail sheet | Manual packing item editor |
| S08 | AI assistant sheet | Conversational editing and change preview |
| S09 | `/family` | Family profiles and preferences |
| S10 | Bag management sheet | Bags and luggage setup |
| S11 | Household sharing sheet | Invite and collaboration |
| S12 | Existing trip action | Repeat trip / new trip with memory |
| S13 | Authentication sheet | Save, sign in, and join household |

S03, S04, S07, S08, S10, S11 and S13 do not require separate routes. They can be components or steps within existing screens.

## Navigation rules

**Home:** Shows upcoming trips and lets users start a new one.

**Trip:** Opens directly into the packing workspace for a saved trip, with an optional overview summary.

**Family:** Accessed from the home screen and account menu.

**AI:** Contextual assistant opened within the trip, not a permanent global chat tab.

Avoid a large bottom navigation bar with destinations that don't provide meaningful value.

---

# 3. Screen-by-screen specifications

## S01 — Home / Trip Library

### Purpose

Immediately help new users create their first list and returning users continue preparing for an upcoming trip.

### First-time experience

**Headline:** "Packing for the whole family, minus the thinking."

**Supporting text:** "Tell us where you're going and who's coming. We'll make your packing lists together."

**Primary action:** "Plan a trip"

Below the primary action, show an example trip description so users understand how much detail to provide.

Avoid a mandatory product tour or long carousel.

### Returning-user experience

Show:

- Greeting: "Where to next?"
- Prominent "New trip" action
- Upcoming trips ordered by departure date
- Each trip's destination, dates, participant count and packing progress
- Past trips under a separate section
- Access to family profiles

Trip card actions:

- Open packing list
- Duplicate trip
- Edit trip
- Archive trip

### States

- No trips: first-trip creation experience
- One or more trips: trip cards
- Empty past-trips section: hide the section
- Loading: skeleton cards
- Error: retry loading without losing local state

### Acceptance criteria

- New users can begin creating a trip in one tap.
- Existing users can reopen a trip in one tap.
- Archived trips are excluded from the default upcoming view.
- A trip's displayed progress matches the checklist.

---

## S02 — Conversational Trip Creation

### Purpose

Turn an informal travel description into structured trip information.

### Primary interface

**Header:** "Tell me about your trip"

**Subheader:** "A sentence or two is enough."

A large multiline input with placeholder:

"We're going to Italy for 10 days with our 3-year-old and 6-year-old. Mostly sightseeing, with laundry halfway through."

**Primary CTA:** "Continue"

Show optional example prompts for beach trips, winter vacations and weekend visits.

### Input behavior

- User can type naturally.
- No rigid form is required.
- Minimum meaningful entry: destination or travel context plus one other relevant detail.
- Maximum input length: 2,000 characters.
- Allow editing of the original text.
- Disable duplicate submissions while parsing.
- Persist draft locally during unauthenticated onboarding.

### AI parsing

Extract:

- Destination
- Duration or trip dates
- Adults traveling
- Children traveling and ages
- Activities
- Expected climate
- Laundry access or frequency
- Packing preference
- Travel mode
- Luggage configuration

Do not infer exact dates, confirmed weather, or the number of adults from vague language.

### Output

Structured trip draft and a set of missing fields.

### Failure handling

On extraction failure:

- Retain the original description.
- Provide "Try again."
- Offer a structured manual entry fallback.

### Acceptance criteria

- The AI correctly extracts explicitly provided trip facts.
- Unknown values remain unknown.
- Users can recover without rewriting the description.
- The first experience works before signup.

---

## S03 — AI Clarification

### Purpose

Get the minimum additional context needed to generate a useful list.

### Interaction pattern

Ask one question at a time.

Prefer selectable answers over free text when suitable.

Example:

**AI:** "Who is coming on this trip?"

Options:
- 1 adult
- 2 adults
- Other / customize

Next:

**AI:** "Will you have access to laundry?"

Options:
- Yes
- No
- Not sure

Next, only if relevant:

**AI:** "What kind of weather should we plan for?"

Options:
- Warm
- Mild
- Cold
- Mixed / uncertain

### Requirements

- Maximum three clarification rounds by default.
- Group related missing details in one interaction where appropriate.
- Support "Skip" for nonessential questions.
- Allow users to go back and edit answers.
- Do not repeatedly ask for information already supplied.
- Clearly indicate any assumptions used when users skip.

### State transition

When all essential fields are available, proceed to trip review.

If users skip everything optional, generate a reasonable baseline list with assumptions recorded.

### Acceptance criteria

- No redundant questions.
- Every answer updates the structured draft.
- Questions are determined by missing information, not a fixed script.
- Users can proceed without knowing their exact travel dates.

---

## S04 — Trip Review & Generate

### Purpose

Confirm the facts before generating the list.

### Screen content

**Headline:** "Here's the trip I'm packing for"

Display editable summary cards:

**Trip**
- Destination
- Duration
- Dates, if supplied
- Activities
- Climate

**Travelers**
- Adult 1
- Adult 2
- Child, age 3
- Child, age 6

**Packing preferences**
- Laundry
- Packing style
- Travel mode
- Luggage arrangement, if supplied

**Primary action:** "Create our packing list"

### Generation behavior

After confirmation:

1. Validate structured trip input.
2. Load catalog items and available family preferences.
3. Calculate baseline packing quantities.
4. Call AI for context-specific additions and adjustments.
5. Validate and normalize suggested items.
6. Deduplicate shared items.
7. Produce a complete structured checklist.

### Loading experience

Display a short progress state such as:

"Planning for everyone..."

"Checking children's essentials..."

"Organizing your lists..."

These messages indicate general progress, not verified individual model steps.

### Error handling

If AI fails, preserve the draft and offer:

- Retry generation
- Generate a basic checklist from curated templates

### Acceptance criteria

- The generated list includes all travelers.
- Shared supplies are not repeated unnecessarily.
- Quantity suggestions respond to known trip attributes.
- The user never loses their input on failure.

---

## S05 — First-List Reveal / Trip Overview

### Purpose

Deliver immediate value without making users study an extensive dashboard.

### Initial state

**Headline:** "Your family packing list is ready!"

Display:

- Destination and duration
- Number of travelers
- Total checklist items
- Personal lists available
- Shared family essentials
- Optional suggestions

### Main action

**"Start packing"**

Secondary actions:

- "Make changes with AI"
- "Add family details"

### Preview

Show an abbreviated list:

- Adult 1: clothing and essentials
- Adult 2: clothing and essentials
- Child 1: age-specific items
- Child 2: age-specific items
- Shared: household gear and travel essentials

The complete list appears in S06.

### Account conversion

Allow users to inspect their list before requiring signup.

Prompt for sign-in when they choose to save, collaborate or keep the list between devices.

Use a nonblocking save prompt after users have experienced the output.

### Acceptance criteria

- Users can view a full usable list without an account.
- Signing in preserves the generated list.
- The list is not regenerated unnecessarily during account creation.
- Guest drafts are discarded from local storage after successful migration or expiration.

---

## S06 — Packing Workspace

### Purpose

This is the application's most-used screen.

Parents should be able to work through a list quickly, while knowing exactly what remains.

### Layout

**Header**
- Destination and trip title
- Packing progress
- Trip settings menu

**View selector**
- By person
- By bag
- All items

**Filters**
- All
- Unpacked
- Packed
- Need to buy

**Main list**
- Grouped checklist items

**Persistent actions**
- Add item
- Ask AI

### By-person view

Show each traveler and one shared section.

Selecting a person displays:

- Clothing
- Toiletries
- Sleep and comfort
- Activities
- Travel-day essentials
- Other

Only display relevant categories.

Each category shows completed versus total item counts.

### By-bag view

Show bags such as:

- Checked suitcase
- Carry-on
- Kids' backpack
- Unassigned

Users can add and rename bags.

An item can belong to one traveler while physically residing in another person's bag.

### Item-row behavior

Each row contains:

- Checkbox
- Item name
- Required quantity
- Optional bag label
- Optional responsibility label
- Purchase-needed indicator when applicable

Tapping the checkbox marks the full required quantity as packed.

Tapping the row opens S07 for more detailed editing.

For partial packing, users can adjust the packed quantity in S07.

### Progress calculation

Use the proportion of complete item lines, rather than summing all units. This prevents large quantities such as diapers from overwhelming the progress metric.

An item is complete when:

`packed_quantity >= required_quantity`

A zero-quantity item should be removed or explicitly excluded rather than counted as packed.

### Status behavior

Purchasing and packing are independent states.

An item may be:

- Owned and unpacked
- Needs to be purchased
- Purchased but unpacked
- Packed

### Important UX details

- Checkbox changes update optimistically.
- Completed rows become visually muted.
- Filtering never changes the underlying item state.
- Keep an item visible briefly after checking it, rather than immediately moving it out of view.
- Provide an Undo action for accidental changes.
- Users can