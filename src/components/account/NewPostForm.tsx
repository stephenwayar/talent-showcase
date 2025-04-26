import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import { UseFormReturnType } from '@mantine/form';
import { UseMutationResult } from '@tanstack/react-query';
import { InitialValuesType } from '@/pages/account/PostsPage';
import Input from '../custom/Input';

interface Props {
  mutation: UseMutationResult<any, {
    message: string;
  }, void, unknown>
  form: UseFormReturnType<InitialValuesType, (values: InitialValuesType) => InitialValuesType>
}

export default function NewPostForm({
  form,
  mutation
}: Props) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Cleanup preview URL when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  useEffect(() => {
    // Clear preview when form image is null/undefined
    if (!form.values.image) {
      setPreviewUrl(null);
    }
  }, [form.values.image]);

  // Handle image selection
  const handleImageSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Set the file in form values
      form.setFieldValue('image', file);

      // Create a preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  return (
    <form onSubmit={form.onSubmit(() => mutation.mutate())}>
      <div className='space-y-6'>
        <h2 className='font-semibold text-lg text-[#090A04]'>
          New Skill Post
        </h2>

        <div className='space-y-6 w-full'>
          <div className="flex flex-col mb-6">
            <div
              onClick={() => fileInputRef.current?.click()}
              className={`w-32 h-32 rounded-full flex items-center justify-center cursor-pointer overflow-hidden ${previewUrl ? '' : 'bg-gray-200 hover:bg-gray-300'}`}
              style={{ border: form.errors.image ? '2px solid #EF4444' : '2px dashed #D0D5DD' }}
            >
              {previewUrl ? (
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <Icon
                  icon="ic:baseline-add-a-photo"
                  width="32"
                  height="32"
                  className="text-gray-500"
                />
              )}
            </div>

            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={handleImageSelect}
              disabled={mutation.isPending}
            />

            {form.errors.image ? (
              <p className="mt-1 text-sm text-red-500">{form.errors.image}</p>
            ) : (
              <p className="mt-2 text-sm text-gray-600">Click to upload an image</p>
            )}
          </div>

          <div className='flex flex-col lg:flex-row space-y-6 lg:space-y-0 lg:space-x-5 items-start justify-between '>
            <div className='w-full'>
              <Input
                {...form.getInputProps('title')}
                type='text'
                label='Title'
                placeholder="Frontend Development"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.title ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </div>

            <div className='w-full'>
              <Input
                {...form.getInputProps('category')}
                type='text'
                label='Category'
                placeholder="Web Development"
                disabled={mutation.isPending}
                className={`w-full ${form.errors.category ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear placeholder:text-sm placeholder:text-[#98A2B3]`}
              />
            </div>
          </div>

          <div className='w-full'>
            <label className="text-sm text-[#090A04] block mb-1">
              Description
            </label>

            <textarea
              rows={4}
              disabled={mutation.isPending}
              {...form.getInputProps('description')}
              placeholder="Share details about your skill..."
              className={`w-full ${form.errors.description ? 'border-red-500 focus:outline-red-500' : 'border-[#D0D5DD] focus:outline-[#090A04]'} border-[1.5px] px-3 py-3 rounded-[4px] text-[#525050] transition duration-75 delay-75 ease-linear min-h-20 h-32 max-h-40 placeholder:text-sm placeholder:text-[#98A2B3]`}
            />

            {form.errors.description && (
              <p className="mt-1 text-sm text-red-500">{form.errors.description}</p>
            )}
          </div>

          <div>
            <button
              disabled={mutation.isPending}
              type='submit'
              className='w-full disabled:cursor-not-allowed disabled:opacity-50 h-[3.5rem] text-white text-center rounded-md font-semibold py-2 px-3 bg-[#090A04] transition duration-75 delay-75 ease-linear hover:shadow-md hover:bg-[#090a04e0]'
            >
              {mutation.isPending ? (
                <Icon
                  className={`animate-spin mx-auto`}
                  icon="icomoon-free:spinner2"
                  color="white"
                  width="20"
                  height="20"
                />
              ) : (
                'Create Post'
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}