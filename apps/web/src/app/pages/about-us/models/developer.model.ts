export type DeveloperId = 'anastasia' | 'hanna' | 'vsevolod' | 'nikita';

export interface DeveloperInfo {
  name: string;
  fullName: string;
  id: DeveloperId;
  description: string;
  githubLink: string;
  imgUrl: string;
  badge: string[];
  responsibilities: string[];
  stacks?: string[];
}
