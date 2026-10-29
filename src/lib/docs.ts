import { getCollection, type CollectionEntry } from 'astro:content';
import { url } from './url';

export type DocEntry = CollectionEntry<'docs'>;
export const SECTIONS = ['Getting started', 'Layers', 'Extending'] as const;

export async function getDocsNav() {
  const all = await getCollection('docs');
  return SECTIONS.map((section) => ({
    section,
    items: all
      .filter((d) => d.data.section === section)
      .sort((a, b) => a.data.order - b.data.order)
      .map((d) => ({ href: url(`/docs/${d.id}`), title: d.data.title, id: d.id })),
  }));
}
