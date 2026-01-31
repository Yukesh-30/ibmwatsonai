# AI-powered Food Demand Forcasting and Redistribution using IBM watsonx Orchestrate

## Overview
Food wastage is a major problem in daily life. While many people suffer from hunger, a large amount of food is wasted on the other side.

In cloud kitchens, catering services, and restaurants, food producers often do not have a clear understanding of customer demand. Because of this, they sometimes prepare excess food or insufficient food.

Most of the time, they also lack proper knowledge about what food is being wasted, how much is wasted, and why it is wasted. This leads to poor planning, financial loss, and increased food wastage.

Our solution ServeWell handels this particular problem,
ServeWell is an **agentic AI orchestration system** designed to help **large-scale kitchens, welfare canteens, and restaurants** make better daily operational decisions.

Instead of relying on guesswork or isolated predictions, ServeWell coordinates **multiple specialized AI agents** to transform daily signals into **actionable plans** for food preparation, procurement, redistribution, and crisis response.

The core innovation of ServeWell is **decision orchestration**, not just prediction.

---

## Problem

Food service operations that serve communities at scale face daily uncertainty:

- Demand fluctuates due to weather, events, and emergencies
- Overproduction causes **food wastage**
- Underproduction leads to **shortages and unmet demand**
- Forecasts (if available) are disconnected from operations
- Crisis scenarios are handled manually and inconsistently

Most existing systems either:
- Stop at **forecasting**, or
- Apply **static rules**, or
- Depend heavily on human intuition

They do **not** coordinate decisions across preparation, procurement, redistribution, and crisis management.

---

## Solution Overview

ServeWell addresses this gap using **agentic AI**, orchestrated by **IBM watsonx Orchestrate**.

Rather than a single model or chatbot, ServeWell runs a **multi-agent workflow**, where each agent has a clearly defined responsibility. These agents work together to generate a unified **Daily Operations Plan**.

At a high level:

**User Input → AI Agents (Orchestrated) → Actionable Decisions → UI Output**

---

## Agentic Architecture Core Design

ServeWell is implemented as a **multi-agent system** using IBM watsonx Orchestrate as the **control plane**.

### Agents Used

- **ServeWell Orchestrator**
  - Entry point of the workflow
  - Collects user inputs
  - Enforces execution order
  - Compiles final outputs

- **Signals & Data Agent**
  - Validates and normalizes daily inputs
  - Detects missing or inconsistent values
  - Determines system mode: `NORMAL` or `CRISIS`

- **Forecast Agent**
  - Consumes demand predictions
  - Produces expected demand ranges and confidence
  - Designed to work with ML or fallback heuristics

- **Planner Agent**
  - Converts forecasts into:
    - preparation targets
    - procurement quantities
    - staffing recommendations

- **Guardrail Agent**
  - Evaluates waste risk vs shortage risk
  - Recommends adjustments
  - Adds governance and safety checks

- **Redistribution Agent** 
  - Activates when surplus risk is detected
  - Generates pickup and donation plans

- **Crisis Management Agent** 
  - Activates during emergencies
  - Produces crisis operations plans
  - Enforces **human-in-the-loop** override

Each agent performs **one responsibility only**, making the system transparent, explainable, and scalable.

---

## Role of Machine Learning (Forecasting)

ServeWell includes a **machine learning–powered demand forecasting model**, but ML is treated as an **enabling component**, not the end product.

### ML at a glance
- Predicts **daily food demand (units served)**
- Outputs demand estimates with uncertainty bounds
- Implemented using **XGBoost within a Scikit-learn pipeline**
- Designed for modularity, reproducibility, and protection against data leakage



---

## End-to-End Workflow

1. **Frontend Input**
   - Location and planning date
   - Yesterday’s meals served
   - Inventory left
   - Weather and event indicators
   - Emergency flag (optional)

2. **Orchestration Start**
   - Input is sent to ServeWell Orchestrator (watsonx Orchestrate)

3. **Sequential Agent Execution**
   - Signals → Forecast → Planning → Guardrails
   - Redistribution and Crisis agents trigger conditionally

4. **Unified Output**
   - Human-readable operational tables
   - Structured JSON for the frontend
   - Key inferences and alerts

5. **Frontend Display**
   - Clear action-oriented UI
   - Crisis banners and human override indicators when required

---

## Output Design

Every ServeWell run produces **three layers of output**:

1. **Human-Readable Tables**
   - Operator-friendly summary
   - Designed for real-world decision-making

2. **Structured JSON**
   - Machine-readable
   - Used by the frontend and future integrations

3. **Key Inference**
   - Concise explanation of:
     - recommended actions
     - risks
     - next steps

---

## Demo Scenarios Covered

“This screenshot shows the ServeWell multi-agent system built in IBM watsonx Orchestrate, where a central orchestrator coordinates specialized agents for forecasting, planning, guardrails, redistribution, and crisis management.”
  <img width="1100"  alt="image" src="https://github.com/user-attachments/assets/7ba30809-bde5-4925-8725-a9f8576897fa" />


- **Normal Day**
  - Baseline forecasting and planning
  <img width="1100"  alt="image" src="https://github.com/user-attachments/assets/55602e50-9f57-498e-8073-abbb80895f5b" />
  <img width="1100"  alt="image" src="https://github.com/user-attachments/assets/b72e7fb7-34f9-4835-ac59-c8bb2cc6a21e" />

 Screenshot: HUMAN_TABLES + JSON header showing mode NORMAL, forecast, plan.

- **Demand Spike**
  - Weather or local events increase demand
  <img width="1100"  alt="image" src="https://github.com/user-attachments/assets/fce939a3-2227-40b5-88d9-8016a1477196" />
  <img width="1100"  alt="image" src="https://github.com/user-attachments/assets/e4575501-7fce-4417-83a8-f90909a7711a" />

 Screenshot: FORECAST table showing higher predicted demand + “drivers”.


- **Redistribution Trigger**
  - Surplus detected, donation plan generated

  <img width="1100" alt="image" src="https://github.com/user-attachments/assets/6267a640-7995-440b-bb8c-2ac50ed1a7bf" />
  <img width="1100"  alt="image" src="https://github.com/user-attachments/assets/1e9482fd-ac52-4b0c-9b94-0e961bff237c" />
  
 Screenshot: REDISTRIBUTION table with triggered = true, pickup window, message template.

- **Crisis Mode**
  - Extreme weather or emergency
  - Human override required
  - Crisis operations plan activated

<img width="1100"  alt="image" src="https://github.com/user-attachments/assets/313ba325-5e28-499f-bb15-7d0910a64e0c" />
<img width="1100"  alt="image" src="https://github.com/user-attachments/assets/ea937e87-4f03-4558-a357-4d2d60c01999" />


---



#Frontend Demo
<img width="1613" height="729" alt="Screenshot 2025-10-12 111909" src="https://github.com/user-attachments/assets/f6e72a57-1b15-407d-956d-368ec80060ff" />


<img width="1613" height="696" alt="Screenshot 2025-10-12 111923" src="https://github.com/user-attachments/assets/53733df3-8b42-4f9b-a467-00e8b1b9c425" />


<img width="1560" height="445" alt="Screenshot 2025-10-12 111936" src="https://github.com/user-attachments/assets/20d8d2c1-a63a-4e99-9d87-e29301e4b5c1" />


<img width="1609" height="812" alt="Screenshot 2025-10-12 111953" src="https://github.com/user-attachments/assets/e551f9f3-b5b7-4f74-819b-0f15d0915b5e" />


<img width="1574" height="440" alt="Screenshot 2025-10-12 112005" src="https://github.com/user-attachments/assets/fde31909-a6f7-4bc6-bcbc-e2f6d13504db" />


<img width="1610" height="787" alt="Screenshot 2025-10-12 112027" src="https://github.com/user-attachments/assets/1c439a10-f475-4b5a-af9c-5e753598ea12" />

Respones is Frontend which is also updated in UI 

<img width="1610" height="787" alt="Screenshot 2025-10-12 112027" src=https://github.com/user-attachments/assets/e721ae1c-8a27-42f5-b01a-b84de465285c />
<img width="1610" height="787" alt="Screenshot 2025-10-12 112027" src=https://github.com/user-attachments/assets/e721ae1c-8a27-42f5-b01a-b84de465285c />
<img width="1610" height="787" alt="Screenshot 2025-10-12 112027" src=https://github.com/user-attachments/assets/c4f55316-6241-4cda-b161-cd0dd2855388 />
<img width="1610" height="787" alt="Screenshot 2025-10-12 112027" src=https://github.com/user-attachments/assets/e721ae1c-8a27-42f5-b01a-b84de465285c />



## Why ServeWell Is Different

- Not just an ML forecasting system
- Not just a chatbot
- Not static rule-based automation

ServeWell:
- Orchestrates **decisions**, not just predictions
- Handles normal and crisis scenarios
- Embeds governance and human oversight
- Scales across kitchens, canteens, and regions

---

## Technology Stack

- **AI Orchestration:** IBM watsonx Orchestrate  
- **AI Paradigm:** Multi-agent, agentic workflows  
- **Forecasting:** XGBoost (Scikit-learn pipeline)  
- **Frontend:** React , tables, JSON, and insights  

---

## Summary

ServeWell demonstrates how **agentic AI**, coordinated using **IBM watsonx Orchestrate**, can transform uncertain daily signals into **coordinated, responsible, and impactful real-world actions**.

By using multi-agent orchestration, ServeWell reduces food waste, prevents shortages, and enables resilient food-service operations—especially during crises.



