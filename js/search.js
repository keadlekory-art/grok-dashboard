// Client-side semantic search using Transformers.js
// Model: Xenova/all-MiniLM-L6-v2 (~30MB, cached by browser)

const RESEARCH_CHUNKS = [
  {
    id: "gbot-orbit",
    bot: "G Bot",
    title: "Dance Orbit Experiments",
    text: "Full 360-degree orbits around a crowd of dancers are unreliable with current video models. The model often orbits halfway then plays footage in reverse, making dancers look robotic. Background faces blend together. Prefer shorter arcs instead.",
    link: "bots/g-bot.html#dance-scene-video-experiments"
  },
  {
    id: "gbot-arc",
    bot: "G Bot",
    title: "90-Degree Arc Recommendation",
    text: "A 90-degree arc (or closer to 45-60 degrees) from front to three-quarter view works much better. Faces and costumes hold, including the laurel wreath. Camera glides smoothly in one direction. This is the best take so far for the Greek dance storyboard.",
    link: "bots/g-bot.html#current-recommendation"
  },
  {
    id: "gbot-characters",
    bot: "G Bot",
    title: "Character Preservation",
    text: "Bob, the laurel-wreathed man, and the salt-and-pepper man kept their faces and costumes on the arc shot. Clapping looks stiff and repetitive with soft fingers. Suggestion: change action to swaying, turning, and raising cups for more natural motion.",
    link: "bots/g-bot.html#character-preservation"
  },
  {
    id: "gbot-workarounds",
    bot: "G Bot",
    title: "AI Video Workarounds",
    text: "Alternatives to full orbit: 90-degree arc, lateral tracking shot along the line of dancers, or fake a 360 by cutting multiple short arcs with cuts hidden behind a torch or close dancer.",
    link: "bots/g-bot.html#ai-video-workarounds"
  },

  {
    id: "gbot-bob-sheets",
    bot: "G Bot",
    title: "Bob Character Sheets",
    text: "Three separate reference sheets for Bob, made after a combined sheet put every view facing front. Bob is bald with a short white beard, no glasses, an off-white tunic with dark patterned trim, and a charcoal-gray patterned himation. Turnaround: front, 3/4, side, and back. Poses: seated with a goblet, standing with grapes, leaning forward at a table, and a toast. Face sheet: front, profile, 3/4, plus six expressions in costume. Deadpan does not show a raised eyebrow clearly. Use the face sheet for close-ups and the turnaround for wide shots.",
    link: "bots/g-bot.html#bob-character-sheets"
  },
  {
    id: "gbot-symposium-stills",
    bot: "G Bot",
    title: "Symposium Panel 1 Stills",
    text: "Panel 1 stills of Socrates, Bob, and Plato at a golden-hour symposium table in a marble colonnade, made with the three character sheets as references. Panel1_Symposium_Medium.jpg is a closer shot: Socrates on the left in a floral-bordered dark himation, Bob in the center reaching for a grape, Plato on the right with a laurel wreath and green cloak. Panel1_Symposium_Wide.jpg shows the full colonnade, torches, and sunset over the hills, with the characters still matching the sheets.",
    link: "bots/g-bot.html#symposium-panel-1-stills"
  },
  {
    id: "gbot-symposium-demos",
    bot: "G Bot",
    title: "Symposium Panel 1 Demo Videos",
    text: "Two silent 8-second demo clips animated from the wide Panel 1 still: Panel1_Symposium_Demo.mp4 (slow dolly-in; faces and costumes hold; some hand blur) and Panel1_Symposium_Demo_v2.mp4 (smoother, more natural movement; small remaining wobbles in hands and Plato's goblet). The v2 take was saved to the Greek-Storyboard folder. Video files are not in the dashboard.",
    link: "bots/g-bot.html#symposium-panel-1-stills"
  },
  {
    id: "scout-pika",
    bot: "AI Tools Scout",
    title: "Pika Enact",
    text: "Pika Enact is a research preview of live directing on set. Move actors with the mouse, give performance notes, and steer the camera while picture and sound generate in real time. Enterprise-only for now. Shows direction of cinematic AI video.",
    link: "bots/ai-tools-scout.html#pika-enact"
  },
  {
    id: "scout-ideogram",
    bot: "AI Tools Scout",
    title: "Ideogram 4.6",
    text: "Ideogram 4.6 generates and edits images in native 4K. Detail is created at full size rather than upscaled. Stack precise edits without changing the rest of the frame. Good for character stills and keyframes before animating.",
    link: "bots/ai-tools-scout.html#ideogram-46"
  },
  {
    id: "scout-krea",
    bot: "AI Tools Scout",
    title: "Krea Video Swap and Drama Studio",
    text: "Krea Video Swap replaces a person, face, outfit, or object in an existing clip while keeping original motion, camera moves, cuts, and audio. Needs paid plan. Drama Studio opened with 12 new visual styles and voices with accents for consistent characters.",
    link: "bots/ai-tools-scout.html#krea-video-swap"
  },
  {
    id: "scout-tip",
    bot: "AI Tools Scout",
    title: "Character Sheet Tip",
    text: "Make a character sheet before generating video: one still showing front, side, back, and face close-up. Give the video tool that sheet plus a location image as references. Name which image is the character and which is the place, then describe action and one camera move. Catch drift early by comparing new angles to the sheet.",
    link: "bots/ai-tools-scout.html#character-sheet-tip"
  },
  {
    id: "scout-elevenlabs",
    bot: "AI Tools Scout",
    title: "ElevenLabs Black Friday",
    text: "ElevenLabs Creator annual plan is $99 for the first year (55% off) through December 1. Free contest The Year of More with $200K in prizes, entries close November 30.",
    link: "bots/ai-tools-scout.html#elevenlabs-black-friday"
  },
  {
    id: "scout-flux",
    bot: "AI Tools Scout",
    title: "FLUX In Production Competition",
    text: "Black Forest Labs short-film competition with prize pool over $25K including $10K top prize. Apply by November 30, submit by December 11. You keep the rights to your film. Good portfolio piece.",
    link: "bots/ai-tools-scout.html#flux-in-production"
  },
  {
    id: "shot-workflow",
    bot: "Shot Director",
    title: "Prompt Coaching Workflow",
    text: "Describe a scene in plain words. Receive a ready-to-use prompt that spells out shot size (ECU, CU, MS, WS), camera angle and movement, lens and focal length, depth of field, lighting setup, color grade, and mood. Brief explanation of why each choice works so you learn the vocabulary.",
    link: "bots/shot-director.html#core-workflow"
  },
  {
    id: "shot-apps",
    bot: "Shot Director",
    title: "Multi-App Adaptation",
    text: "Prompts start with shared cinematic vocabulary then include tweaks for the specific app (Grok Imagine, Midjourney, Runway, Kling, Veo, or a mix). Just name the app when you send a scene.",
    link: "bots/shot-director.html#app-adaptation"
  },
  {
    id: "shot-library",
    bot: "Shot Director",
    title: "Personal Shot Library",
    text: "Keeps a personal library of shot types and prompts that worked for you. Helps plan full shot lists for short stories. Offer to generate a test image when useful.",
    link: "bots/shot-director.html#personal-library"
  },
  {
    id: "shot-example",
    bot: "Shot Director",
    title: "Example Scene Starters",
    text: "Starter examples: an old man waiting alone at a rainy bus stop at night, or a woman finds an old letter in the attic. Describe however it comes to you, even rough.",
    link: "bots/shot-director.html#getting-started"
  },
  {
    id: "shot-camera-reference",
    bot: "Shot Director",
    title: "Camera Directions Reference Sheet",
    text: "A 30-entry visual reference sheet for shot sizes, camera angles, camera movements, and lenses, with example images and copy-ready prompt phrases for AI short story videos. Use it to pick framing, angle, movement, and lens wording for prompts.",
    link: "bots/shot-director.html#camera-directions-reference"
  },
  {
    id: "project-dance",
    bot: "Projects",
    title: "Greek Dance Storyboard",
    text: "Current project with G Bot involving orbit and arc shots of robed dancers. Focus on character face and costume preservation, AI video technique experiments, and finding reliable camera moves.",
    link: "index.html#greek-dance-storyboard"
  },
  {
    id: "project-cinematic",
    bot: "Projects",
    title: "Cinematic Short Stories",
    text: "AI-generated short story videos combining image generation, video, voice, and editing. Emphasis on character consistency across shots and cinematic quality.",
    link: "index.html#cinematic-short-stories"
  },
  {
    id: "grok-files-drive",
    bot: "Dashboard",
    title: "Grok Files (Google Drive)",
    text: "All of Kory's Grok project files in one private Google Drive folder, organized into categories: Dashboard archives, Videos and Storyboards, Characters and Reference Images, Prompts and Camera Guides, and Stories and Scripts. The folder is private to Kory's Google account and opens in a new tab.",
    link: "index.html#grok-files-drive"
  },
  {
    id: "ai-apps",
    bot: "Dashboard",
    title: "My AI Apps",
    text: "Quick links to Kory's AI apps: Grok for chat, image and video generation; Gemini for research and writing; Google Flow for AI filmmaking; Artlist for music, SFX, stock footage and AI tools; and ElevenLabs for AI voice and text-to-speech.",
    link: "index.html#ai-apps"
  }
];

let pipeline = null;
let chunkEmbeddings = [];
let isReady = false;

async function initSearch() {
  const statusEl = document.getElementById('search-status');
  statusEl.textContent = 'Loading embedding model (first time ~30MB, then cached)...';
  
  try {
    // Dynamically import Transformers.js from CDN
    const { pipeline: createPipeline } = await import('https://cdn.jsdelivr.net/npm/@huggingface/transformers@3.7.1');
    pipeline = await createPipeline('feature-extraction', 'Xenova/all-MiniLM-L6-v2', {
      quantized: true
    });
    
    statusEl.textContent = 'Embedding research index...';
    
    // Embed all chunks
    for (const chunk of RESEARCH_CHUNKS) {
      const output = await pipeline(chunk.text, { pooling: 'mean', normalize: true });
      chunkEmbeddings.push(Array.from(output.data));
    }
    
    isReady = true;
    statusEl.textContent = 'Search ready. Try: "orbit faces", "character sheet", "4K editing", "lighting prompt"';
    document.getElementById('search-input').disabled = false;
  } catch (err) {
    console.error(err);
    statusEl.textContent = 'Search failed to load. Check console. (Requires modern browser with WebAssembly)';
  }
}

function cosineSimilarity(a, b) {
  let dot = 0, normA = 0, normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

async function performSearch(query) {
  if (!isReady || !query.trim()) return;
  
  const resultsEl = document.getElementById('search-results');
  resultsEl.innerHTML = '<div class="meta">Searching...</div>';
  
  try {
    const queryOutput = await pipeline(query, { pooling: 'mean', normalize: true });
    const queryEmb = Array.from(queryOutput.data);
    
    const scored = RESEARCH_CHUNKS.map((chunk, i) => ({
      ...chunk,
      score: cosineSimilarity(queryEmb, chunkEmbeddings[i])
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .filter(r => r.score > 0.25); // relevance threshold
    
    if (scored.length === 0) {
      resultsEl.innerHTML = '<div class="meta">No strong matches. Try different wording.</div>';
      return;
    }
    
    resultsEl.innerHTML = scored.map(r => `
      <div class="search-result">
        <div class="result-header">
          <strong>${r.title}</strong>
          <span class="badge">${r.bot}</span>
          <span class="score">${(r.score * 100).toFixed(0)}% match</span>
        </div>
        <p>${r.text}</p>
        <a href="${r.link}" class="result-link">View in ${r.bot} →</a>
      </div>
    `).join('');
  } catch (err) {
    resultsEl.innerHTML = '<div class="meta">Search error. See console.</div>';
    console.error(err);
  }
}

// Initialize on load
document.addEventListener('DOMContentLoaded', () => {
  initSearch();
  
  const input = document.getElementById('search-input');
  let timeout;
  input.addEventListener('input', (e) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => performSearch(e.target.value), 400);
  });
});
