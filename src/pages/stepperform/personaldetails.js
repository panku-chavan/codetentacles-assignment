import React from "react";

export default function Personaldetails({ data, setData, errors, clearError }) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "phoneNumber") {
      // Filter non-numeric characters and limit to 10 digits
      const numericValue = value.replace(/\D/g, "");
      const truncatedValue = numericValue.slice(0, 10);
      setData((prev) => ({ ...prev, [name]: truncatedValue }));
    } else {
      setData((prev) => ({ ...prev, [name]: value }));
    }
    clearError(name);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setData((prev) => ({ ...prev, profileImage: file }));
    clearError("profileImage");
  };

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="block text-left w-full text-gray-500 text-2xl font-bold mb-6">
          Personal Details
        </h1>
        <form>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 text-left"
              htmlFor="profile"
            >
              Profile Image
            </label>
            <div className="mt-1 flex flex-col items-start">
              <span className="inline-block w-20 h-20 rounded-full overflow-hidden bg-gray-100">
                <img
                  src={
                    data.profileImage
                      ? URL.createObjectURL(data.profileImage)
                      : "https://images.unsplash.com/photo-1531316282956-d38457be0993?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=700&q=80"
                  }
                  alt="profilepic"
                  className="w-100 h-100 m-auto rounded-full shadow"
                />
              </span>
              <div className="flex items-center justify-center bg-grey-lighter">
                <label className="w-50 flex flex-col items-center px-4 py-2 mt-5 bg-blue-300 text-gray-700 rounded-lg shadow-lg tracking-wide border border-blue cursor-pointer hover:bg-blue hover:text-white">
                  <span className="text-base leading-normal">Upload Image</span>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              {errors.profileImage && (
                <p className="text-red-500 text-start text-sm mt-1">
                  {errors.profileImage}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-x-7 md:grid-cols-2">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                id="name"
                type="text"
                placeholder="Name"
                name="name"
                value={data.name}
                onChange={handleChange}
              />
              {errors.name && (
                <p className="text-red-500 text-start text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                htmlFor="gender"
              >
                Gender
              </label>
              <div className="flex space-x-7">
                {["Male", "Female", "Others"].map((gender) => (
                  <div key={gender} className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      value={gender}
                      checked={data.gender === gender}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-200 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor={gender}
                      className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {gender}
                    </label>
                  </div>
                ))}
              </div>
              {errors.gender && (
                <p className="text-red-500 text-start text-sm mt-1">
                  {errors.gender}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-x-7 md:grid-cols-2">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-gray-700 text-left"
                htmlFor="phoneNumber"
              >
                Phone Number
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                id="phoneNumber"
                type="text"
                inputMode="numeric"
                placeholder="Phone Number"
                name="phoneNumber"
                value={data.phoneNumber}
                onChange={handleChange}
                maxLength={10}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-start text-sm mt-1">
                  {errors.phoneNumber}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
