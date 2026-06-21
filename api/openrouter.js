export default async function handler(req, res) {
  // CORS configuration
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,POST');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { input, playgroundType } = req.body;
  const apiKey = process.env.OPENROUTER_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'OpenRouter API Key not configured' });
  }

  if (!input || !playgroundType) {
    return res.status(400).json({ error: 'Missing input or playgroundType' });
  }

  let systemPrompt = '';
  if (playgroundType === 'lead-qualifier') {
    systemPrompt = `You are an AI Lead Qualifier. Analyze the following user input and return a JSON object with strictly these keys: "status" (e.g. URGENT, COLD, WARM), "action" (e.g. Forward to WhatsApp, Add to CRM, Nurture Sequence), "budget" (e.g. High, Medium, Low, or Unknown), "location" (extracted from text or "Unknown"). Do not output anything other than raw JSON. No markdown block formatting.`;
  } else if (playgroundType === 'invoice-reader') {
    systemPrompt = `You are an AI Invoice Data Extractor. Analyze the following input (simulated OCR text of an invoice) and extract data into a JSON object with strictly these keys: "vendor" (string), "gst" (string, look for standard Indian GST IN formats if applicable), "total" (string with currency symbol), "items" (integer count of items mentioned or estimated). If data is missing, use "N/A" or "0". Do not output anything other than raw JSON. No markdown block formatting.`;
  } else if (playgroundType === 'hinglish-parser') {
    systemPrompt = `You are a Hinglish Parser. Analyze the following Hinglish (Hindi + English) text and extract intent. Return a JSON object with strictly these keys: "intent" (e.g. Schedule Meeting, Query, Complaint, Greeting), "time" (e.g. 16:00 or N/A), "platform" (e.g. Calendar Entry, Email, WhatsApp), "language" (e.g. Hinglish). Do not output anything other than raw JSON. No markdown block formatting.`;
  } else {
    return res.status(400).json({ error: 'Invalid playgroundType' });
  }

  try {
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'https://aiflowix.in',
        'X-Title': 'AIFlowix Automation Lab',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash-free', // Using free, highly capable Google model
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: input }
        ]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('OpenRouter API Error:', err);
      return res.status(500).json({ error: 'Failed to communicate with AI provider' });
    }

    const data = await response.json();
    const resultText = data.choices[0].message.content;
    
    // Parse the JSON string from the AI (handles case where model ignores 'no markdown' instruction)
    let parsedResult;
    try {
      const cleanedText = resultText.replace(/```json/g, '').replace(/```/g, '').trim();
      parsedResult = JSON.parse(cleanedText);
    } catch (e) {
      console.error('Failed to parse AI response as JSON:', resultText);
      parsedResult = { error: 'Failed to generate valid JSON. Raw output: ' + resultText.substring(0, 50) + '...' };
    }

    return res.status(200).json(parsedResult);
  } catch (error) {
    console.error('Handler Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
