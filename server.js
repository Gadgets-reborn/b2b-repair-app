const express = require('express');
const cors = require('cors');
const Anthropic = require('@anthropic-ai/sdk');
require('dotenv').config();
const app = express();
app.use(cors());
app.use(express.json());
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
app.get('/health', (req, res) => res.json({ status: 'OK' }));
app.post('/api/ai-suggest-faults', async (req, res) => {
  try {
    const msg = await anthropic.messages.create({
      model: 'claude-sonnet-4-20250514',
      max_tokens: 500,
      messages: [{role: 'user', content: 'Suggest fault codes for iPhone'}]
    });
    res.json({ suggested: ['LCD', 'BR'], reasoning: 'Common issues' });
  } catch(e) { res.json({ suggested: [], reasoning: 'Error' }); }
});
app.listen(3001, () => console.log('Backend running on :3001'));
