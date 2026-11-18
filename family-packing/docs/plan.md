> Exported from the shared plan doc on Nov 17, 2026. The doc is the live version; this copy is refreshed weekly. Paths here are relative to `kitbag/`, and the repo named `kitbag-app` in the plan is now `kitfactory/family-packing/`. The live tracker is the Google Sheet in the shared Drive.

# Family Packing: Design to Launch Plan

Nov 11, 2026 · @Selman

## Summary

This plan takes Family Packing from the design canvas to a public launch on the App Store and Google Play in the week of March 1, 2027. That is 16 weeks from November 16, 2026, holidays included, in six phases that each end with a build on your phones.

My confidence in March 1 is low. The most likely slip is two to three weeks, from beta findings or a store rejection. There are no buffer weeks left, so a slip is absorbed by cutting scope, not by moving the date.

**What makes 16 weeks possible**

1. **Free at launch.** Payments wait until after launch unless decision 6 says otherwise, which saves about two weeks.
2. **Overlap.** The app skeleton is built in week 2, while you sign off the spec. Claude also runs app and server work in parallel sessions.
3. **Collaboration in one week.** Invites and live packing are built in week 11, on a data model that was shared-household from day one.
4. **A three-week beta.** Store listing prep happens inside the beta, not after it.
5. **Claude works through the holidays.** Weeks 6 and 7 are light for you but full build weeks.
6. **The Android tester rule handled early.** An organization account avoids it. With a personal account, the 14-day clock starts in week 9.

**Cut first if a week slips:** the in-app mic (keyboard dictation stays), the "is packing now" indicator, Scout's bag auto-sort, and any web version.

**Assumptions.** Change these and the plan changes.

- Neither of you writes production code. Claude writes it in Claude Code sessions one of you starts and checks.
- Each of you has five to six hours a week between meetings.
- The stack is Expo and React Native, Supabase, and the Claude API called only from server functions.
- The split of tasks between Selman and Daniel is my proposal, adjusted for the account ownership you set.

Business and operating work is out of scope, except where it blocks a store release.

## Who does what

Claude builds, you two decide, test on real phones and do everything that needs a person's identity or signature.

| Area | Selman (product owner) | Daniel (stores and release owner) | Claude |
| --- | --- | --- | --- |
| Requirements | Final say on scope and acceptance criteria | Second reviewer on every spec | Drafts the spec, the question lists and the decisions log |
| Design | Reviews changes against the canvas | Reviews on Android | Updates the canvas and exports it to the repo |
| Code | Starts build sessions, merges pull requests, checks on iPhone | Checks on Android | Writes all app code, database changes, server functions and tests |
| Scout quality | Writes test trips and prompts, grades outputs | Grades outputs, recruits parent reviewers | Builds the test harness, reports scores and cost |
| Accounts and keys | Owns GitHub, Expo, Supabase, Claude Console, the password vault and the domain | Owns Apple Developer and Google Play Console | Never holds credentials outside your machines |
| Testing | Runs the weekly checklist on iPhone, files issues | Runs it on Android, files issues | Writes the checklists, fixes the issues |
| Beta | Runs tester calls, triages feedback | Recruits testers, runs TestFlight and Play tracks | Summarizes feedback, ships weekly beta builds |
| Stores and legal | Go or no-go on launch, legal review of the policy | Listings, privacy forms, review submissions, agreements | Drafts listing copy, privacy answers and the policy |

What Claude cannot do: create or pay for accounts, accept agreements, hold a phone, recruit testers, press Submit for Review, or make product calls for you.

One of you needs an iPhone and the other an Android phone for testing. If you both carry iPhones, getting one Android test phone is a week 1 task.

## Weekly rhythm

Each week has one target you can check on a phone, and the weekly meeting opens by checking it.

**The meeting, 60 minutes.**

1. Demo last week's target on both phones (15 minutes).
2. Close the decisions due this week (15 minutes).
3. Triage new issues into fix now, later, or never (10 minutes).
4. Confirm next week's target and split the tasks (15 minutes).
5. Check account, review and legal items that have lead time (5 minutes).

**Between meetings.**

- Days 1 to 2: one of you starts the week's Claude Code sessions from the task list below.
- Days 3 to 5: install the new build, run the week's checklist, file issues with screenshots.
- Day before the meeting: Claude writes a one-page status, the demo script and the draft tasks for next week.

**A week is done when** the build installs on one iPhone and one Android phone, the week's checklist passes, no issue is marked blocker, and the decisions log is current.

**When a week slips,** cut scope before moving the date, starting with the cut list in the summary. Weeks 2, 6 and 7 are light for you because of Thanksgiving and the December holidays, but full build weeks for Claude.

Issues live in GitHub Issues with three labels: blocker, next and later. Claude reads them at the start of each session.

## Architecture

&#91;embedded content: architecture · phone app, Supabase, outside services, delivery pipeline\]

The phone keeps guest trips on the device and syncs signed-in households through Supabase. Every Scout call runs in a Supabase Edge Function, so the Claude API key, prompts and spend limits stay on the server. Purchases, if decision 6 picks a paid model, would add a store-billing service such as RevenueCat in week 13.

## How we build

Designs and the plan stay in Claude chat, code and issues live in GitHub, and Claude Code turns one into the other.

| Where | What lives or happens there | Who uses it |
| --- | --- | --- |
| Claude chat: the design canvas, this plan, Spec v2 | Design changes, plan changes, requirements | Both of you, with Claude |
| GitHub repo `kitbag-app` | Code, `/design`, `/docs`, `CLAUDE.md`, issues, pull requests | Both of you, Claude Code |
| Claude Code, desktop app Code tab, on the build Mac | Building screens, running the app and simulators, opening pull requests | Whoever starts the week's sessions |
| Claude Code on the web, claude.ai/code | Parallel tasks that don't need the Mac: server functions, tests, docs | Either of you |
| Expo (EAS) | Cloud builds, install links, quick fixes pushed without a store review, store submission | Daniel, through Claude Code |
| Supabase | Database, sign-in, live updates, Scout's server functions | Selman owns, Claude Code builds |
| Claude Console | The API key and monthly spend limit for Scout | Selman |
| App Store Connect, TestFlight, Play Console | Beta testing, listings, review, release | Daniel |

**How the designs get into Claude Code.** Claude Code reads files in the repo, so in week 1 Claude writes the designs there from the design chat, in three layers.

1. **Pictures:** one image per screen in `/design/screens/`, showing what it should look like.
2. **Exact values:** the artboard source files in `/design/source/` plus `/design/tokens.json`, for the precise sizes, colors, copy and states.
3. **Behavior:** `/design/screens.md` and Spec v2, for what every button does and what each state shows.

Claude Code rebuilds each screen as React Native components from those three. It does not copy the HTML.

**When a design changes later,** change it on the canvas in the design chat, then ask Claude there to "export the changed screens to the repo". The change arrives as a pull request, and the next build session picks it up. The canvas decides how things look. The spec decides how they behave, and wins any conflict until the canvas is updated.

**The weekly build loop.**

1. Monday: one of you opens the repo in the Code tab and types `Do the week N tasks in docs/plan.md`.
2. Claude Code works task by task. It asks before running commands that change your machine, and opens a pull request per task.
3. You merge pull requests whose checks pass. Expo builds and sends install links.
4. Midweek: install the build, run the checklist, and file issues with screenshots.
5. The next session starts by reading open issues labeled `blocker` and `next`.

## Timeline at a glance

&#91;embedded content: launch timeline · 6 phases over 16 weeks, the Android tester clock, 1 launch date\]

Each phase ends at a milestone: M1 a trip packed on the phone (week 5), M2 Scout passes the test trips (week 8), M3 feature complete (week 11), M4 beta gates met (week 14). With a personal Google account, the Android tester clock runs inside Phase 3.

## Decisions to close in Phase 0

These 13 decisions each block a piece of the build, so they close in weeks 1 and 2 or get a named later date.

| # | Decision | What it blocks | Due |
| --- | --- | --- | --- |
| 1 | App name, checked for trademark and store availability | App IDs, store listings, domain | Week 1 |
| 2 | Logo: the Case, or one of the other three | App icon and splash screen | Week 1 |
| 3 | Store accounts under a company or a personal name | Seller name; Google's tester rule applies to personal accounts | Week 1 |
| 4 | Full list before sign-up in the native app, yes or no | On-phone storage and the guest-to-account path | Week 1 |
| 5 | Final call on the two design changes: no packing assignment, bags off the main view | Data model and navigation | Week 1 |
| 6 | Monetization model: free at launch (recommended for 16 weeks), subscription, or one-time unlock | Guest limits, account design, Phase 7 size | Week 2 |
| 7 | Weather source: climate averages or a forecast service | Scout's weather step, running cost | Week 2 |
| 8 | Voice at launch: keyboard dictation only, or the in-app mic | Speech library, microphone permission | Week 2 |
| 9 | Phones only, or tablets too, and the oldest OS versions supported | Layout work and test devices | Week 2 |
| 10 | Launch country, language and units | Store setup, catalog wording | Week 2 |
| 11 | Cost ceiling per generated list | Model choice and Scout design; confirmed with real numbers in week 9 | Week 2 |
| 12 | Web version alongside the apps: now, later or never | Whether screens are built to run on web | Week 2 |
| 13 | What is stored about children, and which usage events are tracked | Database fields, privacy policy, store privacy forms | Week 2 |

## Phase 0: Set up and lock the spec (weeks 1 to 2)

Phase 0 ends with your Claude and GitHub setup working, the requirements signed off, and an empty app running on both phones. To save a week, the app skeleton is built during week 2 instead of after it.

### Week 1 · Nov 16 to 22

**Target:** every account is open or requested, both of you can start a Claude Code session in the shared repo, the designs are in the repo, and decisions 1 to 5 are closed.

- [ ] **Selman · Monday · 20 minutes:** Share the design canvas and this plan with Daniel.
  1. Open each page, use its Share menu, and add Daniel's email with edit access.
  2. Ask Daniel to confirm both open before Tuesday.
- [ ] **Selman and Daniel · Monday · 30 minutes each:** Set up your own Claude.
  1. Keep your existing Claude accounts. Each of you needs a Pro or Max plan, because Claude Code needs a paid plan.
  2. On the Mac that will build the app, install the Claude desktop app from claude.ai/download and sign in.
  3. Open the Code tab. If it is there, the account is ready.
  4. Install GitHub Desktop from desktop.github.com and sign in with your GitHub account. Create one first if needed.
- [ ] **Selman · Monday · 45 minutes:** Create the shared home for the code.
  1. On GitHub, create a free organization, for now named after the working app name.
  2. Inside it, create a private repository called `kitbag-app`. Tick "Add a README". The name can change later, and GitHub redirects old links.
  3. Add Daniel as an owner of the organization.
  4. Under Issues, create three labels: `blocker`, `next`, `later`.
  5. Paste the repository link into the design chat with Claude and approve Claude's request to write to it.
- [ ] **Claude · Tuesday, once the repo link arrives:** Put the designs and context into the repo, from the design chat.
  1. `/design/screens/` holds one image per artboard, all 31, named by screen ID, for example `S06-pack.png`.
  2. `/design/source/` holds the artboard source files, the reference Claude Code reads for exact sizes, colors and copy.
  3. `/design/tokens.json` holds the colors, type sizes, spacing and corner radii.
  4. `/design/screens.md` lists every screen: route, states, where each button goes, and which PRD section it serves.
  5. `/docs/` holds the original PRD, this plan and the Spec v2 draft.
  6. `CLAUDE.md` sits at the repo root: the stack, the folder layout, the rules (no API keys in the app, previews before AI changes), and how to run the app.
- [ ] **Selman · Wednesday · 15 minutes:** Test the Claude Code setup.
  1. In GitHub Desktop, clone `kitbag-app` to a folder such as `~/Code/kitbag-app`.
  2. In the Claude desktop app, open the Code tab and choose that folder.
  3. Type: `Read CLAUDE.md and design/screens.md. In five bullets, tell me what we are building and what week 1 and 2 hold.`
  4. If the answer matches this plan, the setup works. Daniel repeats steps 1 to 3 on his machine.
- [ ] **Daniel · Monday · 60 minutes:** Start the two store accounts, after decision 3.
  1. With a company: enroll both stores as an organization. Each needs a D-U-N-S number, which can take one to two weeks, so request it today. My understanding is that Google's 12-tester rule applies only to personal accounts, so an organization account removes it.
  2. Without a company: enroll both stores as an individual today. Apple charges $99 a year and Google $25 once.
  3. Save the enrollment confirmation emails in the shared password manager's notes.
- [ ] **Selman · Tuesday · 45 minutes:** Open the build and AI accounts.
  1. Create a shared vault in a password manager both of you use, such as 1Password or Bitwarden.
  2. Sign up for Expo at expo.dev and create an organization. Add Daniel.
  3. Sign up for Supabase at supabase.com and create an organization. Add Daniel. Don't create a project yet.
  4. Sign up for the Claude Console at platform.claude.com, set a monthly spend limit of $50, and add Daniel. Don't create an API key yet.
  5. Put every login in the vault.
- [ ] **Selman · after decision 1:** Register the domain under the app name. Invite links and the privacy policy need it.
- [ ] **Daniel · Wednesday:** If you both carry iPhones, buy or borrow one Android phone, Android 12 or newer, for testing.
- [ ] **Daniel · only if decision 6 is a paid model:** Start the paid-app agreement, tax and banking forms in App Store Connect and Play Console.
- [ ] **Selman and Daniel · before the meeting · 90 minutes each, separately:** Review the designs.
  1. Open the canvas and press Play on S01 first run. Walk the whole flow to the all-packed screen.
  2. Put a comment on every artboard starting with KEEP, CHANGE or CUT, plus one line of why.
  3. Don't read each other's comments until you have both finished. Two independent passes catch more.
- [ ] **Claude · by Wednesday:** Draft Requirements Spec v2 as a shared doc: every screen with its states, rules and acceptance criteria, built from the canvas.
- [ ] **Claude · by Wednesday:** List every place the designs now contradict the original PRD, each with a proposed ruling.
- [ ] **Claude · by Wednesday:** Draft the launch scope list, with must have, later and never, sized to 16 weeks.
- [ ] **Selman and Daniel · weekly meeting:** Close decisions 1 to 5, go through the review comments, and confirm the scope list.

### Week 2 · Nov 23 to 29 (Thanksgiving, light for you, full for Claude)

**Target:** Spec v2 is signed, decisions 6 to 13 are closed, and an app skeleton with the component gallery runs on both phones.

- [ ] **Claude · Monday:** Update the canvas with your week 1 comments and mark it Design v1.0. Refresh the images in `/design/screens/`.
- [ ] **Selman and Daniel · by Tuesday · 60 minutes each:** Read Spec v2 and answer Claude's question list in the doc's comments.
- [ ] **Daniel · Monday · about 2 hours, mostly downloads:** Set up the build Mac.
  1. Install Xcode from the Mac App Store and open it once to accept the license.
  2. Install Android Studio from developer.android.com and create one Pixel emulator in its Device Manager.
  3. Install Node.js LTS from nodejs.org.
  4. Claude Code installs everything else when it scaffolds the app, and asks you before it runs each command.
- [ ] **Selman · Tuesday · 30 minutes to start, then check in:** Run the first build session. Open the repo in the Code tab and paste:

```
Read CLAUDE.md, docs/spec-v2.md and design/screens.md.
Then do the week 2 Claude tasks in docs/plan.md, in order:
1. Create the Expo app (TypeScript, Expo Router) in this repo.
2. Add the design tokens and fonts from design/tokens.json.
3. Build the core components and a component gallery screen
   that matches design/screens and design/source.
4. Add placeholder screens for every route in design/screens.md.
5. Set up EAS builds for development, beta and production.
Stop and ask me before creating any account or paid service.
Open a pull request when each step works.
```

- [ ] **Claude · in that session:** Scaffold the Expo app and build the core components (buttons, sheets, item row, crew ring, chips, Scout bar, mic button) and the component gallery.
- [ ] **Claude · in a second session:** Write the data model, built as a shared household from day one. Write the contract for each Scout function and the catalog format.
- [ ] **Selman · Wednesday · 15 minutes:** Review and merge the pull requests in GitHub Desktop or on github.com. Merge only when the session says its checks passed.
- [ ] **Selman and Daniel · Friday:** Install the first development build on your phones.
  1. iPhone: the session gives you a link that registers your phone with Apple. Open it on the phone, then install the build from the second link.
  2. Android: open the build link on the phone and allow installing from that source.
  3. Open the component gallery. File every difference from the canvas as an issue with a screenshot.
- [ ] **Selman · by Sunday · 60 minutes:** Write 10 real test trips into `eval/trips/` using the template Claude adds: stops, crew, activities, and what you actually packed.
- [ ] **Daniel · by Sunday:** Collect 10 more trips from other families, covering a baby, teens, a road trip, skiing and a beach week. Line up 5 of those parents as first testers.
- [ ] **Selman and Daniel · weekly meeting:** Sign Spec v2 and close decisions 6 to 13. Recommendation for decision 6: free at launch, which takes about two weeks out of the 16.

**Exit gate:** Spec v2 is signed by both of you, and a change merged in the morning reaches both phones by the evening.

## Phase 1: Core packing loop (weeks 3 to 5)

Phase 1 ends when you can plan and pack a real trip on the phone with no account and no AI. Lists come from the curated catalog and quantity rules, and everything is stored on the phone.

This is the product's backbone. If packing from a rule-based list isn't pleasant, Scout won't rescue it.

### Week 3 · Nov 30 to Dec 6

**Target:** create a trip on the phone, from the first-run home through the trip form and date picker to the review ticket.

- [ ] **Claude:** Build the first-run home, the trip form (stops, dates or length, crew, activities, notes), the date picker and the review ticket.
- [ ] **Claude:** Build on-phone storage for trips and crew, with input checks.
- [ ] **Claude:** Draft catalog v1 from the 20 test trips: items, categories, age bands, activity tags, quantity rules.
- [ ] **Selman:** Review catalog v1 line by line for missing items and wrong quantities.
- [ ] **Daniel:** Send the catalog to your 5 parent testers for the ages you two know less well.
- [ ] **Both:** Run the week's checklist on your phone and file issues.

### Week 4 · Dec 7 to 13

**Target:** confirm a trip, get a rule-based list, and check items off in the packing workspace.

- [ ] **Claude:** Build the list generator from the catalog and rules, with tests for the quantity and progress math.
- [ ] **Claude:** Build the trip home and the packing workspace: crew rings, filters, collapsing header, partial quantities, undo.
- [ ] **Both:** Generate lists for 5 of the test trips and mark what's missing or wrong.

### Week 5 · Dec 14 to 20

**Target:** milestone M1, a real trip packed end to end on each phone.

- [ ] **Claude:** Build the item sheet, add-an-item, to-buy status, bags and bag setup.
- [ ] **Claude:** Build the trip menu (edit, duplicate, archive, delete), the past trips list and the all-packed screen.
- [ ] **Claude:** Add loading, empty and error states, and run a first accessibility pass.
- [ ] **Both:** Pack for a real or pretend holiday trip using only the app. Write down every moment of friction.
- [ ] **Both, at the meeting:** M1 review, a go or no-go on Scout, and a re-ranked backlog.

**Exit gate:** each of you has packed one full trip in the app without asking how anything works.

## Phase 2: Scout (weeks 6 to 8)

Phase 2 ends when Scout produces lists you'd actually pack from for the 20 test trips, and never changes a list without a preview.

Weeks 6 and 7 are the holidays. Founder tasks there are short; Claude keeps building. Grading lands in week 8, when you're back.

### Week 6 · Dec 21 to 27 (holiday, light)

**Target:** trip notes turn into chips as you type, Scout asks its tailored questions, and the weather card fills itself.

- [ ] **Selman · 30 minutes:** Create the Supabase development project and a Claude API key, then put the key in Supabase's secrets. The key never goes in the app or the repo.
- [ ] **Claude:** Build the server functions for note parsing and tailored questions, with strict output checks and a fallback when the model fails.
- [ ] **Claude:** Build the weather step per decision 7, the questions screen, and per-device rate limits for guests.
- [ ] **Selman · 30 minutes:** Approve Scout's one-page rulebook from Claude's draft: its tone, and what Scout may never do.

### Week 7 · Dec 28 to Jan 3 (holiday, light)

**Target:** Create our packing list returns a tailored list, and a failure falls back to the rule-based list.

- [ ] **Claude:** Build list generation: the catalog baseline first, then Scout's additions, quantity changes and one-line reasons.
- [ ] **Claude:** Build the generating screen and the failure screen with its two fallbacks.
- [ ] **Claude:** Build the test harness. It runs all 20 trips, scores coverage, invented items and quantity errors, and reports the cost per list.
- [ ] **Selman · 30 minutes:** Write 30 things real parents would say to Scout mid-packing.

### Week 8 · Jan 4 to 10

**Target:** milestone M2. Scout passes the test trips, and spoken or typed changes come back as a preview you approve line by line.

- [ ] **Claude:** Build change proposals as structured edits, the Scout opening screen, the preview with per-line toggles, apply and undo.
- [ ] **Claude:** Build the Scout cards on the trip home, plain-language add-an-item, and voice per decision 8.
- [ ] **Selman:** Grade 10 generated lists against what was really packed, marking each item missing, wrong or excess.
- [ ] **Daniel:** Grade the other 10 the same way, and test voice on both phones in a noisy room and a car.
- [ ] **Both:** Grade Scout's answers to the 30 prompts.
- [ ] **Both, at the meeting:** Set the pass mark and confirm decision 11 with the real cost per list.

**Exit gate:** the 20 trips meet the pass mark, and no test prompt changes a list without a preview.

## Phase 3: Accounts, memory and collaboration (weeks 9 to 11)

Phase 3 ends with the feature set frozen. A family can sign in, keep lists across devices, reuse what Scout learned, and pack together on two phones.

With a personal Google account, the Android tester clock starts on Monday, January 11. Its 14 days end on January 25, so production access is requested in week 11.

### Week 9 · Jan 11 to 17

**Target:** sign in, the guest list carries over untouched, and the same list shows on two devices.

- [ ] **Daniel:** Set up Sign in with Apple and Google sign-in in the store consoles, using the settings Claude lists.
- [ ] **Daniel, personal Google account only:** Open the Play closed test with at least 15 testers, so 12 survive the 14 days.
- [ ] **Selman:** Create the Supabase production project, and set up the email sender for sign-in links on the domain.
- [ ] **Claude:** Build the cloud database with per-household access rules, sign-in, the guest-to-account move with no regeneration, and sync.
- [ ] **Claude:** Build the sign-in screen and the account screen, including data export and delete-my-account.
- [ ] **Selman:** Run Claude's access test, which checks that a second account can never see the first household's data.

### Week 10 · Jan 18 to 24

**Target:** crew profiles persist, Scout proposes memories and saves nothing unconfirmed, and a new trip can start from a past one.

- [ ] **Selman:** Approve the memory rules: what Scout may infer, what needs a yes, and what is never stored.
- [ ] **Claude:** Build the crew and profile screens, memory proposals with their confirm step, and forget.
- [ ] **Claude:** Build pack-like-a-past-trip, the returning home, past and archived trips, and the home loading and error states.
- [ ] **Daniel:** Check tester opt-ins in Play Console daily and replace anyone who drops.

### Week 11 · Jan 25 to 31

**Target:** milestone M3, feature complete. Two adults pack one list from two phones, and a check on one shows on the other within two seconds.

- [ ] **Selman:** Publish the two link files Claude writes on the domain, so invite links open the app.
- [ ] **Claude:** Build invites, the join screen, the pack-together screen, live updates and "is packing now" presence.
- [ ] **Claude:** Handle two people changing the same item, and checkmarks made with no signal.
- [ ] **Daniel:** Apply for Play production access once the 14 days are complete.
- [ ] **Both:** Run the invite test grid (iPhone to Android and back, signed in and out), then pack one list together for 20 minutes.
- [ ] **Both, at the meeting:** Declare feature freeze. From here, new ideas go on the later list.

**Exit gate:** every screen on the canvas exists in the app, and Google has the production access request.

## Phase 4: Beta and hardening (weeks 12 to 14)

Phase 4 ends when about 50 outside families have used the app and it meets the launch gates. If decision 6 picked a paid model, Claude builds purchases in parallel during these weeks.

The bars below are my proposal. Agree your own numbers in week 12, before the first tester sees the app.

| Launch gate | Proposed bar |
| --- | --- |
| Sessions without a crash | 99.5% or better |
| List generation succeeds | 97% or better, with the fallback covering the rest |
| Testers who create a trip and reach a list | 80% or better |
| Testers with a list who check off 10 or more items | 60% or better |
| Open blocker issues | 0 |

### Week 12 · Feb 1 to 7

**Target:** the frozen app is instrumented and safe for strangers, and 20 families have it installed.

- [ ] **Claude:** Add crash reporting and the usage events from decision 13.
- [ ] **Claude:** Run three passes: speed (a 300-item list scrolls smoothly), security (access rules, rate limits, hostile text) and accessibility.
- [ ] **Claude:** Draft the privacy policy and terms from the real data map.
- [ ] **Selman:** Send the privacy policy and terms for legal review. This has lead time.
- [ ] **Daniel:** Open TestFlight external testing and the Play test track, and invite wave 1 of 20 families. Apple reviews the first external TestFlight build; my understanding is that usually takes a day or two.
- [ ] **Selman:** Write the beta script (five tasks) and the feedback form.

### Week 13 · Feb 8 to 14

**Target:** 50 families invited, and the top 10 issues from wave 1 fixed.

- [ ] **Selman:** Run five 20-minute tester calls, including two with families who stopped using the app.
- [ ] **Daniel:** Invite wave 2, answer tester questions, and check the crash dashboard daily.
- [ ] **Claude:** Fix blockers within the week, summarize feedback themes, and ship a beta build before the meeting.
- [ ] **Claude, only if decision 6 is paid:** Build the paywall, purchase and restore. Daniel creates the products and test accounts in both consoles.

### Week 14 · Feb 15 to 21

**Target:** milestone M4. Every launch gate is met, and a release candidate is ready.

- [ ] **Claude:** Fix the remaining fix-now issues and produce the gate report.
- [ ] **Claude:** Draft the store listing copy, the screenshots in each store's required sizes, and the answers for Apple's privacy labels and Google's data safety form.
- [ ] **Both, at the meeting:** Run the beta retro and approve the launch scope and the listing.

## Phase 5: Launch (weeks 15 to 16)

Phase 5 ends when both apps are public and a new family can go from download to a packed bag with no help from you.

### Week 15 · Feb 22 to 28

**Target:** both apps submitted for review by Wednesday, February 24.

- [ ] **Claude:** Cut the release build, run the full regression checklist, and write the support page, the FAQ and the notes for reviewers.
- [ ] **Selman:** Publish the reviewed privacy policy and support page on the domain.
- [ ] **Daniel:** Enter the listings, privacy forms and age ratings in both consoles, create a demo account for reviewers, then upload and submit.
- [ ] **Selman:** Make the go or no-go call from Claude's final report before Daniel submits.
- [ ] **Daniel:** If a store rejects the build, send the reason to Claude the same day and resubmit the fix.

### Week 16 · Mar 1 to 7

**Target:** public on both stores by Tuesday, March 2, or on the first day both approvals are in. Version 1.0.1 ships by Friday.

- [ ] **Daniel:** Release both apps with a gradual rollout where the store offers one.
- [ ] **Claude:** Turn launch bugs into fixes within a day, ship 1.0.1, and write the first-week report: gates, cost per family, top issues.
- [ ] **Both:** Check crashes, Scout cost and the support inbox every day.
- [ ] **Both, at the meeting:** Run the launch retro and decide what the next four weeks hold.

**Launched means:** both apps are downloadable in the launch country, the launch gates still hold with real users, and crash alerts and a support address are live.

## Risks

The two risks most likely to move the launch date are Scout's list quality and your available hours, and the plan holds a named answer for each.

| Risk | My read | What the plan does about it |
| --- | --- | --- |
| No buffer weeks in 16 | High | A named cut list, and scope is cut before the date moves |
| Scout's lists miss the quality bar | Moderate | Test trips written in week 2, graded in week 8, and the rule-based list ships as the fallback either way |
| Founder hours run short over the holidays | High | Weeks 6 and 7 hold only short founder tasks, and Claude keeps building |
| Beta feedback reopens scope | High | Feature freeze in week 11 and a fix now, later, never rule |
| Android testers drop and the 14-day clock restarts | Moderate | An organization account avoids the rule, otherwise 15 testers for 12 slots, checked daily |
| A store rejects the first submission | Moderate | Account deletion, sign-in rules and privacy forms are built in, and submission is planned for week 15 to leave a few days for one resubmission |
| Sync or live-update bugs | Moderate | Shared-household data model from day one, one simple conflict rule, a two-phone packing session in week 11 |
| Bugs only visible on a real phone | Certain | Claude can't see your devices, so the weekly checklist and screenshots on every issue are not optional |
| Scout costs more per family than you'll accept | Low to moderate | Cost per list reported in week 8 |
| Concerns about children's data | Low | Children are profiles with a first name and age only, and the policy gets legal review in week 12 |

## Sources

- [Google Play: app testing requirements for new personal developer accounts](https://support.google.com/googleplay/android-developer/answer/14151465?hl=en)
- [Expo: submit to app stores](https://docs.expo.dev/deploy/submit-to-app-stores.md)
- [Claude Code overview](https://code.claude.com/docs/en/overview)

Store agreement lead times and Apple's review rules are from my own knowledge, not checked for this plan. Daniel should confirm them in each console in week 1.
