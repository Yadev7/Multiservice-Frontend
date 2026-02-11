"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

// 1. Define specific interfaces to replace 'any'
interface UserData {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  photo?: {
    path: string;
  };
}

interface AlertProps {
  message: string | null;
  type: "success" | "error";
}

const Alert = ({ message, type }: AlertProps) => {
  if (!message) return null;
  const typeClasses = {
    success: "bg-green-100 text-green-800",
    error: "bg-red-100 text-red-800",
  };
  return (
    <div className={`p-4 rounded-lg mb-6 text-sm font-medium ${typeClasses[type]}`} role="alert">
      {message}
    </div>
  );
};

export default function EditProfilePage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });
  
  const [photo, setPhoto] = useState<File | null>(null);
  const [currentPhotoUrl, setCurrentPhotoUrl] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null); // State added correctly
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        window.location.href = window.location.origin + "/sign-in";
        return;
      }

      const API_ME_URL = "http://localhost:3001/api/v1/auth/me";

      try {
        const response = await fetch(API_ME_URL, {
          headers: { "Authorization": `Bearer ${token}` },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data. Please log in again.");
        }

        const userData: UserData = await response.json();
        
        setForm({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
        });

        setUserId(userData.id); 

        if (userData.photo?.path) {
          setCurrentPhotoUrl(userData.photo.path);
        }

      } catch (err) {
        // Correct error handling without 'any'
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    return () => {
      if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
      }
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
    }
    setPhotoPreviewUrl(null);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];
      
      if (!ALLOWED_TYPES.includes(file.type)) {
        setError(`Please select a PNG, JPEG, or WebP image.`);
        return;
      }

      setPhoto(file);
      setPhotoPreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setError(null);
    setSuccess(null);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("Authentication error. Please log in again.");
      setIsUpdating(false);
      return;
    }

    try {
      let photoIdToUpdate: number | undefined;

      if (photo) {
        const formData = new FormData();
        formData.append("file", photo);
        const UPLOAD_URL = "http://localhost:3001/api/v1/files/upload";

        const photoResponse = await fetch(UPLOAD_URL, {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
          body: formData,
        });

        const photoData = await photoResponse.json();
        if (!photoResponse.ok) {
          throw new Error(photoData.message || "Photo upload failed.");
        }
        photoIdToUpdate = photoData.id || photoData.file?.id;
      }

      const updateUserPayload: {
          firstName: string;
          lastName: string;
          photo?: { id: number };
      } = {
        firstName: form.firstName,
        lastName: form.lastName,
      };

      if (photoIdToUpdate) {
        updateUserPayload.photo = { id: photoIdToUpdate };
      }

      const UPDATE_USER_URL = `http://localhost:3001/api/v1/auth/me`;
      const updateResponse = await fetch(UPDATE_USER_URL, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(updateUserPayload),
      });

      if (!updateResponse.ok) {
        const errorData = await updateResponse.json();
        throw new Error(errorData.message || "Failed to update profile.");
      }
      
      const updatedUserData: UserData = await updateResponse.json();

      if (updatedUserData.photo?.path) {
          setCurrentPhotoUrl(updatedUserData.photo.path);
      }
      setPhotoPreviewUrl(null); 
      setSuccess("Profile updated successfully!");

    } catch (err) {
      if (err instanceof Error) setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-10 dark:text-white">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Edit Profile
        </h2>

        <Alert message={error} type="error" />
        <Alert message={success} type="success" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="shrink-0 relative w-20 h-20">
              <Image
                className="object-cover rounded-full"
                src={photoPreviewUrl || currentPhotoUrl || `https://ui-avatars.com/api/?name=${form.firstName}+${form.lastName}&background=random`}
                alt="Profile photo"
                fill
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" 
                className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">First Name</label>
              <input id="firstName" type="text" name="firstName" value={form.firstName} onChange={handleChange} required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Last Name</label>
              <input id="lastName" type="text" name="lastName" value={form.lastName} onChange={handleChange} required
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-indigo-500 outline-none"
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
            <input id="email" type="email" name="email" value={form.email} disabled
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-200 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
            />
          </div>

          <button type="submit" disabled={isUpdating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-3 font-semibold transition disabled:bg-indigo-400"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}