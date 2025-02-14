import React, { useState } from "react";

export default function Skillsdetails({ data, setData, errors,clearError }) {
    const [skillInput, setSkillInput] = useState('');

    const handleInputChange =(e)=>{
      clearError("skills");
       setSkillInput(e.target.value)

    }

    const handleAddSkill = () => {
        if (skillInput.trim() !== '') {
            setData((prev) => [...prev, skillInput]);
            setSkillInput('');
          }
    };

    const handleRemoveSkill = (index) => {
        const updatedSkills = data.filter((_, i) => i !== index);
        setData(updatedSkills);
    };

    return (
        <div className="flex w-full p-2">
            <div className="w-full">
                <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Skills Details</h1>
                <form>
                    <div className="mb-4">
                        <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="skills">
                            Skills
                        </label>
                        {data.map((skill, index) => (
                            <div key={index} className="flex space-x-6 mb-4">
                                <input
                                    type="text"
                                    value={skill}
                                    readOnly
                                    className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                                />
                                <button
                                    type="button"
                                    className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                                    onClick={() => handleRemoveSkill(index)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                        <div className="flex space-x-6 mb-4">
                            <input
                                type="text"
                                placeholder="Add Skills"
                                value={skillInput}
                                onChange={handleInputChange}
                                className="w-full px-3 py-3 text-sm leading-tight text-gray-700 border border-gray-200 rounded appearance-none focus:outline-none focus:shadow-outline"
                            />
                            <button
                                type="button"
                                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                                onClick={handleAddSkill}
                            >
                                Add Skill
                            </button>
                        </div>
                        {errors.skills && <p className="text-red-500 text-start text-sm mt-1">{errors.skills}</p>}
                    </div>
                </form>
            </div>
        </div>
    );
}