import { Role } from '../types';

export interface IntelligenceNode {
  id: string;
  type:
    | 'Scene'
    | 'Character'
    | 'Location'
    | 'Prop'
    | 'Costume'
    | 'Camera'
    | 'Shot'
    | 'Storyboard'
    | 'Schedule'
    | 'Budget'
    | 'CallSheet';
  label: string;
  detail: string;
  status: 'Ready' | 'In-Review' | 'Pending' | 'Alert';
  connectedNodeIds: string[];
}

export interface ChangeImpact {
  id: string;
  title: string;
  triggerEvent: string; // e.g. "Scene 12 location changed from Soundstage to Leh Exterior"
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  timestamp: string;
  affectedAreas: {
    locationSchedule: string;
    transport: string;
    callSheet: string;
    lightingPlan: string;
    cameraPlan: string;
    budget: string;
    castDood: string;
  };
  aiRecommendation: string;
  status: 'PROPOSED' | 'ACCEPTED' | 'REJECTED' | 'EDITED';
}

export interface ScriptBreakdownItem {
  sceneNumber: number;
  slugline: string;
  intExt: 'INT' | 'EXT';
  dayNight: 'DAY' | 'NIGHT';
  pages: number;
  storyPurpose: string;
  emotionalObjective: string;
  characterObjective: string;
  conflict: string;
  characters: string[];
  extrasCount: number;
  location: string;
  props: {
    hero: string[];
    background: string[];
    consumable: string[];
    continuity: string[];
  };
  costumes: string[];
  makeup: string[];
  vehicles: string[];
  soundPlan: {
    dialogueMics: string;
    sfxAtmosphere: string;
    roomTone: string;
    musicCue: string;
  };
  cameraPlan: {
    lens: string;
    movement: string;
    framing: string;
    lightingApproach: string;
  };
  vfx: string[];
  sfx: string[];
  stunts: {
    description: string;
    safetyChecklist: string[];
    supervisor: string;
    medicalStandby: boolean;
  }[];
  specialRequirements: string[];
  continuityNotes: string[];
  estimatedShootingHours: number;
  difficultyRating: 1 | 2 | 3 | 4 | 5;
  groupingInsight?: string; // e.g. "Scene 18 uses same location as Scene 4"
  aiApprovalStatus: 'ACCEPTED' | 'REJECTED' | 'EDITED' | 'PENDING';
  aiConfidence: 'HIGH' | 'MEDIUM' | 'LOW';
  aiSourceCitation: string;
}

export interface PreProdCharacter {
  id: string;
  name: string;
  actorAttached?: string;
  ageRange: string;
  roleType: 'Lead' | 'Supporting' | 'Cameo';
  goal: string;
  motivation: string;
  internalConflict: string;
  externalConflict: string;
  arc: string;
  importantScenes: number[];
  screenTimePercent: number;
  relationships: { characterName: string; relation: string; tension: string }[];
  consistencyAlert?: string;
  auditionSides: string;
  auditionQuestions: string[];
  callbackNotes: string;
}

export interface PreProdLocation {
  id: string;
  name: string;
  type: string; // Mountain, Soundstage, Residential, Orbital interior
  intExt: 'INT' | 'EXT';
  dayNight: 'DAY' | 'NIGHT';
  scenesUsed: number[];
  addressOrStage: string;
  dailyRateINR: number;
  spaceDimensions: string;
  lightingConditions: string;
  soundEnvironment: string;
  cameraAccess: string;
  permitsStatus: 'Secured' | 'In Review' | 'Required';
  consolidationSuggestion?: string;
  scoutReport: {
    powerAvailable: string;
    parkingSpace: string;
    ambientNoiseRating: 'SILENT' | 'MANAGEABLE' | 'NOISY';
    recommendation: string;
  };
}

export interface PreProdShot {
  id: string;
  sceneNumber: number;
  shotNumber: string;
  shotSize: 'WIDE' | 'MED' | 'CLOSE-UP' | 'EXTREME CU' | 'OTS' | 'POV' | 'DUTCH' | string;
  angle: 'EYE-LEVEL' | 'LOW' | 'HIGH' | 'BIRD-EYE' | 'DUTCH' | string;
  lens: string;
  cameraMovement: 'STATIC' | 'PAN' | 'TILT' | 'DOLLY' | 'STEADICAM' | 'CRANE' | 'HANDHELD' | string;
  subject: string;
  action: string;
  dialogueSnippet?: string;
  storyPurpose: string;
  durationSec: number;
  status: 'Approved' | 'Draft' | 'Needs Review' | 'Proposed' | string;
}

export interface PreProdStoryboard {
  id: string;
  sceneNumber: number;
  shotNumber: string;
  composition: string;
  characterPositions: string;
  cameraPosition: string;
  cameraMovement: string;
  lightingApproach: string;
  environment: string;
  blockingWorkflow: string; // Camera -> Actor -> Movement -> Action -> Cut
  thumbnailGradient: string;
  notes: string;
}

export interface PreProdLightingSound {
  sceneNumber: number;
  lightingMood: string;
  keyLight: string;
  fillLight: string;
  backlight: string;
  practicals: string[];
  soundDialogue: string;
  soundSfx: string;
  soundAmbient: string;
  roomToneCaptured: boolean;
  wildTracks: string[];
  musicCue: {
    trackName: string;
    mood: string;
    intensity: number; // 1-10
    licenseStatus: 'Original Score' | 'Licensed' | 'Pending Clearance';
  };
}

export interface PreProdStuntVfx {
  id: string;
  sceneNumber: number;
  type: 'VFX' | 'SFX' | 'STUNT';
  name: string;
  description: string;
  safetyProtocols: string[];
  stuntCoordinator: string;
  medicalStandby: boolean;
  vendorOrDept: string;
  estimatedCostINR: number;
  riskRating: 'LOW' | 'MEDIUM' | 'HIGH';
}

export interface PreProdContinuityAlert {
  id: string;
  character: string;
  itemType: 'Wardrobe' | 'Injury' | 'Prop' | 'Makeup' | 'Timeline';
  severity: 'CRITICAL' | 'WARNING' | 'NOTE';
  description: string;
  scenesAffected: [number, number];
  aiSuggestion: string;
  status: 'ACTIVE' | 'FIXED' | 'IGNORED';
  notes?: string;
}

export interface PreProdTask {
  id: string;
  department: string;
  title: string;
  assignedTo: string;
  deadlineDay: string;
  priority: 'CRITICAL' | 'HIGH' | 'MEDIUM';
  completed: boolean;
  autoGeneratedSource?: string; // e.g. "From Scene 27 Props"
}

export interface PreProductionAudit {
  overallReadiness: number; // e.g. 91
  departmentScores: Record<string, number>;
  blockers: { department: string; issue: string; resolution: string }[];
  missingItems: string[];
  recommendedActions: string[];
}
