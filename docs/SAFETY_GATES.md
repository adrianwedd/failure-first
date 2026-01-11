# SAFETY_GATES.md

## Public Repository Safety Guidelines

This document outlines safety constraints for the **public-facing** Failure-First Embodied AI repository.

### Repository Purpose

This is the **safe, public sister repository** to the private research workspace. It contains:
- GitHub Pages website
- Public documentation (README, DESIGN_CHARTER, IMPLEMENTATION_PLAN)
- Published research findings (aggregated, pattern-level only)
- Failure taxonomies and classifications

### What This Repository Does NOT Contain

- Operational jailbreak tests or raw results
- Full adversarial scenario datasets
- Internal evaluation tooling
- Grader calibration data
- Model-specific exploits

### Content Guidelines

**✅ Allowed:**
- Pattern-level descriptions of adversarial techniques
- Aggregated statistics (e.g., "51.5% vulnerability rate")
- Taxonomy of failure modes and attack classes
- Research methodology documentation
- High-level architecture and design principles

**❌ Not Allowed:**
- Step-by-step operational exploit instructions
- Working jailbreak prompts or templates
- Model-specific bypass techniques
- Raw test results or traces
- Prompt generation code that could be weaponized

### Pattern-Level vs Operational

**Pattern-Level (acceptable):**
```
"Semantic inversion techniques attempt to reframe refusal as compliance"
"Multi-stage response format exploitation patterns"
"Authority framing patterns (GODMODE, RESEARCH_MODE)"
```

**Operational (not acceptable):**
```
"Use this exact prompt template: [specific working exploit]"
"Here's how to combine techniques X+Y to bypass model Z"
"Copy-paste this into ChatGPT to extract system instructions"
```

### Research Context

This repository documents **defensive AI safety research**. All adversarial content is:
- Pattern-level description for academic understanding
- Not operational instructions for exploitation
- Similar to penetration testing documentation in cybersecurity
- Focused on improving defenses, not enabling attacks

### Contributing

See `CONTRIBUTING.md` for guidelines on what content is appropriate for this public repository.

### Relationship to Private Research Workspace

The private workspace (`failure-first-embodied-ai/`) conducts operational testing. This public repository receives only:
- Sanitized, aggregated findings
- Pattern-level failure classifications
- Methodology documentation (not operational details)

---

**Last updated:** 2025-01-11
