import React, { useState } from "react";
import Personaldetails from "./stepperform/personaldetails";
import Countrydetails from "./stepperform/countrydetails";
import Skillsdetails from "./stepperform/skillsdetails";
import Credentaildetails from "./stepperform/credentaildetails";
import { Stepper, Step, StepLabel, Button, Typography } from "@mui/material";
import Layout from "../component/Layout";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/feature/usersSlice";

const steps = [
  "Personal Information",
  "Details",
  "Skills Details",
  "Credentail Details",
];

export default function Stepperform() {
  const { token } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.loader);
  const { success } = useSelector((state) => state.usersSlice);
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);
  const [errors, setErrors] = useState({}); // To store validation errors

  // State for each form
  const [personalDetails, setPersonalDetails] = useState({
    profileImage: null,
    name: "",
    gender: "",
    phoneNumber: "",
  });
  const [countryDetails, setCountryDetails] = useState({
    country: null,
    state: null,
  });
  const [skillsDetails, setSkillsDetails] = useState([]);
  const [credentialDetails, setCredentialDetails] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  // Function to clear a specific error
  const clearError = (field) => {
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      delete newErrors[field];
      return newErrors;
    });
  };

  // Validation function
  const validateStep = (step) => {
    const newErrors = {};
    switch (step) {
      case 0:
        if (!personalDetails.profileImage)
          newErrors.profileImage = "Profile image is required";
        if (!personalDetails.name) newErrors.name = "Name is required";
        if (!personalDetails.gender) newErrors.gender = "Gender is required";
        // Phone number validation
        if (!personalDetails.phoneNumber) {
          newErrors.phoneNumber = "Phone Number is required";
        } else if (personalDetails.phoneNumber.length !== 10) {
          newErrors.phoneNumber = "Phone Number must be 10 digits";
        }
        break;
      case 1:
        if (!countryDetails.country) newErrors.country = "Country is required";
        if (!countryDetails.state) newErrors.state = "State is required";
        break;
      case 2:
        if (skillsDetails.length === 0)
          newErrors.skills = "At least one skill is required";
        break;
      case 3:
        if (!credentialDetails.email) newErrors.email = "Email is required";
        if (!credentialDetails.password) {
          newErrors.password = "Password is required";
        } else if (credentialDetails.password.length < 6) {
          newErrors.password = "Password must be at least 6 characters";
        }
        if (!credentialDetails.confirmPassword) {
          newErrors.confirmPassword = "Confirm Password is required";
        } else if (
          credentialDetails.password !== credentialDetails.confirmPassword
        ) {
          newErrors.confirmPassword = "Passwords do not match";
        }
        break;
      default:
        break;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  const handleNext = () => {
    if (validateStep(activeStep)) {
      setActiveStep((prevActiveStep) => prevActiveStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = () => {
    if (validateStep(activeStep)) {
      // Creating FormData Object
      const formDataToSend = new FormData();

      // Append Personal Details
      formDataToSend.append("name", personalDetails.name);
      formDataToSend.append("gender", personalDetails.gender);
      formDataToSend.append("phoneNumber", personalDetails.phoneNumber);

      // Append Profile Image (if available)
      if (personalDetails.profileImage) {
        formDataToSend.append("photo", personalDetails.profileImage);
      }

      // Append Country Details
      formDataToSend.append("countryId", countryDetails.country?.value);
      formDataToSend.append("stateId", countryDetails.state?.value);

      // Append Skills Array
      skillsDetails.forEach((skill, index) => {
        formDataToSend.append(`skills`, skill);
      });

      // Append Credential Details
      formDataToSend.append("email", credentialDetails.email);
      formDataToSend.append("password", credentialDetails.password);
      formDataToSend.append(
        "password_confirmation",
        credentialDetails.confirmPassword
      );
      formDataToSend.append("token", token);

      console.log("FormData:", Object.fromEntries(formDataToSend.entries())); // Debugging

      // Dispatch API Call
      dispatch(addUser(formDataToSend));

      setActiveStep(steps.length); // Move to the thank you page
    }
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Personaldetails
            data={personalDetails}
            setData={setPersonalDetails}
            errors={errors}
            clearError={clearError}
          />
        );
      case 1:
        return (
          <Countrydetails
            data={countryDetails}
            setData={setCountryDetails}
            errors={errors}
            clearError={clearError}
          />
        );
      case 2:
        return (
          <Skillsdetails
            data={skillsDetails}
            setData={setSkillsDetails}
            errors={errors}
            clearError={clearError}
          />
        );
      case 3:
        return (
          <Credentaildetails
            data={credentialDetails}
            setData={setCredentialDetails}
            errors={errors}
            clearError={clearError}
          />
        );
      default:
        return "Unknown step";
    }
  };

  return (
    <Layout>
      <div className="bg-white p-4 mb-2 rounded-lg dark:border-gray-700 mt-14">
        <div>
          <h3 className="!text-defaulttextcolor dark:!text-defaulttextcolor/70 dark:text-white text-left dark:hover:text-white text-[1.125rem] font-semibold">
            Stepper Form
          </h3>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700 mb-2">
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </div>
      </div>
      <div className="bg-white">
        <div className="p-4 rounded-lg dark:border-gray-700">
          {activeStep === steps.length ? (
            <div className="flex justify-center w-full mt-5">
              <div className="p-8 m-4">
                <Typography variant="h5" className="mt-10 mb-10 pb-10">
                  {isLoading
                    ? "Form is submitting..."
                    :success? "Thank you for submitting the form!":"Error whlie submitting form! Go Back."}
                </Typography>
                {success ? (
                  !isLoading&&<Link
                    to="/List"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                  >
                    View List
                  </Link>
                ):(
                    !isLoading&&<Button
                    className="bg-back"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <>
              <Typography variant="h5">{getStepContent(activeStep)}</Typography>
              <div className="flex justify-center">
                <div className="flex justify-between w-full mt-4">
                  <Button
                    className="bg-back"
                    disabled={activeStep === 0}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={
                      activeStep === steps.length - 1
                        ? handleSubmit
                        : handleNext
                    }
                  >
                    {activeStep === steps.length - 1 ? "Submit" : "Next"}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </Layout>
  );
}
