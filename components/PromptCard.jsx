'use client';
import toast, { Toaster } from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';

import { useState } from 'react';

import React from 'react';
const PromptCard = ({
  post,
  handleTagClick,
  handleEdit,
  handleDelete,
}) => {
  const [copied, setCopied] = useState('');

  const { data: session } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  const notify = toast.success('Copied to Clipboard', {
    position: 'bottom-center',
  });

  const handleCopy = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => {
      setCopied('');
    }, 2000);
  };

  const handleProfileClick = () => {
    console.log(post);

    if (post.creator._id === session?.user.id)
      return router.push('/profile');

    router.push(
      `/profile/${post.creator._id}?name=${post.creator.username}`
    );
  };
  return (
    <div className="prompt_card">
      {copied !== '' && <Toaster />}
      <div className="flex justify-between items-start gap-5">
        <div
          onClick={handleProfileClick}
          className="flex-1 flex justify-start items-center gap-3 cursor-pointer"
        >
          <Image
            src={post.creator?.image || '/assets/images/logo.svg'}
            width={40}
            height={40}
            alt="user_image"
            className="rounded-full object-contain"
          />
          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator.email}
            </p>
          </div>
        </div>
        <div
          className="copy_btn"
          onClick={() => {
            handleCopy();
          }}
        >
          <Image
            width={12}
            height={12}
            src={
              copied === post.prompt
                ? '/assets/icons/tick.svg'
                : '/assets/icons/copy.svg'
            }
            alt={
              copied === post.prompt
                ? 'tick_icon_button'
                : 'copy_icon_button'
            }
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-700">
        {post.prompt}
      </p>
      <p
        onClick={() => handleTagClick && handleTagClick(post.tag)}
        className="font-inter text-sm blue_gradient cursor-pointer"
      >
        {post.tag}
      </p>
      {session?.user._id === post.creator.id &&
        pathName === '/profile' && (
          <div className="flex-center border-t border-gray-100 pt-3 gap-10 mt-5 ">
            <p
              className="font-inter text-sm green_gradient cursor-pointer"
              onClick={handleEdit}
            >
              Edit
            </p>
            <p
              className="font-inter text-sm orange_gradient cursor-pointer"
              onClick={handleDelete}
            >
              Delete
            </p>
          </div>
        )}
    </div>
  );
};

export default PromptCard;
