export type Role =
  | 'Director'
  | 'Writer'
  | 'Producer'
  | 'Cinematographer'
  | 'Assistant Director'
  | 'Editor'
  | 'Production Designer'
  | 'Costume Designer'
  | 'Sound Designer'
  | 'VFX'
  | 'Custom';

export type ProductionType =
  | 'Feature Film'
  | 'Short Film'
  | 'Web Series'
  | 'TV / OTT'
  | 'Music Video'
  | 'Documentary'
  | 'Advertisement'
  | 'Student Film'
  | 'Other';

export interface Project {
  id: string;
  name: string;
  director?: string;
  genre: string;
  language: string;
  logline: string;
  description: string;
  targetRuntime: string;
  productionType: ProductionType;
  estimatedBudget: string;
  targetAudience: string;
  mode: 'solo' | 'team';
  currentDraft: string;
  status: 'Development' | 'Pre-Production' | 'Shooting' | 'Post-Production';
  coverImage?: string;
  createdAt: string;
  teamMembers?: TeamMember[];
}

export interface TeamMember {
  id: string;
  name: string;
  role: Role;
  avatar: string;
  email: string;
  permissions: {
    canApproveDecisions: boolean;
    canEditScript: boolean;
    canEditBudget: boolean;
    canEditSchedule: boolean;
  };
}

export interface StoryIdea {
  id: string;
  rawIdea: string;
  premise: string;
  logline: string;
  theme: string;
  genre: string;
  tone: string;
  conflict: string;
  stakes: string;
  originalityScore: number; // 0-100
  characterPossibilities: string[];
  storyOpportunities: string[];
  weaknessesDetected: string[];
  aiExpansion: string;
}

export interface StoryLabData {
  premise: string;
  logline: string;
  synopsis: string;
  theme: string;
  genre: string;
  tone: string;
  centralConflict: string;
  stakes: string;
  ending: string;
  storyQuestions: string[];
  strengths: string[];
  weaknesses: string[];
  aiSuggestions: Array<{
    id: string;
    section: string;
    suggestion: string;
    impact: string;
    applied: boolean;
  }>;
}

export interface Character {
  id: string;
  name: string;
  age: number;
  role: string; // Protagonist, Antagonist, Foil, Deuteragonist, Supporting
  personality?: string;
  background?: string;
  costume?: string;
  makeup?: string;
  referenceImages?: string[];
  goal: string;
  motivation: string;
  want: string;
  need: string;
  fear: string;
  flaw: string;
  strength: string;
  backstory: string;
  secret: string;
  arc: string;
  internalConflict: string;
  externalConflict: string;
  firstAppearance: string;
  lastAppearance: string;
  importantScenes: number[];
  relationships: Array<{
    targetCharacterId: string;
    targetName: string;
    type: 'conflict' | 'alliance' | 'mentor' | 'romance' | 'subservient' | 'family';
    description: string;
  }>;
}

export interface WorldEntity {
  id: string;
  name: string;
  type: 'Location' | 'Era' | 'Rule' | 'Object' | 'Social' | 'Faction';
  description: string;
  visualIdentity: string;
  importantFacts: string[];
  rules: string[];
  connectedScenes: number[];
}

export interface StructureBeat {
  id: string;
  act: 'ACT I' | 'ACT II' | 'ACT III';
  sequence: string;
  name: string;
  purpose: string;
  storyEvent: string;
  characters: string[];
  conflict: string;
  emotionalObjective: string;
  characterImpact: string;
  setup: string;
  payoff: string;
  relatedScenes: number[];
  pageEstimate: string;
}

export interface StructureDiscussion {
  id: string;
  beatId: string;
  beatName: string;
  aiObservation: string;
  writerPerspective: string;
  currentScene: string;
  proposedScene: string;
  impacts: {
    pacing: number;
    character: number;
    suspense: number;
    production: string;
  };
  status: 'PENDING' | 'ACCEPTED' | 'MODIFIED' | 'REJECTED';
}

export interface RoadmapItem {
  id: string;
  act: string;
  sequence: string;
  beat: string;
  objective: string;
  characters: string[];
  conflict: string;
  emotionalObjective: string;
  characterDevelopment: string;
  storyEvent: string;
  setup: string;
  payoff: string;
  foreshadowing: string;
  location: string;
  props: string[];
  productionImportance: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW';
  dependencies: string[];
  plannedScene: number;
  coverageStatus: 'Fulfilled' | 'Drifting' | 'Missing';
}

export interface ScreenplayElement {
  id: string;
  type: 'scene-heading' | 'action' | 'character' | 'parenthetical' | 'dialogue' | 'transition';
  text: string;
  characterName?: string;
}

export interface ScreenplayScene {
  sceneNumber: number;
  slugline: string;
  intExt: 'INT' | 'EXT';
  location: string;
  timeOfDay: 'DAY' | 'NIGHT' | 'DUSK' | 'DAWN';
  roadmapId: string;
  roadmapObjective: string;
  characterObjective: string;
  emotionalObjective: string;
  conflict: string;
  elements: ScreenplayElement[];
  pageNumber: number;
  estimatedDurationMin: number;
  healthScore: number;
  driftStatus: 'ALIGNED' | 'DRIFTING' | 'ORPHAN';
  driftNotes?: string;
}

export interface ScreenplayHealth {
  overall: number;
  structure: number;
  characterArc: number;
  conflict: number;
  pacing: number;
  dialogue: number;
  continuity: number;
  emotion: number;
  roadmapAlignment: number;
  explanations: Record<string, string>;
  driftWarnings: Array<{
    sceneNumber: number;
    title: string;
    description: string;
    suggestion: string;
    options: string[];
  }>;
}

export interface WhatIfSimulation {
  id: string;
  query: string;
  timestamp: string;
  before: {
    scenesCount: number;
    budget: string;
    durationDays: number;
    riskScore: number;
  };
  after: {
    scenesCount: number;
    budget: string;
    durationDays: number;
    riskScore: number;
  };
  impact: {
    story: {
      summary: string;
      score: number;
      details: string[];
    };
    structure: {
      summary: string;
      beatsAffected: string[];
    };
    roadmap: {
      summary: string;
      itemsAffected: string[];
    };
    screenplay: {
      summary: string;
      scenesToRewrite: number[];
    };
    production: {
      summary: string;
      cast: string;
      location: string;
      equipment: string;
      vfx: string;
    };
    budget: {
      diff: string;
      details: string;
    };
    schedule: {
      diff: string;
      details: string;
    };
    risk: {
      diff: string;
      details: string;
    };
  };
  recommendation: string;
  votes: Array<{
    role: Role;
    voterName: string;
    vote: 'APPROVE' | 'REJECT' | 'MODIFY';
    comment: string;
  }>;
  status: 'PROPOSED' | 'APPROVED' | 'REJECTED' | 'APPLIED';
}

export interface CreativeDecision {
  id: string;
  title: string;
  description: string;
  proposedBy: string;
  date: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'APPLIED';
  impacts: {
    story: string;
    visual: string;
    cost: string;
    time: string;
    risk: string;
  };
  aiTradeOffSummary: string;
  votes: Array<{
    role: Role;
    voterName: string;
    vote: 'APPROVE' | 'REJECT';
    notes: string;
  }>;
  approvalAuthorizedBy?: string;
  approvalDate?: string;
}

export interface SceneBreakdown {
  sceneNumber: number;
  heading: string;
  pages: number;
  cast: string[];
  extras: number;
  location: string;
  props: string[];
  costumes: string[];
  makeup: string[];
  vehicles: string[];
  equipment: string[];
  vfx: string[];
  sfx: string[];
  sound: string[];
  stunts: string[];
  animals: string[];
  weather: string;
  specialRequirements: string[];
}

export interface StoryboardShot {
  id: string;
  sceneNumber: number;
  shotNumber: string;
  frameDescription: string;
  character: string;
  action: string;
  composition: string;
  camera: string;
  lighting: string;
  sound: string;
  vfx: string;
  durationSec: number;
  thumbnailGradient: string;
}

export interface ShotPlanItem {
  id: string;
  sceneNumber: number;
  shotNumber: string;
  shotType: 'WIDE' | 'MED' | 'CLOSE-UP' | 'EXTREME CU' | 'OTS' | 'POV' | 'DUTCH';
  angle: 'EYE-LEVEL' | 'LOW' | 'HIGH' | 'BIRD-EYE';
  lens: string;
  cameraMovement: 'STATIC' | 'PAN' | 'TILT' | 'DOLLY' | 'STEADICAM' | 'CRANE' | 'HANDHELD';
  composition: string;
  subject: string;
  action: string;
  dialogueSnippet: string;
  lighting: string;
  sound: string;
  vfx: string;
  storyPurpose: string;
  setupTimeMinutes: number;
}

export interface CastItem {
  id: string;
  actorName: string;
  characterName: string;
  roleType: 'Lead' | 'Supporting' | 'Cameo';
  totalScenes: number;
  workingDays: number;
  dailyRateINR: number;
  availability: 'Available' | 'Pending Hold' | 'Conflict';
  contact: string;
  assignedScenes: number[];
}

export interface CrewDepartment {
  department: string;
  lead: string;
  crewCount: number;
  status: 'Ready' | 'In Setup' | 'Hiring';
}

export interface LocationItem {
  id: string;
  name: string;
  type: string;
  intExt: 'INT' | 'EXT';
  dayNight: 'DAY' | 'NIGHT';
  scenes: number[];
  dailyCostINR: number;
  permissionsStatus: 'Secured' | 'In Review' | 'Required';
  equipmentRequired: string[];
  travelTimeMinutes: number;
  companyMoveWarning: boolean;
  risks: string[];
}

export interface EquipmentItem {
  id: string;
  name: string;
  category: 'Camera' | 'Lens' | 'Lighting' | 'Grip' | 'Sound' | 'Special';
  scenesUsed: number[];
  dailyRentalINR: number;
  status: 'Secured' | 'Reserved' | 'In Transit';
}

export interface BudgetItem {
  id: string;
  category: 'Cast' | 'Crew' | 'Locations' | 'Equipment' | 'Props & Sets' | 'VFX/SFX' | 'Post-Production' | 'Contingency';
  item: string;
  plannedCostINR: number;
  actualCostINR: number;
  confidenceScore: number;
  reasoning: string;
  assumptions: string;
}

export interface ScheduleDay {
  dayNumber: number;
  date: string;
  callTime: string;
  location: string;
  scenes: number[];
  pagesTotal: number;
  estimatedHours: number;
  companyMoves: number;
  mealBreak: string;
  status: 'COMPLETED' | 'IN_PROGRESS' | 'SCHEDULED';
}

export interface StripboardItem {
  id: string;
  dayNumber: number;
  sceneNumber: number;
  heading: string;
  pages: number;
  intExt: 'INT' | 'EXT';
  dayNight: 'DAY' | 'NIGHT';
  castCount: number;
  location: string;
  status: 'SCHEDULED' | 'SHOT' | 'DELAYED';
}

export interface DOODMatrix {
  cast: Array<{
    actorName: string;
    characterName: string;
    days: Record<number, 'W' | 'T' | 'H' | 'O'>; // Work, Travel, Hold, Off
    totalWorkDays: number;
    totalHoldDays: number;
    estimatedCostINR: number;
  }>;
}

export interface CallSheetData {
  productionTitle: string;
  shootDay: number;
  totalShootDays: number;
  date: string;
  generalCallTime: string;
  weatherForecast: string;
  sunriseTime: string;
  sunsetTime: string;
  nearestHospital: string;
  productionOffice: string;
  setAddress: string;
  scenes: Array<{
    sceneNum: number;
    slugline: string;
    dayNight: string;
    pages: number;
    castNumbers: string;
    description: string;
  }>;
  castCalls: Array<{
    castNumber: number;
    actor: string;
    character: string;
    pickup: string;
    callTime: string;
    onSetTime: string;
    notes: string;
  }>;
  safetyNotes: string;
  specialInstructions: string;
}

export interface RiskItem {
  id: string;
  title: string;
  category: 'Cast' | 'Location' | 'Weather' | 'VFX' | 'Equipment' | 'Schedule' | 'Stunt';
  level: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  probability: number; // 0 - 100
  impact: number; // 0 - 100
  affectedScenes: number[];
  reason: string;
  mitigation: string;
}

export interface ReadinessMetric {
  category: string;
  score: number;
  status: 'READY' | 'ATTENTION' | 'CRITICAL';
  blockers: string[];
  resolved: string[];
}

export interface MLPrediction {
  sceneId: number;
  slugline: string;
  riskProbability: number;
  shootingDurationHours: number;
  estimatedCostINR: number;
  delayProbability: number;
  complexity: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
  confidence: number;
  aiExplanation: string;
  inputs: {
    charactersCount: number;
    extrasCount: number;
    shotsCount: number;
    cameraSetups: number;
    hasVFX: boolean;
    hasStunt: boolean;
    isNight: boolean;
    isInterior: boolean;
  };
}

export interface ExpertAnnotation {
  sceneId: number;
  expertName: string;
  role: string;
  emotionalIntensity: number; // 1-10
  characterImportance: number; // 1-10
  conflictLevel: number; // 1-10
  pacingRating: number; // 1-10
  productionComplexity: number; // 1-10
  shootingDifficulty: number; // 1-10
  plannedHours: number;
  predictedHours: number;
  actualHours: number;
  varianceExplanation: string;
}

export interface ContinuityIssue {
  id: string;
  character: string;
  type: 'Wardrobe' | 'Injury' | 'Prop' | 'Timeline' | 'Dialogue';
  severity: 'CRITICAL' | 'WARNING';
  description: string;
  conflictingScenes: [number, number];
  aiSuggestion: string;
}

export interface ShootingProgressRecord {
  dayNumber: number;
  sceneNumber: number;
  shotNumber: string;
  status: 'COMPLETED' | 'RETAKE' | 'DELAYED';
  plannedHours: number;
  actualHours: number;
  retakesCount: number;
  delayMinutes: number;
  notes: string;
}

// ── 11-STAGE SUITE WORKFLOW TYPES ──

export interface ProductionDesignItem {
  id: string;
  category: 'pre-production' | 'production' | 'post-production';
  subCategory: string; // e.g. Locations, Sets, Props, Costumes, Makeup | Camera, Lighting, Sound, Direction | Editing, VFX, SFX, Color grading, Sound mixing
  name: string;
  department: string;
  assignedLead: string;
  status: 'Draft' | 'In Progress' | 'Ready' | 'Approved';
  notes: string;
  referenceImage?: string;
  tags?: string[];
}

export interface PreProductionBoardCard {
  id: 'location' | 'character' | 'costume' | 'props' | 'lighting' | 'camera' | 'storyboard' | 'schedule' | 'call-sheet';
  title: string;
  count: number;
  unit: string;
  status: 'Planning' | 'In Progress' | 'Locked';
  lead: string;
  summary: string;
  items: Array<{
    id: string;
    title: string;
    detail: string;
    status: 'pending' | 'in-progress' | 'complete';
  }>;
}

export interface ProductionTake {
  id?: string;
  takeNumber: number;
  status: 'CIRCLE_TAKE' | 'GOOD' | 'HOLD' | 'RETAKE' | 'NG';
  result?: 'Good' | 'Circled' | 'NG' | 'Hold';
  isCircled?: boolean;
  timecode?: string;
  duration?: string;
  timestamp?: string;
  audioGood?: boolean;
  notes: string;
  durationSec?: number;
}

export interface ProductionWorkShot {
  id: string;
  sceneNumber: string;
  shotNumber: string;
  cameraAngle: string;
  lens: string;
  cameraMovement?: string;
  lightingSetup: string;
  actorBlocking: string;
  soundRecording: {
    micType: string;
    roomToneCaptured: boolean;
    frequencyNotes: string;
    peakDb: string;
  } | string;
  takes: ProductionTake[];
  activeTakeNumber?: number;
  status: 'Planned' | 'Shooting' | 'Wrapped' | 'Ready';
}

export interface PostProductionTask {
  id: string;
  section: 'video-editing' | 'audio-editing' | 'vfx' | 'sfx' | 'color-grading' | 'subtitles' | 'final-export';
  title: string;
  lead: string;
  status: 'Not Started' | 'In Progress' | 'Review' | 'Locked';
  progressPercent: number;
  notes: string;
  deliverables?: string[];
}

