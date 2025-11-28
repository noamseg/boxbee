import OpenAI from 'openai';

class AIService {
  private openai: OpenAI | null = null;

  constructor() {
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY,
      });
    }
  }

  /**
   * Check if AI service is available
   */
  isAvailable(): boolean {
    return this.openai !== null;
  }

  /**
   * Estimate time duration for a task using AI
   */
  async estimateTaskDuration(taskName: string): Promise<{
    estimatedDuration: number;
    confidence: 'high' | 'medium' | 'low';
    reasoning: string;
  }> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `You are a productivity assistant helping users estimate how long tasks will take.

Task: "${taskName}"

Please estimate how long this task will take in minutes. Consider:
- The complexity and scope of the task
- Typical time requirements for similar tasks
- A realistic focused work session duration

Respond with a JSON object in this exact format:
{
  "estimatedDuration": <number in minutes, between 15 and 120>,
  "confidence": "<high|medium|low>",
  "reasoning": "<brief 1-sentence explanation>"
}`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful productivity assistant. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 200,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const parsed = JSON.parse(response);

      // Validate and clamp duration
      const duration = Math.max(15, Math.min(120, parsed.estimatedDuration));

      return {
        estimatedDuration: duration,
        confidence: parsed.confidence || 'medium',
        reasoning: parsed.reasoning || 'AI estimation based on task complexity',
      };
    } catch (error) {
      console.error('Error estimating task duration:', error);
      // Fallback to default duration
      return {
        estimatedDuration: 30,
        confidence: 'low',
        reasoning: 'Default estimation due to AI service error',
      };
    }
  }

  /**
   * Break down a complex task into smaller subtasks
   */
  async breakdownTask(taskName: string): Promise<{
    subtasks: string[];
    suggestion: string;
  }> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `You are a productivity assistant helping users break down complex tasks.

Task: "${taskName}"

If this task is complex enough to benefit from breaking down into smaller subtasks, suggest 2-4 focused subtasks.
If the task is already focused and specific, indicate that it doesn't need breakdown.

Respond with a JSON object in this exact format:
{
  "needsBreakdown": <true|false>,
  "subtasks": [<array of 2-4 subtask strings, or empty array if needsBreakdown is false>],
  "suggestion": "<brief message to the user>"
}`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful productivity assistant. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.7,
        max_tokens: 300,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const parsed = JSON.parse(response);

      return {
        subtasks: parsed.subtasks || [],
        suggestion: parsed.suggestion || 'Task analysis complete',
      };
    } catch (error) {
      console.error('Error breaking down task:', error);
      return {
        subtasks: [],
        suggestion: 'Unable to analyze task at this time',
      };
    }
  }

  /**
   * Parse natural language input into structured task data
   */
  async parseNaturalLanguageTask(input: string): Promise<{
    taskName: string;
    suggestedDuration?: number;
    category?: string;
  }> {
    if (!this.openai) {
      throw new Error('OpenAI API key not configured');
    }

    const prompt = `You are a productivity assistant parsing natural language task descriptions.

User input: "${input}"

Extract the core task name and any mentioned duration or category. Examples:
- "Write blog post for 45 minutes" → task: "Write blog post", duration: 45
- "30 min email catch up" → task: "Email catch up", duration: 30
- "Code review" → task: "Code review", duration: null

Respond with a JSON object in this exact format:
{
  "taskName": "<clear, concise task name>",
  "suggestedDuration": <number in minutes or null>,
  "category": "<email|writing|coding|meeting|creative|admin or null>"
}`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a helpful productivity assistant. Always respond with valid JSON only.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.5,
        max_tokens: 150,
      });

      const response = completion.choices[0]?.message?.content;
      if (!response) {
        throw new Error('No response from OpenAI');
      }

      const parsed = JSON.parse(response);

      return {
        taskName: parsed.taskName || input,
        suggestedDuration: parsed.suggestedDuration || undefined,
        category: parsed.category || undefined,
      };
    } catch (error) {
      console.error('Error parsing natural language:', error);
      // Fallback to raw input
      return {
        taskName: input,
      };
    }
  }

  /**
   * Generate personalized coaching message based on user's focus data
   */
  async generateCoachingMessage(context: {
    recentBoxes: Array<{
      taskName: string;
      focusQuality: string;
      completionStatus: string;
    }>;
    timeOfDay: string;
  }): Promise<string> {
    if (!this.openai) {
      return 'Keep up the great work! 🐝';
    }

    const prompt = `You are BoxBee, a friendly and encouraging productivity coach.

Recent user activity:
${context.recentBoxes.map(b => `- ${b.taskName}: ${b.focusQuality} focus, ${b.completionStatus}`).join('\n')}

Time of day: ${context.timeOfDay}

Generate a brief (1-2 sentences), personalized, encouraging message for the user. Be warm, supportive, and actionable. Use the bee theme subtly if appropriate.`;

    try {
      const completion = await this.openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are BoxBee, a friendly productivity coach. Keep messages brief and encouraging.',
          },
          {
            role: 'user',
            content: prompt,
          },
        ],
        temperature: 0.8,
        max_tokens: 100,
      });

      return completion.choices[0]?.message?.content || 'Keep up the great work! 🐝';
    } catch (error) {
      console.error('Error generating coaching message:', error);
      return 'Keep up the great work! 🐝';
    }
  }
}

export default new AIService();
