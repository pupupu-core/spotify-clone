export type DeveloperId =
  | 'firstDeveloper'
  | 'secondDeveloper'
  | 'thirdDeveloper'
  | 'fourthDeveloper';

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
