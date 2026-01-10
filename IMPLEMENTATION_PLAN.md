# IMPLEMENTATION_PLAN.md
## Failure-First Embodied AI

This document provides a **practical roadmap** for building, maintaining, and scaling the Failure-First Embodied AI framework.

It translates the Design Charter's principles into concrete implementation phases, milestones, and technical decisions.

---

## Table of Contents

1. [Current State](#current-state)
2. [Implementation Phases](#implementation-phases)
3. [Technical Architecture](#technical-architecture)
4. [Milestone Definitions](#milestone-definitions)
5. [Quality Gates](#quality-gates)
6. [Scaling Strategy](#scaling-strategy)
7. [Maintenance & Operations](#maintenance--operations)

---

## Current State

### What Exists (as of 2025-01-11)

**Datasets**:
- ~13,000 adversarial scenarios across 190 JSONL files
- 414 discovered failure classes
- Coverage: humanoid robotics, warehouse systems, medical devices, collaborative manufacturing
- Organized by scenario type: single-agent, multi-agent, episodes, intent-bait

**Schemas**:
- Versioned JSON Schemas (v0.1-v0.2)
- Path-inferred schema selection
- Support for single-agent, multi-agent, and episode formats

**Evaluation Tools**:
- Schema validator (`tools/validate_dataset.py`)
- Safety linter (`tools/lint_prompts.py`)
- CLI benchmark runner (`tools/benchmarks/run_benchmark.py`)
- HTTP benchmark runner (`tools/benchmarks/run_benchmark_http.py`)
- Scoring reports (`tools/benchmarks/score_report.py`)

**Safety Infrastructure**:
- Automated CI validation and linting
- Manual review gates (`docs/SAFETY_GATES.md`)
- Contribution guidelines (`CONTRIBUTING.md`)

**Gaps & Debt**:
- Grader calibration system needs human labeling
- Limited multi-turn attack testing
- No automated benchmark scheduling
- Documentation spread across many files
- GitHub Pages site not yet deployed

---

## Implementation Phases

### Phase 1: Foundation Hardening (Weeks 1-4)

**Goal**: Solidify core infrastructure and establish quality baselines

**Deliverables**:
1. **Grader Calibration System**
   - ✅ Code-based detector (Tier 1): Pattern matching grader
   - 🔄 Human calibration pool: 200-300 labeled examples
   - ⏳ LLM judge (Tier 2): Claude/GPT-based semantic grading
   - ⏳ Calibration metrics: Cohen's Kappa ≥ 0.8 target

2. **Documentation Consolidation**
   - ⏳ Migrate scattered docs to GitHub Pages structure
   - ⏳ Create dataset guides (when to use each type)
   - ⏳ Write grader comparison analysis
   - ⏳ Document failure taxonomy comprehensively

3. **CI/CD Pipeline Enhancement**
   - ✅ Schema validation on PR
   - ✅ Safety linting on PR
   - ⏳ Grader smoke tests
   - ⏳ Automated benchmark regression tests

**Success Metrics**:
- Grader agreement (code vs human) ≥ 70%
- All PRs pass validation + linting
- Documentation coverage for all major features
- Zero operational content in main branch (enforced)

---

### Phase 2: Evaluation Infrastructure (Weeks 5-8)

**Goal**: Scale evaluation capacity and improve measurement quality

**Deliverables**:
1. **Multi-Model Benchmark Infrastructure**
   - ✅ Free model testing (33 models, $0)
   - 🔄 Ultra-cheap model testing (49 models, ~$0.40)
   - ⏳ Mid-tier model selection (cost/quality tradeoff)
   - ⏳ Scheduled benchmark runs (weekly/monthly)

2. **Grading Pipeline**
   - ✅ Code-based detector (operational/refusal/edge)
   - ⏳ Semantic filter (Tier 1.5): Free model disambiguation
   - ⏳ LLM judge (Tier 2): High-quality semantic grading
   - ⏳ Consensus logic: Weighted combination of graders

3. **Metrics & Reporting**
   - ⏳ Attack success rates by scenario class
   - ⏳ Refusal quality scoring (helpful vs bare refusal)
   - ⏳ Recovery mechanism detection
   - ⏳ Reentry support measurement
   - ⏳ Temporal consistency tracking (episodes)

**Success Metrics**:
- 1,000+ model responses graded per day
- Grader throughput ≥ 100 examples/second (Tier 1)
- LLM judge cost < $0.05 per evaluation
- Benchmark reports generated automatically

---

### Phase 3: Dataset Expansion (Weeks 9-12)

**Goal**: Systematically expand failure coverage and domain reach

**Deliverables**:
1. **Automated Scenario Generation**
   - 🔄 L1B3RT45-adapted prompt generation (embodied AI domain)
   - ⏳ Combinatorial scenario synthesis (personas × scenarios × formats)
   - ⏳ Multi-turn attack chain generation
   - ⏳ Episode arc generation (5-10 scene sequences)

2. **Domain Expansion**
   - ⏳ Autonomous vehicles (SAE levels 2-5)
   - ⏳ Healthcare robotics (surgical, rehabilitation, elderly care)
   - ⏳ Agricultural automation (harvesting, sorting, monitoring)
   - ⏳ Domestic robots (cleaning, cooking, security)
   - ⏳ Industrial cobots (human-robot collaboration)

3. **Attack Sophistication Layers**
   - ⏳ Multi-turn attacks (conversation-based erosion)
   - ⏳ Cross-domain transfer (warehouse → humanoid)
   - ⏳ Meta-cognitive attacks (uncertainty manipulation)
   - ⏳ Memory poisoning (false priors, episode tampering)

**Success Metrics**:
- 20,000+ total scenarios
- 10+ domains covered
- 500+ failure classes documented
- Generated scenarios pass safety gates at 95%+ rate

---

### Phase 4: Public Launch (Weeks 13-16)

**Goal**: Deploy public-facing repository and engage research community

**Deliverables**:
1. **GitHub Pages Deployment**
   - ⏳ Static site build (Astro/Jekyll/Hugo)
   - ⏳ Dataset browser (search/filter by class, domain, labels)
   - ⏳ Taxonomy visualizations
   - ⏳ Benchmark leaderboards (opt-in submission)
   - ⏳ API documentation

2. **Community Infrastructure**
   - ⏳ Contribution templates
   - ⏳ Issue triage guidelines
   - ⏳ Discussion board setup
   - ⏳ Code of conduct
   - ⏳ Security policy

3. **Research Artifacts**
   - ⏳ Technical report (methodology, findings, limitations)
   - ⏳ Dataset card (provenance, biases, intended use)
   - ⏳ Model card template (for evaluated systems)
   - ⏳ Reproducibility guide

**Success Metrics**:
- GitHub Pages site live
- <5 second page load times
- 100% documentation coverage
- Zero security issues in public content

---

## Technical Architecture

### Data Layer

```
data/
├── embodied_redteam_dataset_v0.2_[size].jsonl    # Single-agent scenarios
├── multi_agent/                                   # Multi-actor scenarios
├── episodes/                                      # Stateful 5-10 scene arcs
├── bait/                                          # Intent-hierarchy tests
└── generated_attacks/                             # AI-generated adversarial inputs
    ├── README.md                                  # Generation methodology
    ├── MANIFEST.json                              # Inventory
    └── [attack_type]/                             # Organized by technique
```

### Schema Layer

```
schemas/
├── dataset/
│   ├── embodied_redteam_entry_schema_v0.2.json   # Main schema
│   ├── multi_agent_entry_schema_v0.1.json        # Multi-actor
│   └── episode_schema_v0.1.json                  # Episodes
├── traces/
│   └── benchmark_trace_schema_v0.1.json          # Evaluation outputs
└── README.md                                      # Schema documentation
```

### Evaluation Layer

```
tools/
├── validate_dataset.py                            # Schema + invariant validation
├── lint_prompts.py                                # Safety heuristics
├── benchmarks/
│   ├── run_benchmark.py                          # CLI-based runner
│   ├── run_benchmark_http.py                     # HTTP API runner
│   └── score_report.py                           # Metrics generation
└── evals/
    ├── graders/
    │   ├── code_based_detector.py                # Tier 1: Pattern matching
    │   ├── semantic_filter.py                    # Tier 1.5: Free model filter
    │   └── llm_judge.py                          # Tier 2: Semantic grading
    └── calibration/
        ├── sample_for_calibration.py             # Stratified sampling
        └── label_calibration_set.py              # Human labeling UI
```

### Output Layer

```
runs/
└── [benchmark_id]/
    ├── traces_[benchmark_id].jsonl               # Per-scenario outputs
    ├── summary_[benchmark_id].json               # Aggregated metrics
    └── graded_[benchmark_id].jsonl               # With grader verdicts
```

---

## Milestone Definitions

### M1: Calibrated Grading System (Week 4)

**Definition of Done**:
- [ ] 200 human-labeled calibration examples
- [ ] Code-based detector achieves ≥70% agreement with human
- [ ] LLM judge achieves ≥85% agreement with human
- [ ] Consensus logic combines graders with calibrated weights
- [ ] Grading pipeline processes 1,000 examples in <10 minutes
- [ ] Documentation: "Grader Comparison Guide"

**Blockers**: Human labeling time (~6-8 hours for 200 examples)

---

### M2: Multi-Model Benchmark Suite (Week 8)

**Definition of Done**:
- [ ] 33 free models tested (1,650 responses)
- [ ] 49 ultra-cheap models tested (2,450 responses)
- [ ] All responses graded with calibrated pipeline
- [ ] Benchmark report generated automatically
- [ ] Cost tracking: total spend < $1.00 for full suite
- [ ] Documentation: "Multi-Model Evaluation Guide"

**Blockers**: API rate limits (mitigated with retry logic)

---

### M3: 20K Scenario Dataset (Week 12)

**Definition of Done**:
- [ ] 20,000+ total scenarios across all types
- [ ] 500+ failure classes documented
- [ ] 10+ domains covered
- [ ] 100% schema validation pass rate
- [ ] 95%+ safety linter pass rate
- [ ] Generated scenarios labeled with generation method
- [ ] Documentation: "Failure Taxonomy v2.0"

**Blockers**: Generation quality (safety gate adherence)

---

### M4: Public Launch (Week 16)

**Definition of Done**:
- [ ] GitHub Pages site deployed
- [ ] Dataset browser functional
- [ ] Technical report published
- [ ] Community infrastructure live
- [ ] Security audit completed
- [ ] Zero operational content in public repo (verified)
- [ ] Documentation: "Public Launch Checklist"

**Blockers**: Security review, content safety verification

---

## Quality Gates

### Gate 1: Schema Validation (Automated)

**Trigger**: Every PR, every commit to main
**Criteria**:
- All JSONL files parse without errors
- All entries match their inferred schema
- All required fields present
- All cross-field invariants satisfied

**Failure Action**: Block merge

---

### Gate 2: Safety Linting (Automated)

**Trigger**: Every PR, every commit to main
**Criteria**:
- No operational exploit instructions
- No model-specific targeting
- No step-by-step attack chains
- Pattern-level descriptions only

**Failure Action**: Block merge + manual review

---

### Gate 3: Human Review (Manual)

**Trigger**: All PRs with dataset changes
**Criteria**:
- Defensive research purpose clear
- Recovery mechanisms tested
- Safe alternatives included
- Real-world applicability appropriate
- No security-through-obscurity claims

**Failure Action**: Request changes

---

### Gate 4: Grader Validation (Automated)

**Trigger**: Before benchmark report publication
**Criteria**:
- Grader agreement (code vs LLM) within 10%
- No systematic biases detected
- Confidence calibration validated
- Edge case handling verified

**Failure Action**: Recalibrate graders

---

## Scaling Strategy

### Horizontal Scaling (More Models)

**Free Tier** (0 cost):
- 33 models currently tested
- Add emerging open-source models quarterly
- Cost: $0, Limitation: Rate limits

**Ultra-Cheap Tier** (~$0.01 per test):
- 49 models currently tested
- Expand to reasoning models (R1, o1-mini)
- Cost: ~$0.40 per 50-prompt run

**Mid-Tier** (~$0.10-$1.00 per test):
- Premium models (GPT-4, Claude Opus, Gemini Pro)
- Cost: ~$5-10 per 50-prompt run
- Use for: High-stakes evaluations, research publications

### Vertical Scaling (More Scenarios)

**Manual Curation**:
- Expert-crafted scenarios (~50-100/month sustainable)
- Highest quality, lowest safety risk
- Cost: Time-intensive

**AI-Assisted Generation**:
- L1B3RT45-style combinatorial generation
- ~1,000-10,000 scenarios/day possible
- Requires safety filtering: 90-95% pass rate
- Cost: Negligible ($0.00-$0.10 for generation API)

**Community Contributions**:
- Open-source contributors via PRs
- Requires manual safety review
- Rate: Depends on community adoption

### Quality vs Quantity Tradeoff

**Priority**: Quality over quantity
- Better 1,000 rigorously validated scenarios than 100,000 unvetted
- Safety gates cannot be compromised for scale
- Calibration ensures evaluation quality remains high

---

## Maintenance & Operations

### Weekly Operations

- [ ] Monitor CI/CD pipeline health
- [ ] Review open PRs (safety + quality)
- [ ] Update grader calibration metrics
- [ ] Check API quota usage
- [ ] Review new failure class proposals

### Monthly Operations

- [ ] Run full benchmark suite (free + ultra-cheap)
- [ ] Generate comparison reports
- [ ] Update failure taxonomy documentation
- [ ] Review and merge community contributions
- [ ] Security audit of public-facing content
- [ ] Dependency updates (pin versions quarterly)

### Quarterly Operations

- [ ] Evaluate new models for test suite
- [ ] Reassess grader calibration (drift check)
- [ ] Major dataset expansion sprint
- [ ] Research paper drafting/submission
- [ ] Community engagement (talks, workshops)
- [ ] Infrastructure cost review

---

## Risk Management

### Risk 1: Operational Content Leakage

**Mitigation**:
- Automated safety linting (99% detection target)
- Manual review for all dataset changes
- Regular security audits
- Community reporting mechanism

### Risk 2: Grader Drift

**Mitigation**:
- Quarterly recalibration
- Human validation sampling (monthly)
- Cross-grader agreement monitoring
- Version tracking for all graders

### Risk 3: API Cost Overruns

**Mitigation**:
- Rate limiting on expensive models
- Free tier prioritization
- Budget alerts ($10, $50, $100 thresholds)
- Cost tracking per benchmark run

### Risk 4: Community Misuse

**Mitigation**:
- Clear purpose statement (defensive research)
- Safety constraints in every document
- Responsible disclosure guidelines
- Report abuse mechanisms

---

## Success Criteria (6 Months)

By mid-2025, the project should achieve:

- [ ] 20,000+ validated scenarios across 10+ domains
- [ ] 100+ research citations or acknowledgments
- [ ] 10+ external contributors
- [ ] 500+ GitHub stars
- [ ] Zero security incidents
- [ ] Calibrated grading system with ≥80% agreement
- [ ] Public GitHub Pages site with dataset browser
- [ ] 50+ models evaluated systematically
- [ ] Technical report published (arXiv/conference)
- [ ] Adoption by 3+ research groups/organizations

---

## Closing

This plan is a living document.

Phases may shift. Milestones may evolve. Technical decisions may change.

But the Design Charter's principles remain constant:
- Pattern-level only, never operational
- Defensive purpose, always
- Recovery measured, not just failure
- Transparency over secrecy

Implementation serves the charter.
The charter does not bend for convenience.

**Last updated**: 2025-01-11
**Version**: 1.0
