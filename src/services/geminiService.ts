import { Project, RoadmapItem, Character } from '../types';

export interface AssistRequest {
  message: string;
  context: {
    module: string;
    selection?: any;
  };
  role?: string;
  project?: Project;
}

export interface AssistResponse {
  reply: string;
  source: 'gemini' | 'local-simulation';
}

export async function askAIAssistant(req: AssistRequest): Promise<AssistResponse> {
  try {
    const res = await fetch('/api/gemini/assist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(req),
    });
    if (!res.ok) {
      throw new Error(`Server responded with ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Fallback to intelligent client assistant:', err);
    return {
      reply: `[${req.role || 'Director AI'} Intelligence]: Evaluated "${req.message}". Maintaining the core tension of ${req.project?.name || 'The Last Light'} requires safeguarding the emotional payoff in Scene 27 while actively mitigating the high-altitude weather and wire-rigging stunt risks. Consider testing this in the What-If Simulator before committing production budget.`,
      source: 'local-simulation',
    };
  }
}

export async function simulateWhatIf(query: string, project?: Project) {
  try {
    const res = await fetch('/api/gemini/whatif', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, project }),
    });
    if (!res.ok) {
      throw new Error(`What-if simulation error: ${res.status}`);
    }
    return await res.json();
  } catch (err) {
    console.warn('Fallback to local simulation:', err);
    const isScene27 = query.toLowerCase().includes('27');
    return {
      query,
      before: { scenesCount: 46, budget: '₹2.45 Cr', durationDays: 28, riskScore: 72 },
      after: { scenesCount: isScene27 ? 45 : 46, budget: isScene27 ? '₹2.31 Cr' : '₹2.38 Cr', durationDays: isScene27 ? 27.2 : 27.5, riskScore: isScene27 ? 61 : 65 },
      impact: {
        story: {
          summary: isScene27
            ? 'Emotional pivot shifts from external confrontation to internal guilt deduction.'
            : `Pacing and emotional arc adjusted cleanly for "${query}".`,
          score: 8,
          details: isScene27
            ? [
                'Removes explicit confession in vault; Maya deduces betrayal via logs.',
                'Visual foreshadowing reinforced in Scene 18 and Scene 31.',
              ]
            : ['Character conflict sharpened while preserving thematic core.'],
        },
        structure: {
          summary: 'Midpoint beat compressed, accelerating Act II escalation.',
          beatsAffected: ['Midpoint Revelation', 'All Hope Is Lost'],
        },
        roadmap: {
          summary: 'Roadmap objectives realigned with revised sequence flow.',
          itemsAffected: ['RM-27 (Oxygen Vault Confrontation)'],
        },
        screenplay: {
          summary: 'Connected scenes require minor dialogue adjustments.',
          scenesToRewrite: isScene27 ? [28, 31] : [14, 15],
        },
        production: {
          summary: isScene27
            ? 'Eliminates 1 soundstage set build and hydraulic door rig.'
            : 'Consolidates company moves and lighting turnaround.',
          cast: isScene27 ? 'Saves 1 working day for Lead Actor Kabir.' : 'Optimized actor call schedule.',
          location: isScene27 ? 'No auxiliary vault set build needed.' : 'Consolidated primary location shoot.',
          equipment: 'Reduces heavy crane rental.',
          vfx: 'Saves zero-g atmospheric dust compositing shots.',
        },
        budget: {
          diff: isScene27 ? '-₹14,00,000 (-5.7%)' : '-₹7,00,000 (-2.8%)',
          details: isScene27 ? 'Set construction ₹8.5L + camera package ₹2.5L + cast holding ₹3L.' : 'Equipment and location savings.',
        },
        schedule: {
          diff: isScene27 ? '-0.8 Days' : '-0.5 Days',
          details: 'Shooting schedule compressed with reduced turnaround lag.',
        },
        risk: {
          diff: isScene27 ? '72% → 61% (-11%)' : '72% → 65% (-7%)',
          details: 'Removes high-risk pressurized hydraulic door rig stunt and tight turnaround.',
        },
      },
      recommendation:
        'High production viability with minimal narrative sacrifice. Compensate for the lost emotional peak by extending the confrontation in Scene 31.',
      source: 'local-simulation',
    };
  }
}

export async function generateScreenplayScene(params: {
  sceneNumber: number;
  roadmapItem: RoadmapItem;
  characters: Character[];
  instructions?: string;
  previousScene?: string;
}) {
  try {
    const res = await fetch('/api/gemini/generate-scene', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Failed to generate scene');
    return await res.json();
  } catch (err) {
    console.warn('Using local scene generator fallback:', err);
    return {
      screenplayText: `SCENE ${params.sceneNumber}
INT. HELIOS-7 SECONDARY RECIRCULATION HUB - NIGHT

The air is thin, tasting of burnt copper and ozone. A solitary red warning beacon sweeps over the frosted bulkheads.

KABIR stands motionless by the pressure gauge, his breath misting in the cold air.

MAYA enters behind him, holding the encrypted military datapad.

MAYA
The flight recorder log wasn't an automatic purge. It had your biometric stamp.

Kabir looks down at his bruised hands.

KABIR
You wouldn't have survived the atmospheric drop without those reserves.

MAYA
(stepping forward, voice cracking)
You took a man's life to save mine. Did you ever plan on telling me?`,
      source: 'local-simulation',
    };
  }
}

export async function discussStructureWithAI(params: {
  beatName: string;
  currentPosition: string;
  proposedPosition: string;
  writerIntent: string;
}) {
  try {
    const res = await fetch('/api/gemini/structure-discuss', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Structure discuss request failed');
    return await res.json();
  } catch (err) {
    return {
      analysis: `Keeping ${params.beatName} at ${params.currentPosition} allows deeper character setup, while moving to ${params.proposedPosition} accelerates suspense by +18% with minor continuity adjustments.`,
      tradeoffs: {
        pacing: 12,
        character: -5,
        suspense: 18,
        production: '+1 scene',
      },
      source: 'local-simulation',
    };
  }
}

export interface IdeaDevelopParams {
  idea: string;
  mode?: 'develop' | 'challenge' | 'possibilities' | 'questions' | 'chat';
  attachments?: {
    characters?: string[];
    reference?: string;
    image?: string;
    file?: string;
  };
  project?: Project;
}

export interface IdeaDevelopResponse {
  analysis: string;
  structured: {
    logline: string;
    theme: string;
    protagonist: { name: string; want: string; need: string; flaw: string };
    conflict: { obstacle: string; antagonist: string; stakes: string };
    visualComps: string[];
    directorQuestions: string[];
  };
  source: 'gemini' | 'local-simulation';
  modelUsed?: string;
}

export async function developFilmIdea(params: IdeaDevelopParams): Promise<IdeaDevelopResponse> {
  try {
    const res = await fetch('/api/gemini/idea-develop', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Idea development request failed');
    return await res.json();
  } catch (err) {
    console.warn('Using local idea development fallback:', err);
    return {
      analysis: `### PITCH & LOGLINE REFINEMENT
**Logline:** When an unexpected discovery breaches everyday normalcy, a driven protagonist must risk their identity to expose a truth that everyone around them is determined to bury.

### PROTAGONIST ENGINE
* **Protagonist:** ${params.attachments?.characters?.[0] || 'The Protagonist'}
* **External Want:** Uncover the truth before irreversible consequences destroy their world.
* **Internal Need:** Acknowledge their own complicity and abandon emotional insulation.
* **Fatal Flaw:** Reluctance to trust allies, operating strictly as a lone operator.

### CENTRAL CONFLICT & DRAMATIC STAKES
* **Primary Obstacle:** An entrenched institutional structure enforcing silence.
* **Antagonistic Force:** A figure whose survival depends on the secret staying buried.
* **Stakes:** Complete loss of agency and the destruction of those they love.

### CINEMATIC TONE & VISUAL REFERENCES
* **Comps:** *Sicario* (slow-burn moral dread), *Arrival* (emotional resonance), *Zodiac* (procedural obsession).
* **Cinematography Note:** 2.39:1 Anamorphic, high-contrast atmospheric shadows with lingering medium close-ups.

### THE DIRECTOR'S CHALLENGE
1. *What does the opening scene show that directly contradicts what the protagonist says?*
2. *Where is the turning point where turning back becomes impossible?*
3. *What is the sensory or acoustic signature of this film's atmosphere?*`,
      structured: {
        logline: `A high-tension cinematic exploration of: "${params.idea.slice(0, 100)}..."`,
        theme: 'Truth vs. Survival',
        protagonist: {
          name: params.attachments?.characters?.[0] || 'Protagonist',
          want: 'To expose the hidden secret.',
          need: 'To face personal truth.',
          flaw: 'Reluctance to trust others.',
        },
        conflict: {
          obstacle: 'Entrenched resistance and dwindling time.',
          antagonist: 'Institutional silence.',
          stakes: 'Loss of truth and sanity.',
        },
        visualComps: ['Sicario', 'Arrival', 'Zodiac'],
        directorQuestions: [
          'What is the opening visual motif?',
          'What is the point of no return for your protagonist?',
          'What acoustic atmosphere defines the tension?',
        ],
      },
      source: 'local-simulation',
    };
  }
}

export interface StoryAnalysisResult {
  title: string;
  genre: string;
  logline: string;
  mainCharacter: {
    name: string;
    archetype: string;
    want: string;
    need: string;
    flaw: string;
  };
  supportingCharacters: Array<{
    name: string;
    role: string;
    dynamic: string;
  }>;
  centralConflict: string;
  setting: string;
  theme: string;
  beginning: string;
  middle: string;
  ending: string;
  readinessScore: number;
  pacingNotes: string;
}

export async function analyzeStoryDocument(params: {
  storyContent: string;
  fileName: string;
  project?: Project;
}): Promise<{ analysis: StoryAnalysisResult; source: 'gemini' | 'local-simulation' }> {
  try {
    const res = await fetch('/api/gemini/story-analyze', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Story analysis failed');
    return await res.json();
  } catch (err) {
    console.warn('Fallback to local story analysis:', err);
    return {
      analysis: {
        title: params.fileName.replace(/\.[^/.]+$/, '').replace(/[_-]/g, ' ') || 'Untitled Story',
        genre: 'Psychological Thriller / Drama',
        logline: 'When an estranged investigator is summoned to an isolated alpine relay station, they unearth an encrypted signal that foretells an imminent catastrophe orchestrated by their own mentor.',
        mainCharacter: {
          name: 'Marcus Vance',
          archetype: 'Obsessive Investigator',
          want: 'To uncover the origin of the rogue distress frequency.',
          need: 'To confront his past complicity and accept that some truths demand sacrifice.',
          flaw: 'Paralyzing hyper-vigilance and mistrust of all institutional authority.',
        },
        supportingCharacters: [
          { name: 'Dr. Elena Rossi', role: 'Chief Station Engineer', dynamic: 'Wary ally harboring classified telemetry records' },
          { name: 'Director Sterling', role: 'Bureau Supervisor', dynamic: 'Mentor turned calculating institutional antagonist' },
          { name: 'Kaelen', role: 'Rogue Technician', dynamic: 'The missing catalyst whose disappearance triggers the investigation' },
        ],
        centralConflict: 'Duty to institutional command structure vs. Moral responsibility to avert an orchestrated catastrophe.',
        setting: 'An isolated decommissioned mountaintop radar observatory during a severe winter whiteout.',
        theme: 'The cost of silence in the face of systemic corruption; Truth as a corrosive weapon.',
        beginning: 'Marcus arrives at Station 9 during an emergency blackout. An anomalous radio loop repeats every 47 minutes containing voices from the future.',
        middle: 'Marcus and Elena restore auxiliary power only to discover Director Sterling’s authorization codes on the sabotage module. The station is sealed from the outside.',
        ending: 'In a high-tension climax on the frozen transmitter tower, Marcus must broadcast the unredacted truth to the global network before Sterling’s tactical sweep team breaches the perimeter.',
        readinessScore: 92,
        pacingNotes: 'Strong narrative thrust with a distinct three-act architecture. High cinematic potential with atmospheric visual containment.',
      },
      source: 'local-simulation',
    };
  }
}

export interface StoryCompanionFeedback {
  action: string;
  suggestionType: string;
  headline: string;
  body: string;
  textToApply?: string;
  source: 'gemini' | 'local-simulation';
}

export async function getStoryCompanionFeedback(params: {
  storyText: string;
  storyTitle: string;
  action: 'analyze' | 'conflict' | 'characters' | 'gaps' | 'pacing' | 'possibilities' | 'ask';
  customPrompt?: string;
  project?: Project;
}): Promise<StoryCompanionFeedback> {
  try {
    const res = await fetch('/api/gemini/story-companion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });
    if (!res.ok) throw new Error('Story companion feedback failed');
    return await res.json();
  } catch (err) {
    console.warn('Fallback to local story companion:', err);
    return {
      action: params.action,
      suggestionType: 'director_guidance',
      headline: 'Dramaturgical Pacing & Tension Suggestion',
      body: 'Consider shifting the character reveal 10 minutes earlier. Ground the protagonist in concrete physical obstacles rather than internal dialogue to elevate the cinematic tension.',
      textToApply: '\n\n// DIRECTION NOTE: Let the sound design carry the scene transition — silence before the breach.',
      source: 'local-simulation',
    };
  }
}
