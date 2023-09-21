import React, { useEffect, useState } from 'react';
import { redirect, useLoaderData } from 'react-router-dom';
import { auth } from '../firebase.config';

import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import pinkSkyImage from '../assets/pink_sky.jpg';
import greenHeartsImage from "../assets/green_hearts.jpg";
import brownHeartsImage from '../assets/brown_hearts.jpg';
import pinkHeartsImage from '../assets/pink_hearts.jpg';
import yellowSkyImage from '../assets/yellow_sky.jpg';

export async function loader() {
  const user = auth.currentUser;

  if (!user) throw redirect('/signin');

  return user;
}

export default function HomePage() {
  const [searchInput, setSearchInput] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [photos, setPhotos] = useState([
    { img: pinkSkyImage, name: "pink_sky" },
    { img: greenHeartsImage, name: "green_hearts" },
    { img: brownHeartsImage, name: "brown_hearts" },
    { img: pinkHeartsImage, name: "pink_hearts" },
    { img: yellowSkyImage, name: "yellow_sky" },
  ]);

  // Simulate loading effect
  setInterval(() => {
    setIsLoading(false);
  }, 2000);

  const onSortEnd = (oldIndex, newIndex) => {
    setPhotos(array => arrayMoveImmutable(array, oldIndex, newIndex));
  };

  return (
    <div className='px-5 py-4 min-h-screen'>
      <h1 className='text-2xl font-bold mb-2'>Pick a wallpaper from the gallery</h1>
      <p className='italic mb-4 tex-slate-500'>
        You can rearrange them however you like
      </p>
      <form className='mb-3'>
        <input
          type='search'
          placeholder='Which wallpaper are you looking for?'
          className='w-full border bg-slate-100 px-4 py-2 rounded-md'
          onChange={e => setSearchInput(e.target.value)}
        />
      </form>

      <p className='mb-2 text-red-500 text-semibold md:hidden'>
        Long Press to drag the images to its new position
      </p>

      {isLoading ? (
        <SkeletonTheme baseColor='#313131' highlightColor='#525252'>
          <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3'>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
            <div>
              <div className='h-44'>
                <Skeleton className='w-full h-full' />
              </div>
            </div>
          </div>
        </SkeletonTheme>
      ) : (
        <SortableList
          onSortEnd={onSortEnd}
          className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3'
          draggedItemClassName='dragged'
        >
          {photos
            .filter(photo => {
              return searchInput.toLowerCase() === ''
                ? photo
                : photo.name.toLowerCase().includes(searchInput.toLowerCase());
            })
            .map((item, i) => (
              <SortableItem key={i}>
                <div className='h-56 border border-transparent relative'>
                  <img
                    src={item.img}
                    alt={item.name}
                    className=' w-full h-full object-cover object-top'
                  />
                  <p className='absolute bottom-5 left-1/2 -translate-x-1/2 inline-block bg-black text-white px-3 py-1 rounded-md'>
                    {item.name}
                  </p>
                </div>
              </SortableItem>
            ))}
        </SortableList>
      )}
    </div>
  );
}
