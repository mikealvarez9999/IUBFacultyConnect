'use client';
import React from "react";

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export default function Pagination({ totalPages, currentPage, onPageChange }: PaginationProps) {
  return (
    <div className="flex justify-center gap-2 mt-6 flex-wrap">
      {Array.from({ length: totalPages }, (_, idx) => (
        <button
          key={idx + 1}
          onClick={() => onPageChange(idx + 1)}
          className={`px-3 py-1 rounded border ${currentPage === idx + 1 ? "bg-blue-800 hover:bg-blue-900 text-white" : "bg-white hover:bg-blue-900 hover:text-white text-blue-800 border-blue-800"}`}
        >
          {idx + 1}
        </button>
      ))}
    </div>
  );
}
