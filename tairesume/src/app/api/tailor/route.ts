import { NextRequest } from 'next/server';
import OpenAI from 'openai';

const nvidiaClient = new OpenAI({
  apiKey: process.env.NVIDIA_API_KEY || '',
  baseURL: 'https://integrate.api.nvidia.com/v1',
});

const groqClient = new OpenAI({
  apiKey: process.env.GROQ_API_KEY || '',
  baseURL: 'https://api.groq.com/openai/v1',
});

const SYSTEM_PROMPT = `You are an expert resume tailor. Your task is to modify a resume source to perfectly match a job description.

RULES:
1. Output ONLY valid Typst markup. No markdown, no explanations, no commentary.
2. If the source resume is Typst, preserve the original Typst formatting conventions (headings, bullet points, layout commands).
3. If the source resume is plain text extracted from a PDF, convert it into clean, professional Typst markup.
3. Analyze the job description for key requirements, skills, and keywords.
4. Restructure and reword resume sections to highlight the most relevant experience.
5. Incorporate selected projects that match the role — emphasize relevant skills and outcomes.
6. Use action verbs and quantifiable achievements where possible.
7. Keep the resume concise — no longer than the original.
8. Do NOT fabricate experience or skills. Only restructure and reword existing content.
9. Maintain professional tone throughout.
10. Return the COMPLETE modified Typst resume from start to finish.`;

export async function POST(request: NextRequest) {
  try {
    const { resume, jobDescription, selectedProjects, model } = await request.json();

    if (!resume || !jobDescription) {
      return Response.json({ error: 'Resume and job description are required' }, { status: 400 });
    }

    const projectContext = selectedProjects?.length
      ? `\n\nPROJECTS TO EMPHASIZE:\n${selectedProjects.map((p: { name: string; desc: string; skills: string[] }) =>
          `- ${p.name}: ${p.desc} (Skills: ${p.skills.join(', ')})`
        ).join('\n')}`
      : '';

    const userPrompt = `CURRENT RESUME SOURCE:
\`\`\`typst
${resume}
\`\`\`

JOB DESCRIPTION:
${jobDescription}
${projectContext}

  Now produce the tailored Typst resume. Output ONLY the Typst code, nothing else.`;

    const client = model === 'advanced' ? groqClient : nvidiaClient;
    const modelId = model === 'advanced' ? 'llama-3.1-8b-instant' : 'google/gemma-2-2b-it';

    const stream = await client.chat.completions.create({
      model: modelId,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.3,
      top_p: 0.8,
      max_tokens: 4096,
      stream: true,
    });

    // Create a ReadableStream from the OpenAI stream
    const encoder = new TextEncoder();
    const readable = new ReadableStream({
      async start(controller) {
        try {
          for await (const chunk of stream) {
            const content = chunk.choices[0]?.delta?.content;
            if (content) {
              controller.enqueue(encoder.encode(content));
            }
          }
          controller.close();
        } catch (err) {
          controller.error(err);
        }
      },
    });

    return new Response(readable, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    });
  } catch (error) {
    console.error('Tailor API error:', error);
    return Response.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 }
    );
  }
}
