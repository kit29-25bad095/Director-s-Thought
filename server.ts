import express from "express";
import path from "path";
import net from "net";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

const app = express();
const DEFAULT_PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Lazy-initialized Gemini client with telemetry header
let geminiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  if (!geminiClient && process.env.GEMINI_API_KEY) {
    geminiClient = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return geminiClient;
}

// Resilient model cascade: if primary model faces temporary 503 high demand, cascade to fallbacks
const CANDIDATE_MODELS = [
  "gemini-3.8-flash",
  "gemini-flash-latest",
  "gemini-3.1-flash-lite",
];

async function callGeminiWithResilience(
  ai: GoogleGenAI,
  contents: any,
  config?: any
): Promise<{ text: string; model: string }> {
  let lastError: any = null;

  for (const model of CANDIDATE_MODELS) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents,
        config,
      });

      if (response && response.text) {
        return { text: response.text, model };
      }
    } catch (err: any) {
      lastError = err;
      const isTransient =
        err?.status === 503 ||
        err?.code === 503 ||
        String(err?.message || "").includes("503") ||
        String(err?.message || "").includes("high demand") ||
        String(err?.message || "").includes("UNAVAILABLE") ||
        String(err?.message || "").includes("429") ||
        String(err?.message || "").includes("RESOURCE_EXHAUSTED");

      console.warn(
        `[Gemini Resilience] Model ${model} encountered ${err?.status || err?.code || "transient error"}${
          isTransient ? " (high demand/rate limit)" : ""
        }. Trying fallback candidate...`
      );

      // Brief backoff before switching model on 503
      if (isTransient) {
        await new Promise((r) => setTimeout(r, 400));
      }
    }
  }

  throw lastError || new Error("All candidate Gemini models failed");
}

function cleanJsonText(raw: string): string {
  let cleaned = raw.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.replace(/^```json\s*/, "").replace(/\s*```$/, "");
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.replace(/^```\s*/, "").replace(/\s*```$/, "");
  }
  return cleaned;
}

function getIntelligentFallbackAssist(
  message: string,
  role: string,
  context: any,
  project: any
): string {
  const projName = project?.name || "The Last Light";
  const mod = context?.module || "Production Command";
  return `[${role} Decision Intelligence]: Analyzing "${message}" in the context of "${projName}" (${mod}).

• Narrative & Dramatic Core: Scene 27 remains the central emotional pivot between Kabir and Maya. Any pacing adjustments must safeguard the delayed confession setup and thematic resonance.
• Production Risk & Viability: Leh exterior shoots and Stage 1 wire rigs represent the highest risk variables. Ensure backup interior shoot options are scheduled for Day 14.
• Strategic Recommendation: Test the full ripple effect of this decision in the What-If Simulator before committing production budget and call-sheet locks.`;
}

function getStructuredFallbackWhatIf(query: string, project: any) {
  const isScene27 = query.toLowerCase().includes("27");
  const projName = project?.name || "The Last Light";

  if (isScene27) {
    return {
      before: { scenesCount: 46, budget: "₹2.45 Cr", durationDays: 28, riskScore: 72 },
      after: { scenesCount: 45, budget: "₹2.31 Cr", durationDays: 27.2, riskScore: 61 },
      impact: {
        story: {
          summary: "Emotional pivot point shifts from external confrontation to internal guilt deduction.",
          score: 8,
          details: [
            "Removes explicit verbal confession in the vault, forcing Maya to deduce Kabir's betrayal via telemetry logs.",
            "Subtle visual setups must be strengthened in Scene 18 and Scene 31.",
          ],
        },
        structure: {
          summary: "Midpoint beat compressed by 4 minutes, accelerating Act II escalation.",
          beatsAffected: ["Midpoint Revelation", "All Hope Is Lost"],
        },
        roadmap: {
          summary: "Roadmap Objective RM-27 re-routed into Sequence 4 foreshadowing.",
          itemsAffected: ["RM-27 (Oxygen Vault Confrontation)"],
        },
        screenplay: {
          summary: "Scene 28 dialogue requires minor 2-page adjustment.",
          scenesToRewrite: [28, 31],
        },
        production: {
          summary: "Eliminates 1 heavy interior soundstage set build and specialized atmospheric haze rigs.",
          cast: "Saves 1 working day for Lead Actor Kabir.",
          location: "No auxiliary vault soundstage set build required.",
          equipment: "Reduces 1 techno-crane rental day.",
          vfx: "Saves 4 zero-g atmospheric dust compositing shots.",
        },
        budget: {
          diff: "-₹14,00,000 (-5.7%)",
          details: "Set construction ₹8.5L + 1 day camera package ₹2.5L + cast holding ₹3L.",
        },
        schedule: {
          diff: "-0.8 Days",
          details: "Shooting schedule compresses from 28 to 27.2 effective days.",
        },
        risk: {
          diff: "72% → 61% (-11%)",
          details: "Removes high-risk pressurized hydraulic door rig stunt and tight night turnaround.",
        },
      },
      recommendation:
        "High production viability with minimal narrative sacrifice. Compensate for the lost emotional peak by extending the confrontation in Scene 31.",
    };
  }

  return {
    before: { scenesCount: 46, budget: "₹2.45 Cr", durationDays: 28, riskScore: 72 },
    after: { scenesCount: 46, budget: "₹2.38 Cr", durationDays: 27.5, riskScore: 65 },
    impact: {
      story: {
        summary: `Narrative continuity maintained with adjusted sequence pacing for "${query}" in ${projName}.`,
        score: 7,
        details: ["Pacing adjustment sharpens character conflict without sacrificing motivation."],
      },
      structure: {
        summary: "Pacing compressed by 2 minutes, tightening Act II sequence progression.",
        beatsAffected: ["Pacing Transition", "Escalation"],
      },
      roadmap: {
        summary: "Roadmap milestones remain aligned with revised production sequence.",
        itemsAffected: ["RM-14", "RM-22"],
      },
      screenplay: {
        summary: "Minor dialogue adjustments across connected scene transitions.",
        scenesToRewrite: [14, 15],
      },
      production: {
        summary: "Reduces company move overhead and optimizes lighting turnaround.",
        cast: "Consolidates call times for lead talent.",
        location: "Consolidates shooting days at primary location.",
        equipment: "Less specialized auxiliary rigging needed.",
        vfx: "Neutral VFX impact.",
      },
      budget: {
        diff: "-₹7,00,000 (-2.8%)",
        details: "Optimized equipment rental and reduced location holding fees.",
      },
      schedule: {
        diff: "-0.5 Days",
        details: "Streamlined shoot day schedule with minimal turnaround delays.",
      },
      risk: {
        diff: "72% → 65% (-7%)",
        details: "Reduced logistical exposure and weather dependency.",
      },
    },
    recommendation:
      "Favorable balance of creative integrity and production efficiency. Proceed to Creative Decision Board for team alignment.",
  };
}

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    hasGeminiKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

// ==========================================
// PRE-PRODUCTION REST APIS & INTELLIGENCE
// ==========================================

// In-Memory Synchronized Pre-Production Database Store
const PRE_PROD_STORE = {
  scenes: [
    {
      id: "sc_01",
      sceneNumber: "01",
      slugline: "INT. APARTMENT – MORNING",
      intExt: "INT",
      dayNight: "DAY",
      timeOfDay: "Morning",
      location: "Arun's Apartment",
      characters: ["Arun", "Priya"],
      props: ["Laptop", "Smartphone", "Coffee Mug", "Eviction Notice"],
      costumes: ["Casual Blue Linen Shirt", "Floral Morning Robe"],
      vfx: "Digital Screen Glow",
      sfx: "Door Knock, Distant City Traffic",
      duration: "2:30",
      status: "Ready",
      pageCount: 1.25,
      storyObjective: "Establish Arun's financial crisis and the ominous arrival of the Horizon proposal.",
    },
    {
      id: "sc_02",
      sceneNumber: "02",
      slugline: "EXT. CITY STREETS – DAY",
      intExt: "EXT",
      dayNight: "DAY",
      timeOfDay: "Day",
      location: "Downtown Boulevard",
      characters: ["Arun"],
      props: ["Backpack", "Headphones"],
      costumes: ["Denim Jacket", "Sneakers"],
      vfx: "None",
      sfx: "Sirens, Crowd Chatter",
      duration: "1:45",
      status: "Ready",
      pageCount: 1.0,
      storyObjective: "Arun races through morning traffic toward the university research lab.",
    },
    {
      id: "sc_03",
      sceneNumber: "03",
      slugline: "INT. UNIVERSITY LAB – DAY",
      intExt: "INT",
      dayNight: "DAY",
      timeOfDay: "Day",
      location: "Physics Research Wing",
      characters: ["Arun", "Dr. Vikram", "Research Assistant"],
      props: ["Particle Scanner", "Quantum Specimen Jar", "Lab Datapads"],
      costumes: ["Lab Coat", "Safety Goggles"],
      vfx: "Particle Chamber Resonance Glow",
      sfx: "Oscillator Hum, Keycard Beep",
      duration: "3:15",
      status: "In-Review",
      pageCount: 2.5,
      storyObjective: "Dr. Vikram reveals the anomalous energy readings in the deep solar archive.",
    },
    {
      id: "sc_04",
      sceneNumber: "04",
      slugline: "EXT. ROOFTOP ARCHIVE – GOLDEN HOUR",
      intExt: "EXT",
      dayNight: "DAY",
      timeOfDay: "Sunset",
      location: "Observatory Rooftop",
      characters: ["Arun", "Priya"],
      props: ["Digital Camera", "Satellite Phone"],
      costumes: ["Windbreaker", "Scarf"],
      vfx: "Atmospheric Distortions",
      sfx: "High Altitude Wind Gusts",
      duration: "2:10",
      status: "Ready",
      pageCount: 1.75,
      storyObjective: "Intimate conversation as the sun sets over the skyline before departure.",
    },
    {
      id: "sc_05",
      sceneNumber: "05",
      slugline: "INT. COMMAND SHUTTLE – NIGHT",
      intExt: "INT",
      dayNight: "NIGHT",
      timeOfDay: "Night",
      location: "Helios Sub-Orbital Bay",
      characters: ["Arun", "Priya", "Commander Sterling"],
      props: ["Flight Helmets", "Navigation Harness", "Emergency Beacon"],
      costumes: ["Flight Suits Type-4", "Gloves"],
      vfx: "Thruster Plume Through Transparisteel",
      sfx: "Cabin Depressurization Whistle",
      duration: "4:00",
      status: "Ready",
      pageCount: 3.25,
      storyObjective: "Tense launch sequence with cockpit telemetry monitoring.",
    },
    {
      id: "sc_06",
      sceneNumber: "06",
      slugline: "INT. ARCHIVE VAULT – NIGHT",
      intExt: "INT",
      dayNight: "NIGHT",
      timeOfDay: "Night",
      location: "Sub-level 4 Crypt",
      characters: ["Dr. Vikram"],
      props: ["Encrypted Drive", "Flashlight", "Security Badge"],
      costumes: ["Trenchcoat", "Black Gloves"],
      vfx: "Holographic Interface",
      sfx: "Heavy Hydraulic Door Seal",
      duration: "2:50",
      status: "Alert",
      pageCount: 2.0,
      storyObjective: "Dr. Vikram executes unauthorized download before communications go dark.",
    },
  ],
  audit: {
    shootReadiness: 91,
    criticalIssues: 2,
    warnings: 5,
    completed: 42,
    pending: 8,
    breakdown: [
      { category: "Script & Scenes", score: 98, status: "Ready", completed: 24, total: 24 },
      { category: "Characters & Cast", score: 92, status: "Ready", completed: 6, total: 6 },
      { category: "Locations & Permits", score: 78, status: "Warning", completed: 6, total: 8 },
      { category: "Props & Continuity", score: 95, status: "Ready", completed: 11, total: 12 },
      { category: "Camera & Shot List", score: 88, status: "Ready", completed: 32, total: 36 },
      { category: "Storyboard & Previs", score: 74, status: "Warning", completed: 28, total: 36 },
      { category: "Schedule & Stripboard", score: 85, status: "Ready", completed: 12, total: 14 },
      { category: "Budget & Contracts", score: 94, status: "Ready", completed: 18, total: 19 },
    ],
    issues: [
      { id: "iss_1", severity: "CRITICAL", title: "Scene 15 has no approved location permit", affected: "Locations, Schedule, Legal" },
      { id: "iss_2", severity: "CRITICAL", title: "Lead Actor Agreement missing rider signature", affected: "Cast, Budget, Insurance" },
      { id: "iss_3", severity: "WARNING", title: "Shot 12.04 has no approved storyboard graphic", affected: "Previs, Camera Dept" },
      { id: "iss_4", severity: "WARNING", title: "Scene 06 Vault hydraulic door rental return overlap", affected: "Props, Budget" },
      { id: "iss_5", severity: "WARNING", title: "Costume continuity mismatch flagged between Scene 12 and 15", affected: "Wardrobe, Continuity" },
    ]
  }
};

// 1. Script Upload & Analysis APIs
app.post("/api/scripts/upload", (req, res) => {
  const { fileName = "The_Last_Horizon_Shooting_Draft_v2.4.pdf", fileSize = "2.4 MB" } = req.body || {};
  res.json({
    success: true,
    fileId: "doc_script_01",
    fileName,
    fileSize,
    pageCount: 114,
    status: "Uploaded & Validated",
    message: "Screenplay PDF uploaded and validated successfully."
  });
});

app.post("/api/scripts/analyze", async (req, res) => {
  const { scriptText, scriptId } = req.body || {};
  try {
    const ai = getGeminiClient();
    if (ai && scriptText) {
      const prompt = `Analyze this screenplay excerpt for pre-production breakdown:
${scriptText.slice(0, 3000)}
Return a JSON object with:
{
  "scenesDetected": 24,
  "characters": ["Arun", "Priya", "Dr. Vikram"],
  "locations": ["Apartment", "Lab", "Archive Rooftop"],
  "props": ["Laptop", "Coffee Mug", "Particle Scanner"],
  "costumes": ["Casual Shirt", "Lab Coat"],
  "vfx": ["Particle Glow"],
  "sfx": ["Door Knock", "Traffic"]
}`;
      const { text } = await callGeminiWithResilience(ai, prompt, { responseMimeType: "application/json" });
      const parsed = JSON.parse(cleanJsonText(text));
      return res.json({ success: true, source: "gemini", data: parsed });
    }
  } catch (err: any) {
    console.warn("[Script Analyze Notice]", err?.message);
  }

  res.json({
    success: true,
    source: "simulation",
    data: {
      scenesDetected: 24,
      characters: ["Arun (Protagonist)", "Priya (Co-Lead)", "Dr. Vikram (Mentor)", "Commander Sterling", "Officer Roy", "Maya"],
      locations: ["INT. APARTMENT", "EXT. CITY STREETS", "INT. UNIVERSITY LAB", "EXT. ROOFTOP ARCHIVE", "INT. COMMAND SHUTTLE", "INT. ARCHIVE VAULT"],
      props: ["Hero Laptop", "Quantum Specimen Jar", "Particle Scanner", "Satellite Phone", "Flight Helmets"],
      costumes: ["Arun Look 1 (Blue Linen)", "Priya Field Outfit", "Dr. Vikram Lab Attire", "Flight Suits Type-4"],
      vehicles: ["Metro Transit Van", "Sub-orbital Helios-7"],
      vfx: ["Digital Screen Hologram", "Particle Resonance Glow", "Atmospheric Mirage"],
      sfx: ["Door Knock", "Depressurization Whistle", "Sub-bass Ambient Drone"]
    }
  });
});

// 2. Scenes CRUD APIs
app.get("/api/scenes", (req, res) => {
  res.json({ success: true, scenes: PRE_PROD_STORE.scenes });
});

app.get("/api/scenes/:id", (req, res) => {
  const scene = PRE_PROD_STORE.scenes.find((s) => s.id === req.params.id || s.sceneNumber === req.params.id);
  if (!scene) {
    return res.status(404).json({ success: false, message: "Scene not found" });
  }
  res.json({ success: true, scene });
});

app.post("/api/scenes", (req, res) => {
  const newScene = {
    id: `sc_${Date.now()}`,
    sceneNumber: req.body.sceneNumber || `0${PRE_PROD_STORE.scenes.length + 1}`,
    slugline: req.body.slugline || "INT. UNTITLED – DAY",
    intExt: req.body.intExt || "INT",
    dayNight: req.body.dayNight || "DAY",
    timeOfDay: req.body.timeOfDay || "Morning",
    location: req.body.location || "Soundstage",
    characters: req.body.characters || [],
    props: req.body.props || [],
    costumes: req.body.costumes || [],
    vfx: req.body.vfx || "None",
    sfx: req.body.sfx || "Room Tone",
    duration: req.body.duration || "2:00",
    status: "Ready",
    pageCount: req.body.pageCount || 1.0,
    storyObjective: req.body.storyObjective || "New scene narrative objective.",
  };
  PRE_PROD_STORE.scenes.push(newScene);
  res.status(201).json({ success: true, scene: newScene });
});

app.put("/api/scenes/:id", (req, res) => {
  const idx = PRE_PROD_STORE.scenes.findIndex((s) => s.id === req.params.id || s.sceneNumber === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Scene not found" });
  }
  PRE_PROD_STORE.scenes[idx] = { ...PRE_PROD_STORE.scenes[idx], ...req.body };
  res.json({ success: true, scene: PRE_PROD_STORE.scenes[idx] });
});

app.delete("/api/scenes/:id", (req, res) => {
  const idx = PRE_PROD_STORE.scenes.findIndex((s) => s.id === req.params.id || s.sceneNumber === req.params.id);
  if (idx === -1) {
    return res.status(404).json({ success: false, message: "Scene not found" });
  }
  const removed = PRE_PROD_STORE.scenes.splice(idx, 1);
  res.json({ success: true, removed: removed[0] });
});

// 3. Scene Breakdown & Deep Analysis
app.post("/api/scenes/:id/analyze", async (req, res) => {
  const scene = PRE_PROD_STORE.scenes.find((s) => s.id === req.params.id || s.sceneNumber === req.params.id);
  const sceneDesc = scene ? `${scene.sceneNumber}: ${scene.slugline}` : req.params.id;

  try {
    const ai = getGeminiClient();
    if (ai) {
      const prompt = `As an expert film 1st AD and Director, analyze scene ${sceneDesc}.
Provide production insights for cinematography, sound, lighting, props, and on-set risks.
Respond in JSON:
{
  "dramaticCore": "...",
  "recommendedCoverage": ["Wide Master (24mm)", "Over-the-shoulder (50mm)", "Emotional Close-up (85mm)"],
  "lightingSetup": "Soft diffused morning sidelight with 3200K tungsten kicker.",
  "soundNotes": "Record clean wild track of door latch and room tone.",
  "continuityAlert": "Check coffee mug liquid level across angles."
}`;
      const { text } = await callGeminiWithResilience(ai, prompt, { responseMimeType: "application/json" });
      return res.json({ success: true, source: "gemini", analysis: JSON.parse(cleanJsonText(text)) });
    }
  } catch (err: any) {
    console.warn("[Scene Analyze Notice]", err?.message);
  }

  res.json({
    success: true,
    source: "simulation",
    analysis: {
      dramaticCore: "The scene establishes Arun's vulnerability before external stakes escalate.",
      recommendedCoverage: [
        "1.1 Wide Master (24mm) to ground the cramped environment",
        "1.2 Medium Profile (35mm) on desk work",
        "1.3 Tight Close-up (85mm) tracking eye movement on eviction notice",
        "1.4 Over-the-shoulder (50mm) on Priya entrance"
      ],
      lightingSetup: "Low-key cool morning daylight through blinds with warm desk lamp accent.",
      soundNotes: "Keep street ambience muted to heighten claustrophobia until knock breaks concentration.",
      continuityAlert: "Laptop screen timecode must stay consistent between wide master and over-the-shoulder."
    }
  });
});

// 4. Change Impact Engine API
app.post("/api/change-impact/evaluate", async (req, res) => {
  const { sceneId = "01", changeField = "location", previousValue = "Apartment", newValue = "College Lab" } = req.body || {};

  const impactData = {
    title: `Scene ${sceneId}: Location modified from ${previousValue} to ${newValue}`,
    itemsAffectedCount: 7,
    affectedItems: [
      { module: "Schedule", severity: "WARNING", statusText: "Requires moving shoot day from Day 1 to Day 3 batch." },
      { module: "Budget", severity: "WARNING", statusText: "Location permit delta: +₹15,000 for university lab access." },
      { module: "Transport", severity: "WARNING", statusText: "Crew transit vehicle re-routed to North Campus." },
      { module: "Production Design", severity: "WARNING", statusText: "Set dressing must swap residential furniture for lab glassware." },
      { module: "Storyboard", severity: "WARNING", statusText: "Shots 1.1 and 1.2 background plates need redraw." },
      { module: "Equipment", severity: "WARNING", statusText: "Requires additional 1.2kW HMI for high ceiling lighting." },
      { module: "Permissions", severity: "WARNING", statusText: "University Dean clearance document pending approval." }
    ],
    recommendation: "Approved with batch grouping: Schedule Scene 01 alongside Scene 03 at the College Lab to save ₹45,000 in transit costs.",
    confidence: 0.94
  };

  res.json({ success: true, impact: impactData });
});

// 5. Shot List AI Generator
app.post("/api/shots/generate", async (req, res) => {
  const { sceneNumber = "01", style = "Fincher Precision" } = req.body || {};

  const generatedShots = [
    {
      shotNumber: `${sceneNumber}.1`,
      type: "Wide Master",
      lens: "24mm Ultra Prime",
      movement: "Slow Push-in",
      duration: "6s",
      purpose: "Establish isolation and oppressive spatial geometry.",
      confidence: 0.96
    },
    {
      shotNumber: `${sceneNumber}.2`,
      type: "Medium Two-Shot",
      lens: "35mm Prime",
      movement: "Static",
      duration: "5s",
      purpose: "Capture dialogue tension and physical distance between characters.",
      confidence: 0.93
    },
    {
      shotNumber: `${sceneNumber}.3`,
      type: "Close Up",
      lens: "85mm Macro",
      movement: "Handheld Subtle Drift",
      duration: "4s",
      purpose: "Accentuate emotional tremor and micro-expressions.",
      confidence: 0.95
    }
  ];

  res.json({ success: true, shots: generatedShots });
});

// 6. Storyboard Generator API
app.post("/api/storyboards/generate", async (req, res) => {
  const { sceneNumber = "01", shotNumber = "1.1", prompt } = req.body || {};
  res.json({
    success: true,
    storyboard: {
      id: `sb_${Date.now()}`,
      sceneNumber,
      shotNumber,
      imageUrl: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
      prompt: prompt || `Cinematic film still, Scene ${sceneNumber} Shot ${shotNumber}, anamorphic, atmospheric lighting`,
      status: "Generated",
      version: 1,
      confidence: 0.92
    }
  });
});

// 7. Schedule Optimization API
app.post("/api/schedule/optimize", (req, res) => {
  res.json({
    success: true,
    daysSaved: 1.5,
    optimizedDays: [
      {
        dayNumber: 1,
        location: "Downtown Lab Complex",
        scenes: ["01", "03", "04"],
        estimatedHours: 9.5,
        costSavingsINR: 35000,
        notes: "Consolidated all interior laboratory & apartment dialogue to eliminate company move."
      },
      {
        dayNumber: 2,
        location: "Helios Sub-Orbital Soundstage",
        scenes: ["05", "06"],
        estimatedHours: 10.0,
        costSavingsINR: 20000,
        notes: "Rigged high-power lighting and atmospheric haze once for full day coverage."
      }
    ]
  });
});

// 8. Budget Analysis API
app.post("/api/budget/analyze", (req, res) => {
  res.json({
    success: true,
    totalBudgetINR: 2500000,
    plannedINR: 1800000,
    spentINR: 1250000,
    remainingINR: 550000,
    savingsOpportunities: [
      { category: "Equipment", suggestion: "Package Sony FX3 and prime lenses on weekly 5-day rental rate", potentialSavingsINR: 32000 },
      { category: "Locations", suggestion: "Negotiate bundled weekend permit for university science building", potentialSavingsINR: 25000 }
    ]
  });
});

// 9. Continuity Check API
app.post("/api/continuity/check", (req, res) => {
  res.json({
    success: true,
    mismatchesFound: 1,
    alerts: [
      {
        sceneA: "Scene 12",
        sceneB: "Scene 15",
        element: "Costume / Wardrobe",
        issue: "Arun wears 'Casual Blue Linen' in Scene 12, but script notes indicate 'Red Technical Parka' in Scene 15 without changing beat.",
        recommendation: "Add scripted transition or maintain Blue Linen under layer."
      }
    ]
  });
});

// 10. Pre-Production AI Audit API
app.post("/api/project/audit", (req, res) => {
  res.json({
    success: true,
    audit: PRE_PROD_STORE.audit
  });
});

// Context-Aware Assistant Endpoint
app.post("/api/gemini/assist", async (req, res) => {
  const { message, context, role = "Director AI", project } = req.body;
  try {
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        reply: getIntelligentFallbackAssist(message, role, context, project),
        source: "local-simulation",
      });
    }

    const systemPrompt = `You are ${role} in "Director's Thought", an AI Filmmaking Decision Intelligence Platform.
Tagline: "Turn your thought into a film."
You are an expert filmmaker, dramaturg, and production strategist.
Current Project: ${project?.name || "The Last Light"} (${project?.genre || "Sci-Fi / Drama"}).
Active Module: ${context?.module || "Dashboard"}.
Current Selected Scene / Element: ${JSON.stringify(context?.selection || {})}.
Give sharp, concise, professional filmmaking advice focusing on trade-offs between creative vision, narrative structure, screenplay continuity, budget, schedule, and on-set risk. Be decisive and respectful of director/writer ownership.`;

    const { text, model } = await callGeminiWithResilience(ai, message, {
      systemInstruction: systemPrompt,
      temperature: 0.7,
    });

    res.json({
      reply: text || "Decision intelligence recommendation generated.",
      source: "gemini",
      modelUsed: model,
    });
  } catch (error: any) {
    console.warn("[Gemini API Notice] Upstream model unavailable, providing decision intelligence fallback:", error?.message);
    res.json({
      reply: getIntelligentFallbackAssist(message, role, context, project),
      source: "local-simulation",
    });
  }
});

// Dedicated Director's Idea Development & Discussion Endpoint
app.post("/api/gemini/idea-develop", async (req, res) => {
  const { idea, mode = "develop", attachments = {}, project } = req.body;

  const fallback = {
    logline: idea.length > 30 ? `A high-stakes exploration of: ${idea}` : "When a hidden truth surfaces within an isolated setting, an unlikely protagonist must sacrifice their greatest certainty to prevent an irreversible tragedy.",
    theme: "Truth vs. Preservation of Sanity",
    protagonist: {
      name: attachments?.characters?.[0] || "The Protagonist",
      want: "To maintain control and expose the buried truth before time runs out.",
      need: "To confront personal complicity and accept vulnerability.",
      flaw: "Paralyzing secrecy and obsessive hyper-vigilance.",
    },
    conflict: {
      obstacle: "A ticking clock where every institutional safeguard turns against the protagonist.",
      antagonist: "An unyielding authority figure convinced their extreme measures are righteous.",
      stakes: "Complete psychological collapse and permanent loss of freedom.",
    },
    visualComps: ["Sicario (tension & pacing)", "Arrival (thematic gravity)", "The Insider (moral pressure)"],
    directorQuestions: [
      "What is the single visual image you want the audience to remember from the final shot?",
      "What is the lie the protagonist believes about themselves at minute 10 that breaks at minute 75?",
      "Why is this story cinematic rather than a novel or stage play — what can ONLY be shown with camera and sound?",
    ],
  };

  try {
    const ai = getGeminiClient();

    let modePrompt = "";
    if (mode === "challenge") {
      modePrompt = `You are a tough, respectful master film director challenging this raw idea. Critique potential cliches, plot holes, passive protagonists, and low stakes. Point out what would make an audience look away or lose engagement, and suggest how to elevate it to prestige cinema.`;
    } else if (mode === "possibilities") {
      modePrompt = `You are a visionary film director and story architect. Provide 3 distinct, thrilling story possibilities and narrative trajectories for this premise (Option A: Character Tragedy / Neo-Noir; Option B: High-Concept Psychological Thriller; Option C: Visceral Moral Parable).`;
    } else if (mode === "questions") {
      modePrompt = `You are an inquisitive auteur director. Ask 4 deep, probing questions about character psychology, visual metaphor, world texture, and dramatic irony that will force the creator to make radical directorial choices.`;
    } else {
      modePrompt = `You are "Director's Thought" AI, a premier filmmaking partner. Help the director develop this raw thought into a cinematic premise with a compelling logline, dynamic character engine (want vs need), central antagonistic conflict, visual comps, and key director questions.`;
    }

    const systemPrompt = `You are "Director's Thought" AI Film Development Studio partner.
Tagline: "Turn your thought into a film."
Respond as an insightful, highly literate filmmaker and dramaturg.
Format your answer with clear cinematic headings:
1. PITCH & LOGLINE REFINEMENT
2. PROTAGONIST ENGINE (Want vs Need, Internal Flaw)
3. CENTRAL CONFLICT & DRAMATIC STAKES
4. CINEMATIC TONE & VISUAL REFERENCES
5. THE DIRECTOR'S CHALLENGE (3 provocative questions to shape the vision)

Raw Idea: "${idea}"
Attached Elements: ${JSON.stringify(attachments)}
${modePrompt}`;

    if (!ai) {
      return res.json({
        analysis: `### PITCH & LOGLINE REFINEMENT\n**Logline:** ${fallback.logline}\n\n### PROTAGONIST ENGINE\n* **Protagonist:** ${fallback.protagonist.name}\n* **External Want:** ${fallback.protagonist.want}\n* **Internal Need:** ${fallback.protagonist.need}\n* **Flaw:** ${fallback.protagonist.flaw}\n\n### CENTRAL CONFLICT & DRAMATIC STAKES\n* **Primary Obstacle:** ${fallback.conflict.obstacle}\n* **Antagonistic Force:** ${fallback.conflict.antagonist}\n* **Stakes:** ${fallback.conflict.stakes}\n\n### CINEMATIC TONE & VISUAL REFERENCES\n* **Cinematography Comps:** ${fallback.visualComps.join(", ")}\n* **Aspect Ratio:** 2.39:1 Anamorphic, low-key lighting with deliberate negative space.\n\n### THE DIRECTOR'S CHALLENGE\n${fallback.directorQuestions.map((q, i) => `${i + 1}. *${q}*`).join("\n")}`,
        structured: fallback,
        source: "local-simulation",
      });
    }

    const { text, model } = await callGeminiWithResilience(ai, systemPrompt, {
      temperature: 0.7,
    });

    res.json({
      analysis: text,
      structured: fallback,
      source: "gemini",
      modelUsed: model,
    });
  } catch (error: any) {
    console.warn("[Gemini API Notice] Idea development falling back to local simulation:", error?.message);
    res.json({
      analysis: `### PITCH & LOGLINE REFINEMENT\n**Logline:** ${fallback.logline}\n\n### PROTAGONIST ENGINE\n* **Protagonist:** ${fallback.protagonist.name}\n* **External Want:** ${fallback.protagonist.want}\n* **Internal Need:** ${fallback.protagonist.need}\n\n### CENTRAL CONFLICT & DRAMATIC STAKES\n* **Stakes:** ${fallback.conflict.stakes}\n\n### THE DIRECTOR'S CHALLENGE\n${fallback.directorQuestions.map((q, i) => `${i + 1}. *${q}*`).join("\n")}`,
      structured: fallback,
      source: "local-simulation",
    });
  }
});

// Dedicated AI Chatbot for Idea Discussion & Development with Multi-Language NLP
app.post("/api/gemini/discussion-chat", async (req, res) => {
  const {
    messages = [],
    filmIdea = "A young filmmaker tries to complete his first movie despite problems with his team.",
    mode = "collaborator",
    project,
  } = req.body;

  const lastUserMessage = [...messages].reverse().find((m: any) => m.role === "user")?.content || "";

  // Short, punchy, friend-like discussion fallback (NO essays or unnecessary content)
  const generateDiscussionFallback = (query: string, idea: string, currentMode: string) => {
    const q = query.toLowerCase();

    // Check for Tamil Script
    const isTamilScript = /[\u0B80-\u0BFF]/.test(query);
    // Check for Malayalam Script
    const isMalayalamScript = /[\u0D00-\u0D7F]/.test(query);
    // Check for Kannada Script
    const isKannadaScript = /[\u0C80-\u0CFF]/.test(query);
    // Check for Hindi Script
    const isHindiScript = /[\u0900-\u097F]/.test(query);

    // Check for Tanglish / Roman Tamil cues
    const isTanglish =
      /\b(bro|machan|nanba|padam|enna|epdi|panlam|pannalaam|sanda|aana|kooda|illa|thambi|panna|solla|scene-la|climax-la|romba|semma|super-ah|paathu|kadhai)\b/i.test(
        q
      );

    // Check for Manglish / Roman Malayalam cues
    const isManglish = /\b(machane|chetta|aliyan|engane|cheyyam|nalla|katha|padam|scene-il|parippadi)\b/i.test(q);

    // Check for Kanglish / Roman Kannada cues
    const isKanglish = /\b(guru|maga|hege|beku|madodu|hegide|katha|cinema|scene-alli)\b/i.test(q);

    // 1. TAMIL SCRIPT (Short friend chat)
    if (isTamilScript) {
      return `செம ஐடியா நண்பா! சீனியர் கேமராமேன் இளம் இயக்குநரை மதிக்காம செட்ல எல்லார் முன்னாடியும் சொந்த முடிவெடுத்தா நல்ல டென்ஷன் வரும். இதை ஒரு கோல்டன் ஹவர் ஷூட்ல வைக்கலாமா? நீ என்ன சொல்ற?`;
    }

    // 2. TANGLISH (Short friend chat)
    if (isTanglish) {
      return `Semma thought bro! Senior DP rookie director-oda shot-a crew munnaadiye reject panna tension peaks aagum. Sunset aaga innum 10 mins dhaan irukku nu oru clock vekkalaama bro?`;
    }

    // 3. MALAYALAM SCRIPT (Short friend chat)
    if (isMalayalamScript) {
      return `കിടു ഐഡിയ മച്ചാനേ! സീനിയർ ക്യാമറാമാൻ സംവിധായകന്റെ ഷോട്ട് പരസ്യമായി എതിർക്കുമ്പോൾ ലൊക്കേഷനിൽ നല്ല ടെൻഷൻ വരും. ഒരു നൈറ്റ് ഷൂട്ടിൽ ഇത് വെച്ചാലോ? എന്ത് പറയുന്നു?`;
    }

    // 4. MANGLISH (Short friend chat)
    if (isManglish) {
      return `Kidu idea machane! Senior cinematographer rookie directorkk full freedom kodukkatha pole scene vechaal crew motham tension aakum. Next shot engane plan cheyyam bro?`;
    }

    // 5. KANNADA SCRIPT (Short friend chat)
    if (isKannadaScript) {
      return `ಸಕ್ಕತ್ ಐಡಿಯಾ ಗೆಳೆಯಾ! ಸೀನಿಯರ್ ಕ್ಯಾಮೆರಾಮನ್ ಯುವ ನಿರ್ದೇಶಕನ ವಿಷನ್ ಅನ್ನು ನಂಬದೇ ಸೆಟ್‌ನಲ್ಲಿ ವಿರೋಧಿಸಿದರೆ ಸೀನ್ ತುಂಬಾ ರಿಯಲಿಸ್ಟಿಕ್ ಆಗಿ ಬರುತ್ತೆ. ಏನಂತೀರಾ?`;
    }

    // 6. KANGLISH (Short friend chat)
    if (isKanglish) {
      return `Sakkath point guru! Senior DP rookie director shot-ge oppose mado thara scene itre tension peaks aagiruthe. Ee scene-alli next twist en madona?`;
    }

    // 7. HINDI / HINGLISH (Short friend chat)
    if (isHindiScript || /\b(bhai|yaar|kya|hoga|kaise|karein|tension|kahani)\b/i.test(q)) {
      return `मस्त आइडिया है भाई! सोच अगर सीनियर कैमरामैन ढलती रोशनी में डायरेक्टर का शॉट लेने से मना कर दे, तो पूरा सेट हिल जाएगा। क्या लगता है तुझे?`;
    }

    // 8. DEFAULT ENGLISH (Short friend chat)
    return `Love that direction, bro. What if the veteran DP deliberately challenges the rookie director's shot right as the light is dying? That puts the whole crew on edge instantly. What do you think?`;
  };

  try {
    const ai = getGeminiClient();

    const systemPrompt = `You are a close filmmaker friend having a SHORT, NATURAL, and CASUAL chat over coffee/tea.
The user is discussing their film idea: "${filmIdea}".

STRICT CONVERSATIONAL DIRECTIVES:
1. **BE EXTREMELY BRIEF & CRISP**: Speak in 2 to 3 short, punchy sentences (maximum 40 words).
2. **SPEAK LIKE A REAL FRIEND**: Be warm, casual, and friendly (use "bro", "machan", etc. naturally). Never sound like an AI assistant or a textbook.
3. **NO UNNECESSARY CONTENT**:
   - NO numbered lists (1, 2, 3).
   - NO bullet points or long essays.
   - NO lectures, disclaimers, or formal greetings.
4. **DIRECT CREATIVE SUGGESTION**: Give ONE quick, exciting filmmaking thought and ask ONE quick conversational question back to keep the flow moving.
5. **MIRROR LANGUAGE & DIALECT**:
   - If user chats in Tanglish (e.g., "Bro epdi panlaam"), reply in short, natural Tanglish!
   - If Tamil script, reply in short Tamil.
   - If Malayalam or Manglish, reply in short Malayalam/Manglish.
   - If Kannada or Kanglish, reply in short Kannada/Kanglish.
   - If Hindi or Hinglish, reply in short Hindi/Hinglish.
   - If English, reply in short, natural filmmaker English.`;

    if (!ai) {
      return res.json({
        reply: generateDiscussionFallback(lastUserMessage, filmIdea, mode),
        source: "local-simulation",
        mode,
      });
    }

    // Build conversation context
    const conversationTranscript = messages
      .slice(-8)
      .map((m: any) => `${m.role === "user" ? "Filmmaker" : "AI Collaborator"}: ${m.content}`)
      .join("\n\n");

    const promptWithHistory = `CONVERSATION SO FAR:
${conversationTranscript}

Filmmaker's latest input: "${lastUserMessage}"

Remember: Match the filmmaker's language, dialect, and script (Tamil, Tanglish, Malayalam, Manglish, Kannada, Kanglish, Hindi, Hinglish, English, etc.) with a warm, friendly, enthusiastic peer tone! Respond now:`;

    const { text, model } = await callGeminiWithResilience(ai, promptWithHistory, {
      systemInstruction: systemPrompt,
      temperature: 0.75,
    });

    res.json({
      reply: text || generateDiscussionFallback(lastUserMessage, filmIdea, mode),
      source: "gemini",
      modelUsed: model,
      mode,
    });
  } catch (error: any) {
    console.warn("[Gemini API Notice] Discussion chat falling back to local simulation:", error?.message);
    res.json({
      reply: generateDiscussionFallback(lastUserMessage, filmIdea, mode),
      source: "local-simulation",
      mode,
    });
  }
});

// Dedicated Director's Story Document Analyzer Endpoint
app.post("/api/gemini/story-analyze", async (req, res) => {
  const { storyContent = "", fileName = "Story_Document.pdf", project } = req.body;

  const titleInferred = fileName.replace(/\.[^/.]+$/, "").replace(/[_-]/g, " ") || "The Horizon Paradox";

  const fallbackAnalysis = {
    title: titleInferred,
    genre: "Psychological Thriller / Drama",
    logline: "When an estranged investigator is summoned to an isolated alpine relay station, they unearth an encrypted signal that foretells an imminent catastrophe orchestrated by their own mentor.",
    mainCharacter: {
      name: "Marcus Vance",
      archetype: "Obsessive Investigator",
      want: "To uncover the origin of the rogue distress frequency.",
      need: "To confront his past complicity and accept that some truths demand sacrifice.",
      flaw: "Paralyzing hyper-vigilance and mistrust of all institutional authority.",
    },
    supportingCharacters: [
      { name: "Dr. Elena Rossi", role: "Chief Station Engineer", dynamic: "Wary ally harboring classified telemetry records" },
      { name: "Director Sterling", role: "Bureau Supervisor", dynamic: "Mentor turned calculating institutional antagonist" },
      { name: "Kaelen", role: "Rogue Technician", dynamic: "The missing catalyst whose disappearance triggers the investigation" },
    ],
    centralConflict: "Duty to the institutional command structure vs. Moral responsibility to avert an orchestrated catastrophe.",
    setting: "An isolated decommissioned mountaintop radar observatory during a severe winter whiteout.",
    theme: "The cost of silence in the face of systemic corruption; Truth as a corrosive weapon.",
    beginning: "Marcus arrives at Station 9 during an emergency blackout. An anomalous radio loop repeats every 47 minutes containing voices from the future.",
    middle: "Marcus and Elena restore auxiliary power only to discover Director Sterling's authorization codes on the sabotage module. The station is sealed from the outside.",
    ending: "In a high-tension climax on the frozen transmitter tower, Marcus must broadcast the unredacted truth to the global network before Sterling's tactical sweep team breaches the perimeter.",
    readinessScore: 92,
    pacingNotes: "Strong narrative thrust with a distinct three-act architecture. High cinematic potential with atmospheric visual containment.",
  };

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        analysis: fallbackAnalysis,
        source: "local-simulation",
      });
    }

    const systemPrompt = `You are a master film dramaturg and studio development executive for "Director's Thought".
Tagline: "Your story stays yours. AI helps you develop it."
Analyze the following story text or treatment excerpt:
"${storyContent.slice(0, 6000)}"

Respond in pure valid JSON (no markdown fences, just JSON) with this exact schema:
{
  "title": string,
  "genre": string,
  "logline": string,
  "mainCharacter": {
    "name": string,
    "archetype": string,
    "want": string,
    "need": string,
    "flaw": string
  },
  "supportingCharacters": [
    { "name": string, "role": string, "dynamic": string }
  ],
  "centralConflict": string,
  "setting": string,
  "theme": string,
  "beginning": string,
  "middle": string,
  "ending": string,
  "readinessScore": number (1-100),
  "pacingNotes": string
}`;

    const { text } = await callGeminiWithResilience(ai, systemPrompt, {
      temperature: 0.3,
      responseMimeType: "application/json",
    });

    try {
      const parsed = JSON.parse(text);
      res.json({
        analysis: { ...fallbackAnalysis, ...parsed },
        source: "gemini",
      });
    } catch {
      res.json({
        analysis: fallbackAnalysis,
        source: "local-simulation",
      });
    }
  } catch (error: any) {
    console.warn("[Gemini API Notice] Story analysis fallback:", error?.message);
    res.json({
      analysis: fallbackAnalysis,
      source: "local-simulation",
    });
  }
});

// Dedicated Director's Story Companion / Writing Assistant Endpoint
app.post("/api/gemini/story-companion", async (req, res) => {
  const { storyText = "", storyTitle = "Untitled Story", action = "analyze", customPrompt = "", project } = req.body;

  let promptFocus = "";
  let suggestionType = "recommendation";

  switch (action) {
    case "conflict":
      promptFocus = "Identify the central dramatic conflict. Show where the stakes are weak, and suggest how to escalate the opposition between protagonist want and antagonistic obstacle.";
      suggestionType = "dramatic_conflict";
      break;
    case "characters":
      promptFocus = "Identify all characters introduced so far. Highlight missing flaws, conflicting motivations, and relational friction between them.";
      suggestionType = "character_dynamics";
      break;
    case "gaps":
      promptFocus = "Identify story gaps, unanswered questions, leaps in logic, or scenes where cause-and-effect causality breaks down.";
      suggestionType = "story_gaps";
      break;
    case "pacing":
      promptFocus = "Analyze the story's pacing. Where does the narrative drag? Where are reveals rushed? Suggest specific beats to accelerate or let breathe.";
      suggestionType = "pacing_rhythm";
      break;
    case "possibilities":
      promptFocus = "Suggest 3 cinematic story possibilities, unexpected plot reversals, or dramatic turning points for what happens next.";
      suggestionType = "narrative_possibilities";
      break;
    case "ask":
      promptFocus = `Director's Query: "${customPrompt}". Answer with deep cinematic insight, respecting the director's creative ownership.`;
      suggestionType = "director_inquiry";
      break;
    default:
      promptFocus = "Perform a holistic dramaturgical analysis: character engine, thematic core, act transitions, and visual cinema potential.";
      suggestionType = "holistic_analysis";
      break;
  }

  const fallbackSuggestions = {
    conflict: {
      headline: "Escalate the Antagonistic Pressure in Scene 2",
      body: "The protagonist is currently reacting to circumstances rather than driving the dramatic action. Give the antagonist an active move that forces the protagonist to make a costly choice with immediate physical or moral consequences.",
      textToApply: "\n\n// DIRECTION NOTE: At this turning point, the antagonist closes the safe exit, forcing the protagonist to choose between public exposure and personal safety.",
    },
    characters: {
      headline: "Deepen Secondary Character Friction",
      body: "Elena currently serves purely as an exposition vessel. Give her an unvoiced private agenda—she needs the frequency silenced for reasons that directly counter Marcus's investigation.",
      textToApply: "\n\n// CHARACTER BEAT: Elena shields the terminal screen as Marcus approaches, signaling that her loyalty to the truth has a strict personal boundary.",
    },
    gaps: {
      headline: "Establish the Clock & Environmental Rule",
      body: "Why can't the characters simply walk out or wait for daylight? Clarify the external ticking clock (e.g. the cold front collapsing the antenna array in 3 hours).",
      textToApply: "\n\n// NARRATIVE RULE: Outside temperature drops past -35°C; the emergency generator fuel gauge flickers at 18%, giving them under 90 minutes before life support cuts out.",
    },
    pacing: {
      headline: "Insert a Silent Sensory Beat Before the Confrontation",
      body: "The transition from the discovery to the confrontation happens too abruptly. Let the camera linger on the physical environment—the sound of howling wind through steel cables—to build acoustic tension.",
      textToApply: "\n\nEXT. RADAR PLATFORM - CONTINUOUS\n\nThe wind shudders against the steel scaffolding. Frost crawls across the visor. Complete acoustic isolation except for the rhythmic click of the relay switch.",
    },
    possibilities: {
      headline: "Three Cinematic Trajectories for Act II",
      body: "1. The Reluctant Collusion: The mentor was trying to prevent a far worse military escalation.\n2. The False Signal: The transmission was recorded ten years ago by the protagonist's late father.\n3. The Solitary Reality: The other crew member is a psychological projection created by prolonged hypoxia.",
      textToApply: "\n\n// STORY TRAJECTORY: The transmission reveals that the station's automated defense protocols have locked onto an approaching rescue transport, mistaking it for a hostile craft.",
    },
    ask: {
      headline: "Director's Thought Dramaturgical Guidance",
      body: customPrompt ? `Regarding "${customPrompt}": Focus on what the audience visually experiences before dialogue is spoken. Let the camera behavior define character psychology.` : "Keep the visual perspective locked to the protagonist's limited knowledge to cultivate subjective tension.",
      textToApply: `\n\n// DIRECTOR NOTE on "${customPrompt || 'Cinematic Approach'}": Use tight 50mm framing on Marcus to convey claustrophobia, expanding to wide anamorphic compositions only when the scale of the conspiracy is revealed.`,
    },
    analyze: {
      headline: "Dramaturgical Analysis & Narrative Health",
      body: "Strong visceral atmosphere with clear stakes. The opening hook is arresting. Ensure the middle section maintains active choices rather than procedural investigation.",
      textToApply: "\n\n// STRUCTURAL MILESTONE: Act I Climax reached. Point of no return firmly established.",
    },
  };

  const selectedFallback = (fallbackSuggestions as any)[action] || fallbackSuggestions.analyze;

  try {
    const ai = getGeminiClient();
    if (!ai) {
      return res.json({
        action,
        suggestionType,
        headline: selectedFallback.headline,
        body: selectedFallback.body,
        textToApply: selectedFallback.textToApply,
        source: "local-simulation",
      });
    }

    const systemPrompt = `You are "Story Companion" in Director's Thought, an AI filmmaking partner.
Director's Creed: "Your story stays yours. AI helps you develop it. Never overwrite the director's writing."

Story Title: ${storyTitle}
Current Story Text:
"${storyText.slice(0, 4000)}"

Action Requested: ${action}
${promptFocus}

Respond in pure valid JSON (no markdown code blocks, just raw JSON) with this exact structure:
{
  "headline": string (punchy, professional director feedback title),
  "body": string (2-3 paragraphs of insightful, constructive film dramaturgy, pacing, or character insight),
  "textToApply": string (optional scene note, direction cue, or screenplay beat that the director can click "Apply" to insert into their draft without replacing their words)
}`;

    const { text } = await callGeminiWithResilience(ai, systemPrompt, {
      temperature: 0.7,
      responseMimeType: "application/json",
    });

    try {
      const parsed = JSON.parse(text);
      res.json({
        action,
        suggestionType,
        headline: parsed.headline || selectedFallback.headline,
        body: parsed.body || selectedFallback.body,
        textToApply: parsed.textToApply || selectedFallback.textToApply,
        source: "gemini",
      });
    } catch {
      res.json({
        action,
        suggestionType,
        headline: selectedFallback.headline,
        body: selectedFallback.body,
        textToApply: selectedFallback.textToApply,
        source: "local-simulation",
      });
    }
  } catch (error: any) {
    console.warn("[Gemini API Notice] Story companion fallback:", error?.message);
    res.json({
      action,
      suggestionType,
      headline: selectedFallback.headline,
      body: selectedFallback.body,
      textToApply: selectedFallback.textToApply,
      source: "local-simulation",
    });
  }
});

// What-If Simulation Engine
app.post("/api/gemini/whatif", async (req, res) => {
  const { query, project } = req.body;
  try {
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        query,
        ...getStructuredFallbackWhatIf(query, project),
        source: "local-simulation",
      });
    }

    const prompt = `Perform a comprehensive What-If decision simulation for the film "${project?.name || "The Last Light"}".
User Creative Decision Query: "${query}".

Analyze the consequences across all 8 dimensions:
1. Story Impact (what plot information disappears, relationships changed, setups/payoffs affected)
2. Structure Impact (structural beat affected, pacing changes)
3. Roadmap Impact (roadmap objectives affected, future scene dependencies)
4. Screenplay Impact (scenes needing rewrite, dialogue modifications)
5. Production Impact (cast, location, equipment, VFX, stunts)
6. Budget Impact (savings or cost additions in INR or local currency)
7. Schedule Impact (shooting days/hours saved or added)
8. Risk Impact (risk score change before vs after)

Return the response in strictly structured JSON matching this schema:
{
  "before": { "scenesCount": 46, "budget": "₹2.45 Cr", "durationDays": 28, "riskScore": 72 },
  "after": { "scenesCount": 45, "budget": "₹2.31 Cr", "durationDays": 27.2, "riskScore": 61 },
  "impact": {
    "story": { "summary": "...", "score": 8, "details": ["..."] },
    "structure": { "summary": "...", "beatsAffected": ["..."] },
    "roadmap": { "summary": "...", "itemsAffected": ["..."] },
    "screenplay": { "summary": "...", "scenesToRewrite": [28] },
    "production": { "summary": "...", "cast": "...", "location": "...", "equipment": "...", "vfx": "..." },
    "budget": { "diff": "-₹14 Lakhs", "details": "..." },
    "schedule": { "diff": "-0.8 Days", "details": "..." },
    "risk": { "diff": "72% -> 61%", "details": "..." }
  },
  "recommendation": "..."
}`;

    const { text, model } = await callGeminiWithResilience(ai, prompt, {
      responseMimeType: "application/json",
      temperature: 0.4,
    });

    const parsed = JSON.parse(cleanJsonText(text || "{}"));
    res.json({
      query,
      ...parsed,
      source: "gemini",
      modelUsed: model,
    });
  } catch (error: any) {
    console.warn("[Gemini API Notice] What-If simulator falling back to local simulation:", error?.message);
    res.json({
      query,
      ...getStructuredFallbackWhatIf(query, project),
      source: "local-simulation",
    });
  }
});

// Scene Writer adhering to Story Roadmap
app.post("/api/gemini/generate-scene", async (req, res) => {
  const { sceneNumber, roadmapItem, characters, instructions, previousScene } = req.body;
  try {
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        screenplayText: `SCENE ${sceneNumber}
INT. AUXILIARY OXYGEN VAULT - NIGHT

The low hum of cryogenic recirculators vibrates through the deck grating. Condensation drips into empty coolant reservoirs.

KABIR (52), unwashed thermal parka hung loose over bruised shoulders, meticulously resets a faulty pressure valve with a rusted torque wrench.

MAYA (26) steps through the airlock portal, holding a cracked military tablet displaying flashing red telemetry spikes.

MAYA
You said the valve seized on its own during the 2038 storm.

Kabir freezes. He doesn't look up, his fingers tightening on the wrench.

KABIR
Ancient history, Maya. We have three hours before the solar mirror hits the shadow line.

MAYA
(stepping closer, voice trembling with cold rage)
The log signature isn't an automated purge. It was manually overridden from your console. You vented Section 4 to save the battery banks. You vented mom's medical pod.

Silence drops like lead. Kabir slowly sets the wrench down.`,
        source: "local-simulation",
      });
    }

    const prompt = `Write Scene ${sceneNumber} for the screenplay.
Roadmap Item: ${JSON.stringify(roadmapItem)}
Characters present: ${JSON.stringify(characters)}
Writer Instructions: ${instructions || "Follow standard Hollywood screenplay format (slugline, action, character, parenthetical, dialogue)."}
Previous Scene Context: ${previousScene || "Scene 26 was exterior station maintenance."}

Ensure the scene strictly satisfies the roadmap objective while creating authentic cinematic subtext.`;

    const { text, model } = await callGeminiWithResilience(ai, prompt, {
      temperature: 0.7,
    });

    res.json({
      screenplayText: text,
      source: "gemini",
      modelUsed: model,
    });
  } catch (error: any) {
    console.warn("[Gemini API Notice] Scene generator falling back to local simulation:", error?.message);
    res.json({
      screenplayText: `SCENE ${sceneNumber}
INT. HELIOS-7 CONTROL DECK - NIGHT

A stark emergency beacon casts elongated amber shadows across the instrumentation consoles.

KABIR (52) stands by the primary pressure manifold. His hands tremble slightly as he inputs the terminal sequence.

MAYA (26) enters through the hatch, cold air swirling around her boots.

MAYA
The secondary power grid just tripped. Was that you?

KABIR
(without looking back)
We don't have the reserves to maintain life support in both modules.

MAYA
So you decided who lives without asking?

Kabir closes his eyes, bracing against the weight of the question.

KABIR
I did what a captain has to do.`,
      source: "local-simulation",
    });
  }
});

// Writer + AI Structure Discussion
app.post("/api/gemini/structure-discuss", async (req, res) => {
  const { beatName, currentPosition, proposedPosition, writerIntent } = req.body;
  try {
    const ai = getGeminiClient();

    if (!ai) {
      return res.json({
        analysis: `Keeping the ${beatName} at ${currentPosition} favors deep character setup, but risks early pacing lag in Act I. Moving to ${proposedPosition} quickens suspense by +18% while requiring 1 additional bridge scene.`,
        tradeoffs: {
          pacing: 12,
          character: -5,
          suspense: 18,
          production: "+1 scene",
        },
        source: "local-simulation",
      });
    }

    const prompt = `Analyze a story structure decision:
Beat Name: "${beatName}"
Current Position: "${currentPosition}"
Proposed Position: "${proposedPosition}"
Writer's Intent: "${writerIntent}"

Explain the trade-offs objectively as an AI filmmaking partner.
Provide estimated percentage changes for:
- Pacing (+/- %)
- Character depth (+/- %)
- Suspense/Tension (+/- %)
- Production impact (e.g. "+1 scene" or "-2 shooting days")

Respond in JSON format:
{
  "analysis": "...",
  "tradeoffs": {
    "pacing": 12,
    "character": -5,
    "suspense": 18,
    "production": "+1 scene"
  }
}`;

    const { text, model } = await callGeminiWithResilience(ai, prompt, {
      responseMimeType: "application/json",
      temperature: 0.5,
    });

    const parsed = JSON.parse(cleanJsonText(text || "{}"));
    res.json({
      ...parsed,
      source: "gemini",
      modelUsed: model,
    });
  } catch (error: any) {
    console.warn("[Gemini API Notice] Structure discussion falling back to local simulation:", error?.message);
    res.json({
      analysis: `Keeping ${beatName} at ${currentPosition} preserves character build-up, whereas repositioning to ${proposedPosition} accelerates narrative momentum with manageable script adjustments.`,
      tradeoffs: {
        pacing: 14,
        character: -4,
        suspense: 16,
        production: "+1 scene",
      },
      source: "local-simulation",
    });
  }
});

function getAvailablePort(port: number, maxPort = port + 25): Promise<number> {
  return new Promise((resolve, reject) => {
    const tryPort = (candidate: number) => {
      const tester = net.createServer();

      tester.once("error", (error: NodeJS.ErrnoException) => {
        if (error.code === "EADDRINUSE") {
          if (candidate >= maxPort) {
            reject(new Error(`No free port found between ${port} and ${maxPort}`));
            return;
          }
          tryPort(candidate + 1);
          return;
        }

        reject(error);
      });

      tester.once("listening", () => {
        tester.close(() => resolve(candidate));
      });

      tester.listen(candidate, "0.0.0.0");
    };

    tryPort(port);
  });
}

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: "0.0.0.0",
        port: DEFAULT_PORT,
        strictPort: false,
        hmr: false,
      },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  const requestedPort = Number(process.env.PORT) || DEFAULT_PORT;

  try {
    const portToUse = await getAvailablePort(requestedPort);
    process.env.PORT = String(portToUse);

    const server = app.listen(portToUse, "0.0.0.0", () => {
      console.log(`Director's Thought server running on http://localhost:${portToUse}`);
    });

    server.on("error", (error: NodeJS.ErrnoException) => {
      console.error("Failed to start server:", error);
      process.exit(1);
    });
  } catch (error) {
    console.error("Failed to find an available port:", error);
    process.exit(1);
  }
}

startServer();
