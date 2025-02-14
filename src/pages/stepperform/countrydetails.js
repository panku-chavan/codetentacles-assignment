import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from 'react-select';
import { getCountries, getStates } from "../../redux/feature/countryStateSlice";

export default function Countrydetails({ data, setData, errors, clearError }) {
    const dispatch = useDispatch();
    const { countries, states } = useSelector((state) => state.countryStateSlice);
    const [countryId, setCountryId] = useState(null);

    useEffect(() => {
        dispatch(getCountries());
    }, [dispatch]);

    useEffect(() => {
        if (countryId != null) {
            dispatch(getStates({ country_id: countryId }));
        }
    }, [countryId, dispatch]);

    const countryOptions = countries.map(item => ({
        value: item.id,
        label: item.name
    }));

    // Reset states when no country is selected
    const stateOptions = countryId ? states.map(item => ({
        value: item.id,
        label: item.name
    })) : [];

    const handleCountryChange = (selectedOption) => {
        const newCountryId = selectedOption?.value || null;
        setCountryId(newCountryId);
        // Reset state when country changes
        setData(prev => ({ ...prev, country: selectedOption, state: null }));
        clearError('country');
        clearError('state');
    };

    const handleStateChange = (selectedOption) => {
        setData(prev => ({ ...prev, state: selectedOption }));
        clearError('state');
    };

    return (
        <div className="flex w-full p-2">
            <div className="w-full">
                <h1 className="block text-left w-full text-gray-800 text-2xl font-bold mb-6">Details</h1>
                <form>
                    <div className="grid gap-2 md:grid-cols-2">
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="country">
                                Select Country
                            </label>
                            <Select
                                className="basic-single text-left text-sm text-gray-700 rounded border border-gray-200"
                                classNamePrefix="select"
                                options={countryOptions}
                                value={data.country}
                                onChange={handleCountryChange}
                            />
                            {errors.country && <p className="text-red-500 text-start text-sm mt-1">{errors.country}</p>}
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2 text-sm font-medium text-gray-700 text-left" htmlFor="state">
                                Select State
                            </label>
                            <Select
                                className="basic-single text-left text-sm rounded text-gray-700 border border-gray-200"
                                classNamePrefix="select"
                                options={stateOptions}
                                value={data.state}
                                onChange={handleStateChange}
                                isDisabled={!countryId} // Disable if no country selected
                            />
                            {errors.state && <p className="text-red-500 text-start text-sm mt-1">{errors.state}</p>}
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}