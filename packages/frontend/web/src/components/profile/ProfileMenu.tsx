import { useProfile } from '@/contexts/ProfileContext';

import Button from '../Button';
import Card from '../home/Card';
import BookIcon from '../icons/BookIcon';
import CodeIcon from '../icons/CodeIcon';
import CrossIcon from '../icons/CrossIcon';
import DateIcon from '../icons/DateIcon';
import GenderIcon from '../icons/GenderIcon';
import GitHubIcon from '../icons/GitHubIcon';
import LikeIcon from '../icons/LikeIcon';
import LocationIcon from '../icons/LocationIcon';
import TechnoIcon from '../icons/TechnoIcon';
import UserIcon from '../icons/UserIcon';
import CircularProgressBar from './CircularProgressBar';
import ProfileMenuLine from './ProfileMenuLine';
import ShowCard from './ShowCard';

export default function ProfileMenu() {
  // Get data about logged in user, birthdate formatted, age and percentage from the ProfileContext
  const {
    user,
    birthdateFormatted,
    age,
    percentage,
    isToogleModal,
    setIsToogleModal,
  } = useProfile();

  // If fetch data about logged in user is undefined, return nothing
  if (!user) {
    return (
      <div className='w-full'>
        <p className='text-secondary'>{`User profile not found !`}</p>
      </div>
    );
  }

  // Create an array with all data about logged in user
  // Used to map in the JSX
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
    <div className='flex h-full w-full flex-col items-center justify-between gap-10'>
      {/* Modal card */}
      {isToogleModal ? (
        <div
          className='absolute top-0 z-40 flex h-full w-full items-start justify-center bg-black/80 backdrop-blur-md'
          onClick={() => {
            setIsToogleModal(false); // Close the modal card when clicking outside of it
          }}
        >
          <button
            type='button'
            onClick={() => {
              setIsToogleModal(false); // Close the modal card when clicking on the cross
            }}
            className='absolute left-2 top-3 h-6 w-6 sm:left-5 sm:top-5'
          >
            <CrossIcon className='fill-white' />
          </button>
          <div
            className='font-base mx-auto mt-20 flex h-full max-h-[700px] w-full max-w-[500px] flex-col justify-between gap-5 overflow-y-auto px-2 text-white'
            onClick={(event) => {
              event.stopPropagation(); // Prevent the modal card to close when clicking on it
            }}
          >
            <Card user={user} />
          </div>
        </div>
      ) : undefined}

      {/* Icon to display the modal card */}
      <div className='bg-light-medium relative mx-auto flex w-full max-w-[500px] flex-col items-center'>
        <div className='absolute right-0 top-0'>
          <ShowCard
            onClick={() => {
              setIsToogleModal(true); // Open the modal card
            }}
          />
        </div>

        {/* Picture of the user + circle progress bar */}
        <CircularProgressBar percentage={percentage} circleWidth={200}>
          <div className='h-36 w-36 overflow-hidden rounded-full'>
            <img src={user.pictures[0].picture_path} alt='' />
          </div>
        </CircularProgressBar>

        <p className='text-secondary mb-8 mt-4 text-xl'>
          {`${user.name}, `}
          <span>{`${age} years`}</span>
        </p>

        <section className='flex w-full flex-col gap-[2px] overflow-hidden rounded-lg'>
          {/* Display all data about the logged in user */}
          {userData.map((data) => (
            <ProfileMenuLine
              key={data.id}
              icon={data.icon}
              isEmpty={data.isEmpty}
            >
              {data.content}
            </ProfileMenuLine>
          ))}
        </section>
      </div>
      <Button type='button' isOutline={false}>
        {`Logout`}
      </Button>
    </div>
  );
}
