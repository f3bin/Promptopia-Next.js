"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams  } from "next/navigation";

import Profile from "@components/Profile";

const UserProfile = ({params}) => {
  const { data: session } = useSession();
  const [posts, setPosts] = useState([]);
  const searchParams = useSearchParams();
  console.log(params,"params")
   const username = searchParams.get("username");



  useEffect(() => {
    const fetchUserPosts = async () => {
      const response = await fetch(`/api/users/${params.id}/posts`);
      const data = await response.json();
      console.log(data,"userposts")
      setPosts(data);
    };

    if (session?.user.id) fetchUserPosts();
    
  }, []);

  return (
    <Profile
      name={username}
      desc={`welcome to ${username} profile page`}
      data={posts}
    />
  );
};

export default UserProfile;
