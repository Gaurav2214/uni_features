// components/EnquiryForm.jsx
'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { countries, studyLevel, uniservices } from '../utils/helpers';

const schema = yup.object().shape({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  mobile: yup
    .string()
    .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
    .required('Mobile is required'),
  service: yup.string().required('Select a service'),
  studyLevel: yup.string().required('Select study level'),
  country: yup.string().required('Select country'),
  date: yup.date().required('Select a date').nullable(),
});

const EnquiryForm = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const res = await fetch('/api/send-enquiry', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      setMessage(result.message);
      reset();
    } catch (err) {
      console.error(err);
      setMessage('Something went wrong');
    }
    setLoading(false);
  };

  return (
    <div className='enquiry-form'>
    <form onSubmit={handleSubmit(onSubmit)} className="enquiry-form--container">
      <div className='enquiry-form--top'>
        <div className='glass-card'>
          <select {...register('service')} className="">
            <option value="">Choose Service</option>
            {uniservices.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <p className="text-red-500">{errors.service?.message}</p>
        </div>

        <div className='glass-card'>
          <select {...register('studyLevel')} className="border p-2 w-full">
            <option value="">Choose Study Level</option>
            {studyLevel.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <p className="text-red-500">{errors.studyLevel?.message}</p>
        </div>

        <div className='glass-card'>
          <select {...register('country')} className="border p-2 w-full">
            <option value="">Choose Country</option>
            {countries.map((item) => (
              <option key={item} value={item}>{item}</option>
            ))}
          </select>
          <p className="text-red-500">{errors.country?.message}</p>
        </div>

        <div className='glass-card'>
          <Controller
            control={control}
            name="date"
            render={({ field }) => (
              <DatePicker
                placeholderText="Select Date"
                className="glass-card"
                selected={field.value}
                onChange={(date) => field.onChange(date)}
              />
            )}
          />
          <p className="text-red-500">{errors.date?.message}</p>
        </div>
      </div>
      <div className='enquiry-form--mid'>
      <div className='glass-card'>
          <input
            placeholder="First Name"
            {...register('firstName')}
            className=""
          />
          <p className="text-red-500">{errors.firstName?.message}</p>
        </div>

        <div className='glass-card'>
          <input
            placeholder="Last Name"
            {...register('lastName')}
            className=""
          />
          <p className="text-red-500">{errors.lastName?.message}</p>
        </div>
      </div>

      <div className='enquiry-form--bottom'>

        <div className='glass-card'>
          <input
            placeholder="Email"
            {...register('email')}
            className=""
          />
          <p className="text-red-500">{errors.email?.message}</p>
        </div>

        <div className='glass-card'>
          <input
            placeholder="Mobile"
            {...register('mobile')}
            className=""
          />
          <p className="text-red-500">{errors.mobile?.message}</p>
        </div>
      </div>

      <div className=''>Yes! I’d like to know about potential opportunities & helpful services.</div>

      <button
        type="submit"
        className="btn glass-card"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {message && <p className="text-green-500 mt-2">{message}</p>}
    </form>
    </div>
  );
};

export default EnquiryForm;
