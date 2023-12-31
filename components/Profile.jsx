import React from 'react';
import PromptCard from './PromptCard';
import { useSession } from 'next-auth/react';

const Profile = ({ name, desc, data, handleEdit, handleDelete }) => {
  const { data: session } = useSession();

  return (
    <div>
      {session?.user ? (
        <section className="w-full">
          <h1 className="head_text text-left ">
            <span className="blue_gradient">{name} Profile</span>
          </h1>

          <p className="desc text-left">{desc}</p>
          <div className="mt-10 prompt_layout">
            {data.map((post) => {
              return (
                <PromptCard
                  key={post._id}
                  post={post}
                  handleEdit={() => handleEdit && handleEdit(post)}
                  handleDelete={() =>
                    handleDelete && handleDelete(post)
                  }
                />
              );
            })}
          </div>
        </section>
      ) : (
        <h1 className="text-5xl text-left leading-relaxed">
          <span className="blue_gradient">
            You must be Logged in to View Profile
          </span>
        </h1>
      )}
    </div>
  );
};

export default Profile;
