// pages/profile/index.tsx
"use client";
import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import SetupUser from "../components/SetupUser";
import CardBento from "../components/CardsBento";
import ProfileLayout from "../components/ProfileLayout";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation"; // Import useRouter
import NavBar from "../components/NavBar";

const ProfilePage = () => {
  const { userDetails, user } = useContext(AuthContext);
  const [profileActiveButton, setProfileActiveButton] = useState("All");

  const router = useRouter(); // Initialize the router

  // Check if user is not authenticated
  if (!user) {
    return (
      <> 
      <NavBar />
      <section className="bg-blk1 w-screen h-screen flex items-center justify-center pt-24 pb-24">
        <p> Loading.. </p>
      </section>
      </>
    );
  }

  // If the user hasn't set up their profile yet
  if (!userDetails?.isUserId) {
    return (
      <> 
      <NavBar />
      <section className="bg-blk1 w-screen h-screen flex items-center justify-center pt-24 pb-24">
        <SetupUser />
      </section>
      </>
    );
  }

  const handleNavigation = (section: string) => {
    if (section === "Requests") {
      router.push("/profile/requests");
    } else if (section === "Testimonies") {
      router.push("/profile/testimonies");
    } else {
      router.push("/profile/");
    }
  };

  return (
    <ProfileLayout>
      <div className="flex items-center text-xs lg:text-base gap-8">
        <button
          className={`text-white p-[12px] border-b-2 ${
            profileActiveButton === "All" ? " border-white" : " border-blk1"
          }`}
          onClick={() => handleNavigation("All")}
        >
          All
        </button>
        <button
          className={`text-white p-[12px] border-b-2 ${
            profileActiveButton === "Requests" ? " border-purp" : "border-blk1"
          }`}
          onClick={() => handleNavigation("Requests")}
        >
          Requests
        </button>
        <button
          className={`text-white p-[12px] border-b-2 ${
            profileActiveButton === "Testimonies"
              ? " border-coral"
              : "border-blk1"
          }`}
          onClick={() => handleNavigation("Testimonies")}
        >
          Testimonies
        </button>
      </div>
      <motion.div
        className="profile-card w-screen rounded-2xl border-2 justify-center items-center border-blk1 flex flex-col p-8"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1, originY: 0 }}
        exit={{ scale: 0, opacity: 0 }}
        transition={{ type: "spring", stiffness: 350, damping: 40 }}
      >
        <CardBento filterByCurrentUser={true} filterByType="all" />
      </motion.div>
    </ProfileLayout>
  );
};

export default ProfilePage;
