// components/EnquiryForm.jsx
'use client';
import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { countries, monthArray, studyLevel, uniservices, yearArray } from '../utils/helpers';
import Image from 'next/image';
import lockIcon from "../../../public/images/lock-icon.svg";
import CustomDropdown from './common/CustomDropdown';

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
  month: yup.string().required('Select a month'),
  year: yup.string().required('Select a year').nullable(),
  agree: yup.bool().oneOf([true], 'You must agree before submitting'),
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
    defaultValues: {
      service: '',
      studyLevel: '',
      country: '',
      month: '',
      year: '',
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      agree: true
    },
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
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('open-entry-popup', {
          detail: {
            messages: [
              'Thank you for the details &',
              'Guaranteed response within 12 hours.'
            ]
          }
        }));
      }
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
          <div className='glass-card zi5'>
            <Controller
              name="service"
              control={control}
              render={({ field }) => (
              <CustomDropdown
                placeholder="Choose Service"
                options={uniservices}
                value={field.value}
                onChange={field.onChange}
                error={errors.service?.message}
              />
              )}
            />
            <p className="error">{errors.service?.message}</p>
          </div>

          <div className='glass-card zi5'>
            <Controller
              name="studyLevel"
              control={control}
              render={({ field }) => (
                <CustomDropdown
                  placeholder="Choose Study Level"
                  options={studyLevel}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.service?.message}
                />
              )}
            />
            <p className="error">{errors.studyLevel?.message}</p>
          </div>

          <div className='glass-card zi4'>
            <Controller
              name="country"
              control={control}
              render={({ field }) => (    
              <CustomDropdown
                placeholder="Choose Country"
                options={countries}
                value={field.value}
                onChange={field.onChange}
                error={errors.service?.message}
              />
              )}
            />
            <p className="error">{errors.country?.message}</p>
          </div>

          <div className='glass-card glass-card-2 zi4'>
            <Controller
                name="month"
                control={control}
                render={({ field }) => (    
                <CustomDropdown
                  placeholder="MM"
                  options={monthArray}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.service?.message}
                  className="month"
                />
                )}
              />
              <Controller
                name="year"
                control={control}
                render={({ field }) => (    
                <CustomDropdown
                  placeholder="YYYY"
                  options={yearArray}
                  value={field.value}
                  onChange={field.onChange}
                  error={errors.service?.message}
                  className="year"
                />
                )}
              />
            <p className="error">{errors.month?.message}</p>
          </div>

        </div>
        <div className='enquiry-form--mid'>
          <div className='glass-card'>
            <input
              placeholder="First Name"
              {...register('firstName')}
              className=""
            />
            <p className="error">{errors.firstName?.message}</p>
          </div>

          <div className='glass-card'>
            <input
              placeholder="Last Name"
              {...register('lastName')}
              className=""
            />
            <p className="error">{errors.lastName?.message}</p>
          </div>
        </div>

        <div className='enquiry-form--bottom'>

          <div className='glass-card'>
            <input
              placeholder="Email"
              {...register('email')}
              className=""
            />
            <p className="error">{errors.email?.message}</p>
          </div>

          <div className='glass-card'>
            <input
              placeholder="Mobile"
              {...register('mobile')}
              className=""
            />
            <p className="error">{errors.mobile?.message}</p>
          </div>
        </div>

        <div className="consent">
          <input
            type="checkbox"
            id="agree"
            checked
            {...register('agree')}
            className="custom-checkbox"
          />
          <label htmlFor="agree" className="">
            Yes! I’d like to know about potential opportunities & helpful services.
          </label>
        </div>

        <button
          type="submit"
          className="btn glass-card"
          disabled={loading}
        >
          {loading ? 'Submitting...' : 'Submit'}
        </button>

        {message && <p className="text-green-500 mt-2">{message}</p>}
      </form>
      <div className='privacy-txt'>
        <Image src={lockIcon} alt='Lock' width="10" height="14" />
        We Value your privacy. So, is secured!
      </div>
    </div>
  );
};

export default EnquiryForm;
