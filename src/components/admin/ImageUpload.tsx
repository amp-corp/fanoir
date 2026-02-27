'use client';

import { useState, useRef, useCallback } from 'react';

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
}

export default function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const upload = useCallback(
    async (file: File) => {
      setError('');
      setUploading(true);

      const formData = new FormData();
      formData.append('file', file);

      try {
        const res = await fetch('/api/admin/upload', {
          method: 'POST',
          body: formData,
        });
        const data = await res.json();

        if (!res.ok) {
          setError(data.error || 'Upload failed');
          return;
        }

        onChange(data.url);
      } catch {
        setError('Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [onChange],
  );

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) upload(file);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) upload(file);
  }

  // Show preview with change button when URL exists
  if (value && !uploading) {
    return (
      <div className="flex flex-col gap-2">
        <div className="relative w-full h-48 bg-gray-50 rounded-lg border border-gray-200 overflow-hidden">
          <img
            src={value}
            alt="Preview"
            className="w-full h-full object-contain"
          />
        </div>
        <div className="flex items-center gap-2">
          <input
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#d0b476]"
          />
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="px-3 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            Change
          </button>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            onChange={handleFileChange}
            className="hidden"
          />
        </div>
        {error && <p className="text-xs text-red-500">{error}</p>}
      </div>
    );
  }

  // Drop zone for initial upload
  return (
    <div className="flex flex-col gap-2">
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => !uploading && inputRef.current?.click()}
        className={`flex flex-col items-center justify-center w-full h-40 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
          dragOver
            ? 'border-[#d0b476] bg-[#d0b476]/5'
            : 'border-gray-300 hover:border-gray-400'
        } ${uploading ? 'pointer-events-none opacity-60' : ''}`}
      >
        {uploading ? (
          <div className="flex flex-col items-center gap-2">
            <div className="w-6 h-6 border-2 border-gray-300 border-t-[#d0b476] rounded-full animate-spin" />
            <span className="text-xs text-gray-500">Uploading...</span>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-1">
            <svg
              className="w-8 h-8 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span className="text-xs text-gray-500">
              Click or drag image here
            </span>
            <span className="text-xs text-gray-400">
              JPEG, PNG, WebP (max 5MB)
            </span>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}
