import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { APP_NAME } from '~/core/constants/common.constants';
import { NgOptimizedImage } from '@angular/common';

type DeveloperId = 'firstDeveloper' | 'secondDeveloper' | 'thirdDeveloper' | 'fourthDeveloper';

interface DeveloperInfo {
  name: string;
  fullName: string;
  id: DeveloperId;
  description: string;
  githubLink: string;
  imgUrl: string;
  badge: string[];
}

@Component({
  selector: 'ppf-about-us-page',
  imports: [NgOptimizedImage],
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
    },
    {
      name: 'Nikita',
      fullName: 'Nikita Melnikov',
      id: 'fourthDeveloper',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ducimus esse est ex in neque non quis ' +
        'rerum tempora voluptatibus?',
      githubLink: 'https://github.com/tryproxy',
      imgUrl: 'https://avatars.githubusercontent.com/u/56947738?v=4',
      badge: ['Frontend', 'Backend', 'Infrastructure'],
    },
  ];

  public ngOnInit(): void {
    document.body.style.overflow = 'hidden';

    setTimeout(() => (document.body.style.overflow = ''), 1500);
  }
}
