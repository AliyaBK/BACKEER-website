# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Static HTML/CSS/vanilla JS, no framework (existing `site/` codebase). Served locally with `python -m http.server` (see `.claude/launch.json`). No deploy target decided yet.

## Users

- **Investors** evaluating an early-stage medtech spin-out: they need to see that the science is real, the cost advantage is large, and there is traction.
- **Clinical partners** (clinics, hospitals) who could run pilots, and **distributors / healthcare companies** (B2B buyers). They need to understand what the sensor detects, how it fits a workflow, and how to get in touch.

The site's single action is "Partner with us" (clinical partners, distributors, investors).

## Product Purpose

BACKEER builds label-free optical fiber biosensors that detect disease biomarkers with light: an antibody-coated fiber captures the target biomarker and the reflected light shifts, measured without labels or lengthy lab processing. The goal is fast, affordable diagnostics, with results in minutes instead of the 3–4 weeks current diagnostics take, at a target cost of $35–50 per test versus $100–550 for current methods.

## Positioning

A single optical fiber platform, made from low-cost commercial fiber, that detects several protein biomarkers at ultra-low (attomolar-level) concentrations, label-free, and at a fraction of ELISA cost. It is backed by 20+ peer-reviewed publications from the Nazarbayev University biosensor lab that developed it.

## Capabilities and Constraints

Two product families (confirmed by the user, October 2026):

1. **SMF-based biosensor** (single-mode fiber). Includes:
   - the **ball resonator** biosensor (flagship): a CO₂-laser-formed ~500 µm sphere on a 125 µm fiber; detects CD44 (head and neck cancer) at ultra-low concentrations;
   - **semi-distributed interferometer (SDI)** sensors: KIM-1 in human urine (Talanta 295, 2025, LOD 13.6 aM, clinical samples) and LCN1 / VEGF in artificial tear fluid for diabetic retinopathy (Optics and Lasers in Engineering 189, 2025; LOD 5.98 ng/mL LCN1, 26.6 fg/mL VEGF);
   - rapid-fabrication SMF sensors (single-mode fiber sensors made in minutes, built to scale).
2. **POF + smartphone biosensor**: a D-shaped plastic optical fiber read by a smartphone's flashlight and camera via a custom Android app; IL-8 in artificial saliva, LOD 162 aM. Manuscript **under review**; label it as such.

Biomarkers and evidence (confirmed by the user, October 2026):
- CD44: validated in breast cancer (graphene-oxide-coated SDI sensor, LOD 175 aM, clinical serum from breast cancer patients vs healthy controls, plus urine; Seitkamal et al., accepted in ACS Sensors).
- IL-6 / IL-8: oral cancer, artificial saliva. FBG-assisted SDI probe, LOD 480 aM (IL-6) and 23.4 fM (IL-8); Zhakypbekova et al., Optics & Laser Technology 189 (2025) 113139.
- IL-8 (POF + smartphone): 162 aM in artificial saliva; manuscript under review.
- LCN1, VEGF: diabetic retinopathy, artificial tears; values from the Optics and Lasers in Engineering 2025 paper (not Talanta).
- KIM-1: kidney injury, urine; Talanta 2025, LOD 13.6 aM.
- Problem statistics: survival rate early vs late oral cancer (80% vs 30%); do not mention head and neck cancer anywhere on the site, 3–4 weeks to results, from $300 per diagnosis in Kazakhstan.

Open decisions (do not invent): per-product stage labels beyond "Flagship"; what the rapid-fabrication SMF sensors detect; the shared contact email (use a clearly marked placeholder); social media URLs.

Business model (pitch deck): B2B to medical clinics and healthcare companies, through service contracts and direct sales.

## Brand Commitments

- Name: **BACKEER**. Tagline from the deck: "Light in cancer diagnosis." Logo: a light-blue water drop with light rays.
- The user supplied the final site copy (October 2026), with sections: Hero, Trust strip, Problem, How it works, Products, Cost, Applications, Traction, Team, Publications, Contact. Use it verbatim, except where the user has since changed product structure (two product families).
- Light version is the base. alitegroup.eu is the structural basis, but Alite Group is a competitor, so the site **must not copy it**.
- Liked references and their specific features are listed in `../for website.docx` (alitegroup, openwater, resonetics, linear, notion, anthropic, stripe, supabase, retool, wise).

## Evidence on Hand

- Pitch deck: `pitch deck BACKEER.pdf` (problem stats with sources, competitor cost table, team, traction, achievements, publication list, lab and SEM photos). Extracted images: `site/assets/img/`.
- Papers: `../kim1.pdf` (SDI, KIM-1, Talanta 2025), `../lcn1.pdf` (SDI, LCN1/VEGF, Opt. Lasers Eng. 2025), and the POF manuscript under review (`Downloads/Manuscript_BB (2).docx` + supplementary), with real lab-setup photos, spectra and app screenshots.
- Kazakhstan patent No. 9677 (2024, breast cancer biomarker detection with a fiber-optic ball resonator); US patent filed 2025.
- Traction: 5+ letters of intent, 2 pilots starting; IREC ethics approval for IL-6/IL-8; clinical studies underway; HKSTP pre-incubation; CAI Invention Award 2025; HKUST-SINO Silver Award 2025.
- Trust partners (deck title slide): Nazarbayev University, National Laboratory Astana, University Medical Center, Jas Ventures.
- Team: six members with photos (deck slide 8).
- Stock fiber-optic imagery in `references/` intended for animation/visualization. **Licence unverified** (some are Freepik "Premium" files).
- **Absent, must not be fabricated:** customer logos, testimonials, revenue, clinical accuracy figures, regulatory approvals, time-to-result measurements beyond the user's own "in minutes" claim.

## Product Principles

1. Show the real thing: lab photos, SEM micrographs, spectra and app screens beat illustrations.
2. Every number has a source in BACKEER's own materials.
3. Be honest about stage: investigational technology, with peer-reviewed results and a submission under review.
4. Cost is a headline, not a footnote.
5. One clear action: partner with us.
