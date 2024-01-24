import { useProfile } from '@/contexts/ProfileContext';

import Button from '../Button';
import BookIcon from '../icons/BookIcon';
import CodeIcon from '../icons/CodeIcon';
import DateIcon from '../icons/DateIcon';
import GenderIcon from '../icons/GenderIcon';
import GitHubIcon from '../icons/GitHubIcon';
import LikeIcon from '../icons/LikeIcon';
import LocationIcon from '../icons/LocationIcon';
import TechnoIcon from '../icons/TechnoIcon';
import UserIcon from '../icons/UserIcon';
import CircularProgressBar from './CircularProgressBar';
import ProfileMenuLine from './ProfileMenuLine';

export default function ProfileMenu() {
  const { user, birthdateFormatted, age, percentage } = useProfile();

  if (!user) {
    return;
  }

  const userData = [
    {
      id: 1,
      content: user.name,
      icon: <UserIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.name,
    },
    {
      id: 2,
      content: 'Biography',
      icon: <BookIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.biography,
    },
    {
      id: 3,
      content: String(birthdateFormatted),
      icon: <DateIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.birthdate,
    },
    {
      id: 4,
      content: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
      icon: <GenderIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.gender,
    },
    {
      id: 5,
      content: user.city.city_name,
      icon: <LocationIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.city.city_name,
    },
    {
      id: 6,
      content: 'Hobbies',
      icon: <LikeIcon className='fill-secondary h-5 w-5' />,
      isEmpty: user.hobbies.length === 0,
    },
    {
      id: 7,
      content: 'Languages',
      icon: <CodeIcon className='fill-secondary h-5 w-5' />,
      isEmpty: user.languages.length === 0,
    },
    {
      id: 8,
      content: 'Technologies',
      icon: <TechnoIcon className='fill-secondary stroke-secondary h-5 w-5' />,
      isEmpty: user.technologies.length === 0,
    },
    {
      id: 9,
      content: 'Github',
      icon: <GitHubIcon className='fill-secondary h-5 w-5' />,
      isEmpty: !user.account_github,
    },
  ];

  return (
    <>
      <div className='bg-light-medium mx-auto flex h-full w-full max-w-[500px] flex-col items-center'>
        <CircularProgressBar percentage={percentage} circleWidth={200}>
          <div className='h-36 w-36 overflow-hidden rounded-full'>
            <img src={user.pictures[0].picture_path} alt='' />
          </div>
        </CircularProgressBar>

        <p className='text-secondary mb-8 mt-4'>
          {`${user.name}, `}
          <span>{`${age} years`}</span>
        </p>

        <section className='flex max-h-[500px] w-full flex-col gap-[2px] overflow-hidden rounded-lg'>
          <div>
            {userData.map((data) => (
              <ProfileMenuLine
                key={data.id}
                icon={data.icon}
                isEmpty={data.isEmpty}
              >
                {data.content}
              </ProfileMenuLine>
            ))}
          </div>{' '}
        </section>
      </div>
      <Button type='button' isOutline={false}>
        {`Logout`}
      </Button>
    </>
  );
}
