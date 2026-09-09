export interface PreprodScene {
  id: string;
  sceneNumber: string;
  slugline: string;
  timeOfDay: 'DAY' | 'NIGHT' | 'MORNING' | 'EVENING';
  setting: 'INT' | 'EXT';
  location: string;
  shotCount: number;
  thumbnail: string;
  description: string;
  characters: string[];
}

export interface PreprodShot {
  id: string;
  shotNumber: string;
  sceneId: string;
  thumbnail: string;
  storyboardImage: string;
  aiGeneratedImage: string;
  shotType: string;
  angle: string;
  movement: string;
  lens: string;
  duration: string;
  durationSec: number;
  purpose: string;
  aiSuggestion: string;
  aiInsight: {
    description: string;
    confidence: string;
    source: string;
  };
}

export const PREPROD_SCENES: PreprodScene[] = [
  {
    id: 'sc_01',
    sceneNumber: 'Scene 01',
    slugline: 'INT. APARTMENT - MORNING',
    timeOfDay: 'MORNING',
    setting: 'INT',
    location: 'Downtown Loft, Brooklyn',
    shotCount: 6,
    thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
    description: 'Maya awakens in her sun-drenched loft. A sudden urgent ping on her datapad breaks the quiet morning silence.',
    characters: ['Maya'],
  },
  {
    id: 'sc_02',
    sceneNumber: 'Scene 02',
    slugline: 'EXT. CITY STREET - DAY',
    timeOfDay: 'DAY',
    setting: 'EXT',
    location: '5th Avenue Transit Corridor',
    shotCount: 8,
    thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=400&q=80',
    description: 'Dense pedestrian crowds hustle beneath towering glass spires as autonomous transit pods speed by.',
    characters: ['Maya', 'Commuters'],
  },
  {
    id: 'sc_03',
    sceneNumber: 'Scene 03',
    slugline: 'INT. OFFICE - DAY',
    timeOfDay: 'DAY',
    setting: 'INT',
    location: 'Horizon Dynamics Level 42',
    shotCount: 7,
    thumbnail: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=400&q=80',
    description: 'Boardroom with floor-to-ceiling glass where the expedition council discusses the solar flare anomalies.',
    characters: ['Director Vance', 'Dr. Aris', 'Maya'],
  },
  {
    id: 'sc_04',
    sceneNumber: 'Scene 04',
    slugline: 'EXT. RIVER SIDE - EVENING',
    timeOfDay: 'EVENING',
    setting: 'EXT',
    location: 'Hudson Embankment Pier',
    shotCount: 5,
    thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    description: 'Quiet reflective waters reflecting the violet twilight sky as Maya meets her estranged mentor.',
    characters: ['Maya', 'Kabir'],
  },
  {
    id: 'sc_05',
    sceneNumber: 'Scene 05',
    slugline: 'INT. CAFE - NIGHT',
    timeOfDay: 'NIGHT',
    setting: 'INT',
    location: 'The Blue Beacon Brasserie',
    shotCount: 6,
    thumbnail: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=400&q=80',
    description: 'Dim amber lighting, vinyl jazz playing softly as encrypted files are passed across a mahogany table.',
    characters: ['Maya', 'Informant 7'],
  },
  {
    id: 'sc_06',
    sceneNumber: 'Scene 06',
    slugline: 'EXT. BRIDGE - NIGHT',
    timeOfDay: 'NIGHT',
    setting: 'EXT',
    location: 'Williamsburg Suspension Bridge',
    shotCount: 4,
    thumbnail: 'https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=400&q=80',
    description: 'Rain slicks the suspension cables as headlights paint streaks of red and white across the mist.',
    characters: ['Maya'],
  },
];

export const PREPROD_SHOTS_DATA: Record<string, PreprodShot[]> = {
  sc_01: [
    {
      id: 'shot_1_1',
      shotNumber: '1.1',
      sceneId: 'sc_01',
      thumbnail: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
      storyboardImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      aiGeneratedImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
      shotType: 'Medium Shot',
      angle: 'Eye Level',
      movement: 'Static',
      lens: '35mm',
      duration: '8 sec',
      durationSec: 8,
      purpose: 'Establish location and character',
      aiSuggestion: 'Use natural light from window for a soft, realistic look.',
      aiInsight: {
        description: "This shot sets the tone for the scene and establishes the character's environment. Natural morning light will create a realistic and emotional atmosphere.",
        confidence: 'High Confidence',
        source: 'Scene 01, Script',
      },
    },
    {
      id: 'shot_1_2',
      shotNumber: '1.2',
      sceneId: 'sc_01',
      thumbnail: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=400&q=80',
      storyboardImage: 'https://images.unsplash.com/photo-1582562124811-c09040d0a901?auto=format&fit=crop&w=800&q=80',
      aiGeneratedImage: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?auto=format&fit=crop&w=1200&q=80',
      shotType: 'Close Up',
      angle: 'Over Shoulder',
      movement: 'Push In',
      lens: '50mm',
      duration: '5 sec',
      durationSec: 5,
      purpose: 'Show phone notification',
      aiSuggestion: 'Consider a slight rack focus from phone to character.',
      aiInsight: {
        description: 'Pacing trigger: The notification is the inciting interruption of the morning calm. Fast focus shift signals urgency.',
        confidence: '94% Confidence',
        source: 'Action Line 4, Script',
      },
    },
    {
      id: 'shot_1_3',
      shotNumber: '1.3',
      sceneId: 'sc_01',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      storyboardImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
      aiGeneratedImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      shotType: 'Medium Close Up',
      angle: 'Eye Level',
      movement: 'Slow Push In',
      lens: '85mm',
      duration: '7 sec',
      durationSec: 7,
      purpose: 'Show emotion (worry)',
      aiSuggestion: 'Use a shallow depth of field to isolate the character.',
      aiInsight: {
        description: "The 85mm prime lens compresses the background, centering Maya's internal conflict before she reads the confidential alert.",
        confidence: '98% Confidence',
        source: 'Emotional Beat Map',
      },
    },
    {
      id: 'shot_1_4',
      shotNumber: '1.4',
      sceneId: 'sc_01',
      thumbnail: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=400&q=80',
      storyboardImage: 'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
      aiGeneratedImage: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80',
      shotType: 'Wide Shot',
      angle: 'High Angle',
      movement: 'Static',
      lens: '24mm',
      duration: '6 sec',
      durationSec: 6,
      purpose: 'Show environment',
      aiSuggestion: 'Highlight the room layout and available space.',
      aiInsight: {
        description: 'Demonstrates physical scale and solitude in the loft space, emphasizing her isolation in a bustling city.',
        confidence: '91% Confidence',
        source: 'Scene 01, Environment Spec',
      },
    },
    {
      id: 'shot_1_5',
      shotNumber: '1.5',
      sceneId: 'sc_01',
      thumbnail: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
      storyboardImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136?auto=format&fit=crop&w=800&q=80',
      aiGeneratedImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      shotType: 'Medium Shot',
      angle: 'Behind Character',
      movement: 'Slow Pan',
      lens: '50mm',
      duration: '7 sec',
      durationSec: 7,
      purpose: 'Character decision moment',
      aiSuggestion: 'Pan slowly to build tension.',
      aiInsight: {
        description: 'Tracking her silhouette as she looks toward the city horizon creates a strong visual bridge into Scene 02.',
        confidence: '96% Confidence',
        source: 'Visual Rhythm Guide',
      },
    },
    {
      id: 'shot_1_6',
      shotNumber: '1.6',
      sceneId: 'sc_01',
      thumbnail: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=400&q=80',
      storyboardImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      aiGeneratedImage: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80',
      shotType: 'Close Up',
      angle: 'Top Shot',
      movement: 'Static',
      lens: '50mm',
      duration: '4 sec',
      durationSec: 4,
      purpose: 'Insert shot - phone screen',
      aiSuggestion: 'Ensure screen is readable and well lit.',
      aiInsight: {
        description: 'Insert shot delivering narrative information: "PROJECT HORIZON: ALL SYSTEMS CRITICAL AT 08:00".',
        confidence: 'High Confidence',
        source: 'Prop Master Notes',
      },
    },
  ],
  sc_02: [
    {
      id: 'shot_2_1',
      shotNumber: '2.1',
      sceneId: 'sc_02',
      thumbnail: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=400&q=80',
      storyboardImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=800&q=80',
      aiGeneratedImage: 'https://images.unsplash.com/photo-1477959858617-67f30bc75b82?auto=format&fit=crop&w=1200&q=80',
      shotType: 'Extreme Wide Shot',
      angle: 'Bird Eye',
      movement: 'Drone Descending',
      lens: '18mm',
      duration: '9 sec',
      durationSec: 9,
      purpose: 'Establish bustling metropolis',
      aiSuggestion: 'Capture golden hour sunlight reflecting off skyscrapers.',
      aiInsight: {
        description: 'Establishes vast scale of the civilization at risk.',
        confidence: 'High Confidence',
        source: 'Scene 02, Script',
      },
    },
    {
      id: 'shot_2_2',
      shotNumber: '2.2',
      sceneId: 'sc_02',
      thumbnail: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      storyboardImage: 'https://images.unsplash.com/photo-1578328819058-b69f3a3b0f6b?auto=format&fit=crop&w=800&q=80',
      aiGeneratedImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1200&q=80',
      shotType: 'Tracking Medium Shot',
      angle: 'Eye Level',
      movement: 'Steadicam Reverse',
      lens: '40mm',
      duration: '11 sec',
      durationSec: 11,
      purpose: 'Follow Maya moving rapidly through crowd',
      aiSuggestion: 'Use shallow depth of field to isolate Maya from pedestrian blur.',
      aiInsight: {
        description: 'Creates sensory contrast between oblivious commuters and her urgent mission.',
        confidence: '95% Confidence',
        source: 'Director Notes',
      },
    },
  ],
};
