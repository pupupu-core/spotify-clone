import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { APP_NAME } from '~/core/constants/common.constants';
import { NgOptimizedImage } from '@angular/common';
import { CardDeveloperComponent } from '~/pages/about-us/component/card-developer/card-developer.component';

type DeveloperId = 'firstDeveloper' | 'secondDeveloper' | 'thirdDeveloper' | 'fourthDeveloper';

export interface DeveloperInfo {
  name: string;
  fullName: string;
  id: DeveloperId;
  description: string;
  githubLink: string;
  imgUrl: string;
  badge: string[];
  responsibilites: string[];
  stacks: string[];
}

@Component({
  selector: 'ppf-about-us-page',
  imports: [NgOptimizedImage, CardDeveloperComponent],
  templateUrl: './about-us-page.component.html',
  styleUrl: './about-us-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AboutUsPageComponent implements OnInit {
  protected readonly APP_NAME = APP_NAME;
  public readonly developers: DeveloperInfo[] = [
    {
      name: 'Anastasia',
      fullName: 'Anastasia Savrukhina',
      id: 'firstDeveloper',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ducimus esse est ex in neque non quis ' +
        'rerum tempora voluptatibus?',
      githubLink: 'https://github.com/savryna',
      imgUrl: 'https://avatars.githubusercontent.com/u/123760669?v=4',
      badge: ['UI/UX', 'Frontend', 'Backend'],
      responsibilites: [
        'Figma mockup',
        'Artist, Album, Library, and About Us pages',
        'Playlist creation and editing',
        'NgRx Signal Store',
        'Backend endpoint integration',
      ],
      stacks: ['Angular', 'NgRx', 'Figma', 'NestJs', 'RxJs'],
    },
    {
      name: 'Hanna',
      fullName: 'Hanna Surmach',
      id: 'secondDeveloper',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ducimus esse est ex in neque non quis ' +
        'rerum tempora voluptatibus?',
      githubLink: 'https://github.com/khasekai',
      imgUrl: 'https://avatars.githubusercontent.com/u/58516288?v=4',
      badge: ['Team Lead', 'Mentoring'],
      responsibilites: [
        'Team mentoring',
        'Task planning and distribution',
        'Technical guidance',
        'Learning materials preparation',
        'Trello management',
      ],
      stacks: ['Angular', 'Trello', 'Figma'],
    },
    {
      name: 'Vsevolod',
      fullName: 'Vsevolod Timoshenko',
      id: 'thirdDeveloper',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ducimus esse est ex in neque non quis ' +
        'rerum tempora voluptatibus?',
      githubLink: 'https://github.com/shoblinsky',
      imgUrl: 'https://avatars.githubusercontent.com/u/123806946?v=4',
      badge: ['Frontend', 'Backend', 'Testing'],
      responsibilites: [
        'Search, 404 page',
        'Music player widget',
        'Playback queue component',
        'Recently played queue',
        'Unit testing setup',
        'Backend endpoint integration',
      ],
      stacks: ['Angular', 'RxJs', 'Vitest', 'NestJs'],
    },
    {
      name: 'Nikita',
      fullName: 'Nikita Melnikov',
      id: 'fourthDeveloper',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ducimus esse est ex in neque non quis ' +
        'rerum tempora voluptatibus?',
      githubLink: 'https://github.com/tryproxy',
      imgUrl: '/img/trypoxy-img.jpg',
      badge: ['Frontend', 'Backend', 'Infrastructure'],
      responsibilites: [
        'Backend architecture and core API setup',
        'Database design and Prisma schema',
        'Swagger setup',
        'Registration, Login and Discovery page',
        'User track upload',
      ],
      stacks: ['Angular', 'RxJs', 'NestJs', 'Docker', 'Prisma', 'PostgreSQL', 'Swagger'],
    },
  ];
  public readonly selectedDeveloper = signal<DeveloperInfo | null>(null);

  public ngOnInit(): void {
    document.body.style.overflow = 'hidden';

    setTimeout(() => (document.body.style.overflow = ''), 1500);
  }
}
