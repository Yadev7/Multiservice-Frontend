"use client";

import React, { useState, useEffect } from "react";

// A simple component to display an alert message
const Alert = ({ message, type }: { message: string, type: "success" | "error" }) => {
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
  const [userId, setUserId] = useState<string | null>(null); // State to hold user ID
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [photoPreviewUrl, setPhotoPreviewUrl] = useState<string | null>(null);


  // This effect should only run ONCE when the component mounts to fetch initial data.
  // The dependency array `[]` ensures this.
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        // **FIX**: Construct a full, valid URL for redirection to prevent errors in certain environments.
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

        const userData = await response.json();
        
        setForm({
          firstName: userData.firstName || "",
          lastName: userData.lastName || "",
          email: userData.email || "",
        });

        setUserId(userData.id); 

        if (userData.photo?.path) { // Use path, as per your backend structure
          setCurrentPhotoUrl(userData.photo.path);
        }

      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();

    // Cleanup function to revoke the temporary URL when the component unmounts.
    return () => {
      if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
      }
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures this runs only once on mount.

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const ALLOWED_FILE_TYPES = ["image/png", "image/jpeg", "image/webp"];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);

    // If there's an old preview, revoke it to prevent memory leaks
    if (photoPreviewUrl) {
        URL.revokeObjectURL(photoPreviewUrl);
    }
    setPhotoPreviewUrl(null);

    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (!ALLOWED_FILE_TYPES.includes(file.type)) {
        setError(`Invalid file type. Please select a PNG, JPEG, or WebP image.`);
        e.target.value = '';
        setPhoto(null);
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

      // STEP 1: If a new photo exists, upload it first.
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
        
        // Get the ID from the response. Adjust `photoData.id` or `photoData.file.id`
        // to match your actual API response structure.
        photoIdToUpdate = photoData.id || photoData.file?.id;
      }

      // STEP 2: Prepare a SINGLE payload with all data to update.
      const updateUserPayload: {
          firstName: string;
          lastName: string;
          photo?: { id: number };
      } = {
        firstName: form.firstName,
        lastName: form.lastName,
      };

      // If a new photo was uploaded, add its ID to the payload.
      if (photoIdToUpdate) {
        updateUserPayload.photo = { id: photoIdToUpdate };
      }

      // STEP 3: Send ONE request to update the user profile.
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
      
      const updatedUserData = await updateResponse.json();

      // After a successful save, update the persistent photo URL and clear the temporary preview
      if (updatedUserData.photo?.path) {
          setCurrentPhotoUrl(updatedUserData.photo.path);
      }
      setPhotoPreviewUrl(null); 
      setSuccess("Profile updated successfully!");

    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsUpdating(false);
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center font-sans p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">
          Edit Profile
        </h2>

        <Alert message={error} type="error" />
        <Alert message={success} type="success" />

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center space-x-6">
            <div className="shrink-0">
              <img
                className="h-20 w-20 object-cover rounded-full"
                // This logic is correct! It prioritizes the new temporary preview.
                src={photoPreviewUrl || currentPhotoUrl || `https://ui-avatars.com/api/?name=${form.firstName}+${form.lastName}&background=random`}
                alt="Current profile photo"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose profile photo</span>
              <input type="file" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" className="block w-full text-sm text-slate-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-full file:border-0
                      file:text-sm file:font-semibold
                      file:bg-violet-50 file:text-violet-700
                      hover:file:bg-violet-100"
              />
            </label>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                First Name
              </label>
              <input
                id="firstName" type="text" name="firstName"
                value={form.firstName} onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Last Name
              </label>
              <input
                id="lastName" type="text" name="lastName"
                value={form.lastName} onChange={handleChange}
                className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email
            </label>
            <input
              id="email" type="email" name="email"
              value={form.email}
              className="w-full border border-gray-300 dark:border-gray-600 rounded-lg p-3 bg-gray-200 dark:bg-gray-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
              disabled
            />
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg p-3 font-semibold transition disabled:bg-indigo-400 disabled:cursor-not-allowed"
          >
            {isUpdating ? "Saving..." : "Save Changes"}
          </button>
        </form>
      </div>
    </div>
  );
}
