import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import type { UserBody } from '@app/shared';

import { useInteraction } from '@/contexts/InteractionContext';

import Badge from '../Badge';
import GitHubIcon from '../icons/GitHubIcon';
import LocationIcon from '../icons/LocationIcon';
import CardSection from './CardSection';

interface CardProps {
  readonly user: UserBody;
}

export default function Card({ user }: CardProps) {
  const [age, setAge] = useState<number>(0);
  const { distance } = useInteraction();

  // Calculate the age of the user
  useEffect(() => {
    if (user.birthdate) {
      const currentDate = new Date();
      const birthdate = new Date(user.birthdate);
      const userAge = currentDate.getFullYear() - birthdate.getFullYear();

      setAge(userAge);
    }
  }, [user.birthdate]);

  return (
    <div className='bg-light flex-1 overflow-y-auto rounded-lg shadow-lg'>
      <div className='relative h-full'>
        <div className='absolute bottom-0 left-0 h-80 w-full bg-gradient-to-t from-black to-black/0' />
        <div className='absolute bottom-0 left-0 flex w-full flex-col justify-between p-3'>
          <div className='flex'>
            <div className='w-[90%]'>
              <p className='mb-4 text-xl'>{`${user.name} • ${age}`}</p>
              <div className='flex flex-col gap-6'>
                <div className='text-secondary flex flex-wrap gap-2'>
                  {user.hobbies.map((hobby) => (
                    <div key={hobby.id}>
                      <Badge>
                        <div className='w-4'>
                          <img src={hobby.logo_path} alt={hobby.category} />
                        </div>
                        <p className='text-xs'>
                          {hobby.name.charAt(0).toUpperCase() +
                            hobby.name.slice(1)}
                        </p>
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className='align-center flex gap-2'>
                  <LocationIcon className='fill-primary w-4' />
                  <p className='translate-y-[1px] truncate text-sm'>
                    {user.city.city_name} <span>{`• ${distance} km`}</span>
                  </p>
                </div>
              </div>
            </div>
            <div className='flex w-[10%] min-w-[70px] items-end'>
              <div className='pl-3'>
                <img
                  src={user.languages[0].logo_path}
                  alt={user.languages[0].name}
                  className='h-full w-full object-cover object-center'
                />
              </div>
            </div>
          </div>
        </div>
        <div className='flex h-full w-full items-center justify-center'>
          <img
            src={user.pictures[0].picture_path}
            alt={` Picture of ${user.name} `}
            className='h-full w-full object-cover object-center'
          />
        </div>
      </div>

      <CardSection title={'About Me'} isBorder>
        <p className='text-sm'>{user.biography}</p>
        <div className='mt-10 flex items-center gap-1'>
          <GitHubIcon className={'fill-secondary'} />
          {Boolean(user.account_github) ? (
            <Link to={user.account_github || ''}>
              <p className='text-primary underline-primary cursor-pointer text-sm underline-offset-2'>
                {user.account_github}
              </p>
            </Link>
          ) : (
            <p className='text-sm'>{`No GitHub account.`}</p>
          )}
        </div>
      </CardSection>

      <CardSection title={'My languages'} isBorder>
        <div className='grid grid-cols-6 gap-2'>
          {user.languages.map((language) => (
            <div key={language.id} className='text-center text-xs'>
              <img src={language.logo_path} alt={`Logo ${language.name}`} />
              <p>
                {language.name.charAt(0).toUpperCase() + language.name.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </CardSection>

      <CardSection title={'My technologies'} isBorder>
        <div className='grid grid-cols-6 gap-2'>
          {user.technologies.map((technology) => (
            <div key={technology.id} className='text-center text-xs'>
              <img src={technology.logo_path} alt={`Logo ${technology.name}`} />
              {technology.name.charAt(0).toUpperCase() +
                technology.name.slice(1)}
            </div>
          ))}
        </div>
      </CardSection>

      <CardSection title={'My photo gallery'} isBorder={false}>
        <div className='flex flex-col gap-2'>
          {user.pictures.map((picture, index) => (
            <div
              key={picture.id}
              className='h-full max-h-[496px] min-h-[296px] w-full min-w-[296px] max-w-[496px] overflow-hidden'
            >
              <img
                src={picture.picture_path}
                alt={`Picture of ${user.name} number ${index + 1}`}
                className='h-full w-full scale-110 object-cover object-center'
              />
            </div>
          ))}
        </div>
      </CardSection>
    </div>
  );
}
