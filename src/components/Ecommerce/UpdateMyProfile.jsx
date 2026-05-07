import axios from 'axios';
import React, { useState } from 'react'
import {useForm} from 'react-hook-form'

function UpdateMyProfile() {

  const {register, handleSubmit, watch, formState: {errors, isSubmitting }} = useForm({
    defaultValues: {
      countryCode: "+91",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    }
  });




  const submit = async(data)=>{
    const accessToken = localStorage.getItem("accessToken");
    const response = await axios.patch(`https://api.freeapi.app/api/v1/ecommerce/profile`, data, {headers: {
      "Authorization": `Bearer ${accessToken}`,
      "Content-Type": "application/json"
    }})

    console.log(response)
    // console.log("updated")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">

      <form
        onSubmit={handleSubmit(submit)}
        className="w-96 bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-700"
      >
        <h2 className="text-xl font-bold text-white text-center mb-6">
          Update User
        </h2>

        {/* Country Code */}
        <input
          type="text"
          name="countryCode"
          {...register("countryCode")}
          placeholder="Country Code"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
        />

        {/* First Name */}
        <input
          type="text"
          name="firstName"
          {...register("firstName", {
            required: {value: true, message: "firstName is required"},
            minLength: {value: 3, message: "min length should be 3"},
            maxLength: {value: 55, message: "max length should be 55"},
          })}
          placeholder="First Name"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
        />
        {errors.firstName && <p className='text-red-600 text-sm'>{errors.firstName.message}</p>}

        {/* Last Name */}
        <input
          type="text"
          name="lastName"
          {...register("lastName", {
            maxLength: {value: 55, message: "max length should be 55"}
          })}
          placeholder="Last Name"
          className="w-full mb-4 p-2 rounded bg-gray-700 text-white outline-none"
        />

        {/* Phone Number */}
        <input
          type="text"
          name="phoneNumber"
          {...register("phoneNumber")}
          placeholder="Phone Number"
          className="w-full mb-6 p-2 rounded bg-gray-700 text-white outline-none"
        />

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded"
        >
          {isSubmitting ? "Updating": "Update"}
        </button>
      </form>

    </div>
  )
}

export default UpdateMyProfile