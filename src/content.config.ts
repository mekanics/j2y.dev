import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const clients = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/clients' }),
  schema: ({ image }) => z.object({
    name: z.string(),
    logo: image(),
    url: z.string().url().optional(),
    industry: z.string().optional(),
    order: z.number().default(99),
  }),
});

const work = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/work' }),
  schema: z.object({
    title: z.string(),
    // client matches the `name` field in the clients collection — could become a reference later
    client: z.string(),
    agency: z.string().optional(),
    role: z.string(),
    stack: z.array(z.string()),
    description: z.string(),
    startYear: z.number(),
    endYear: z.number().optional(), // omit for ongoing
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
  }),
});

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    stack: z.array(z.string()),
    url: z.string().optional(),
    github: z.string().optional(),
    status: z.enum(['live', 'complete', 'in-progress', 'archived']),
    featured: z.boolean().optional().default(false),
    draft: z.boolean().optional().default(false),
  }),
});

const til = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/til' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    tags: z.array(z.string()),
    description: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { clients, work, projects, til };
