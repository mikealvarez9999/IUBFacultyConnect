'use client';

import React from "react";

interface StaffProps {
  id: string;
  name: string;
  position?: string;
  image?: string;
  email?: string;
  officeAddress?: string;
  showViewMore?: boolean;
  slug?: string;
}

export default function StaffCard({ id, name, position, image, email, officeAddress, showViewMore, slug }: StaffProps) {
  return (
    <div key={id} className="border p-4 rounded flex flex-col items-center">
      {image && <img src={image} alt={name} className="w-24 h-24 rounded-full object-cover mb-3" />}
      <h2 className="font-semibold text-center">{name}</h2>
      {position && <p className="text-sm text-gray-600 text-center">{position}</p>}
      {email && <p className="text-sm text-blue-600 truncate">{email}</p>}
      {officeAddress && <p className="text-sm text-gray-500">{officeAddress}</p>}
      {showViewMore && slug && (
        <a
          href={`https://iub.ac.bd/faculties/${slug}`}
          target="_blank"
          className="mt-3 text-sm bg-gray-100 px-3 py-1 rounded hover:bg-gray-200"
        >
          View More
        </a>
      )}
    </div>
  );
}
