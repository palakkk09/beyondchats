const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

/**
 * Rewrite article using reference articles
 */
async function rewriteArticle(original, ref1, ref2, refLinks) {
  const prompt = `
You are a content editor.

Original Article:
${original}

Reference Article 1:
${ref1}

Reference Article 2:
${ref2}

Rewrite the original article to improve clarity and structure.
Do not copy text.
Keep it natural and human-written.

At the end, add:
References:
- ${refLinks[0]}
- ${refLinks[1]}
`;

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.7
  });

  return response.choices[0].message.content;
}

module.exports = {
  rewriteArticle
};
