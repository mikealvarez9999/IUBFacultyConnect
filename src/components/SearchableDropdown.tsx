'use client';

import React, { useState, useRef, useEffect } from 'react';

interface SearchableDropdownProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: string[];
  placeholder?: string;
}

export default function SearchableDropdown({
  label,
  value,
  onChange,
  options,
  placeholder = 'Select...',
}: SearchableDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Filter options based on search term
  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelect = (option: string) => {
    onChange(option);
    setIsOpen(false);
    setSearchTerm('');
  };

  const handleClear = () => {
    onChange('');
    setSearchTerm('');
  };

  return (
    <div ref={dropdownRef} className="relative">
      <label className="block text-lg font-bold text-[#7C3AED] mb-2 tracking-wide">
        {label}
      </label>
      
      <div className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-2.5 text-left bg-white border border-[#E5E7EB] rounded-[10px] focus:ring-2 focus:ring-[#A78BFA] focus:border-[#A78BFA] transition-all duration-200 text-sm"
        >
          <span className={value ? 'text-[#1E1E1E]' : 'text-[#6B7280]'}>
            {value || placeholder}
          </span>
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#6B7280]">
            {isOpen ? '▲' : '▼'}
          </span>
        </button>

        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-10 top-1/2 -translate-y-1/2 text-[#6B7280] hover:text-[#1E1E1E] transition-colors"
          >
            ✕
          </button>
        )}

        {isOpen && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-[#E5E7EB] rounded-[10px] shadow-lg max-h-64 overflow-hidden">
            <div className="p-2 border-b border-[#E5E7EB]">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search..."
                className="w-full px-3 py-2 text-sm border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#A78BFA] focus:border-[#A78BFA] transition-all duration-200"
                autoFocus
              />
            </div>
            
            <div className="max-h-48 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                <>
                  {value && (
                    <button
                      type="button"
                      onClick={handleClear}
                      className="w-full px-4 py-2.5 text-left text-sm text-[#6B7280] hover:bg-[#F7F8FA] transition-colors"
                    >
                      Clear selection
                    </button>
                  )}
                  {filteredOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => handleSelect(option)}
                      className={`w-full px-4 py-2.5 text-left text-sm transition-colors ${
                        value === option
                          ? 'bg-[#A78BFA] bg-opacity-10 text-[#A78BFA] font-semibold'
                          : 'text-[#1E1E1E] hover:bg-[#F7F8FA]'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </>
              ) : (
                <div className="px-4 py-2.5 text-sm text-[#6B7280]">
                  No results found
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
