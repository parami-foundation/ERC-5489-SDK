export interface Character {
  name: string;
  id: string;
  avatar: string;
  avatarKey: string;
  background: string;
}

export const characters: Character[] = [
  {
    name: 'Adam Jones',
    id: '1',
    avatar: 'https://pbs.twimg.com/profile_images/1580754592052129795/sbX8c7Zk.jpg',
    avatarKey: 'sbX8c7Zk',
    background: 'https://pbs.twimg.com/profile_banners/1198940533621551105/1651744578/600x200'
  },
  {
    name: 'Elon Musk',
    id: '7',
    avatar: 'https://pbs.twimg.com/profile_images/1683325380441128960/yRsRRjGO.jpg',
    avatarKey: 'yRsRRjGO',
    background: 'https://pbs.twimg.com/media/F1toFHCXoAA7fUK?format=jpg&name=small'
  },
  {
    name: 'Justin Sun',
    id: '2',
    avatar: 'https://pbs.twimg.com/profile_images/1490173066357342208/MZyfamFE.jpg',
    avatarKey: 'MZyfamFE',
    background: 'https://pbs.twimg.com/media/F1-A-_zWEAQKgzp?format=jpg&name=small'
  }
];
