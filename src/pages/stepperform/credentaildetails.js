import React from "react";

export default function Credentaildetails({
  data,
  setData,
  errors,
  clearError,
}) {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
    clearError(name);
  };

  return (
    <div className="flex w-full p-2">
      <div className="w-full">
        <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">
          Credential Details
        </h1>
        <form>
          <div className="mb-4">
            <label
              className="block mb-2 text-sm font-medium text-gray-700 text-left"
              htmlFor="email"
            >
              Email
            </label>
            <input
              className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
              id="email"
              type="email"
              placeholder="Email"
              name="email"
              value={data.email}
              onChange={handleChange}
            />
            {errors.email && (
              <p className="text-red-500 text-start text-sm mt-1">
                {errors.email}
              </p>
            )}
          </div>
          <div className="grid gap-2 md:grid-cols-2">
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-left text-gray-700"
                htmlFor="password"
              >
                Password
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="password"
                type="password"
                placeholder="Password"
                name="password"
                value={data.password}
                onChange={handleChange}
                minLength={6}
              />
              {errors.password && (
                <p className="text-red-500 text-start text-sm mt-1">
                  {errors.password}
                </p>
              )}
            </div>
            <div className="mb-4">
              <label
                className="block mb-2 text-sm font-medium text-left text-gray-700"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
              <input
                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                id="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                name="confirmPassword"
                value={data.confirmPassword}
                onChange={handleChange}
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-start text-sm mt-1">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
