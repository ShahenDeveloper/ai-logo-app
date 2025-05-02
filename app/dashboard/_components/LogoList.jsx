"use client";
import { UserDetailContex } from '../../_context/UserDetailContext';
import { db } from '../../../configs/FirebaseConfig';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import Image from 'next/image';
import EmptyState from "./EmptyState"
import React, { useContext, useEffect, useState } from 'react';

function LogoList() {
  const { userDetail } = useContext(UserDetailContex);
  const [logoList, setLogoList] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userDetail) {
      GetUserLogos();
    }
  }, [userDetail]);

  const GetUserLogos = async () => {
    setLoading(true);
    try {
      const logosQuery = query(
        collection(db, "users", userDetail?.email, "logos"),
        orderBy("id", "desc")
      );
      const querySnapshot = await getDocs(logosQuery);

      const logos = [];
      querySnapshot.forEach((doc) => {
        logos.push(doc.data());
      });
      setLogoList(logos);
    } catch (e) {
      console.error("Error fetching logos:", e);
    } finally {
      setLoading(false);
    }
  };

  const ViewLogo = (image) => {
    const imageWindow = window.open();
    imageWindow.document.write(`<img src="${image}" alt="Base64 Image" />`);
  };

  return (
    <div className="mt-10 px-4 sm:px-6 lg:px-12 xl:px-20">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className='bg-slate-200 animate-pulse rounded-xl w-full h-[200px]'
            ></div>
          ))
        ) : logoList.length > 0 ? (
          logoList.map((logo, index) => (
            <div
              key={index}
              className='hover:scale-105 transition-transform duration-300 cursor-pointer'
              onClick={() => ViewLogo(logo?.image)}
            >
              <Image
                src={logo?.image}
                width={400}
                height={200}
                className='w-full rounded-xl object-cover'
                alt={logo?.title}
              />
              <h2 className='text-center text-lg font-medium mt-2'>
                {logo?.title}
              </h2>
              <p className='text-sm text-gray-500 text-center'>
                {logo?.desc}
              </p>
            </div>
          ))
        ) : (
          <div className="col-span-full">
            <EmptyState />
          </div>
        )}
      </div>
    </div>
  );
}

export default LogoList;
