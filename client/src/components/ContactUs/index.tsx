'use client';

import React from 'react';
import Text from '@/common/text/Index';
import { FormikInput } from '@/common/Input';
import { CButton } from '@/common/button';
import {
  CellPhone,
  Discord,
  Envelope,
  Insta,
  Location,
  Twitterx,
} from '../SVG';
import GenericImage from '@/common/GenericImage';
import { useMutation } from '@/hooks/useMutation';
import { POST } from '@/hooks/consts';
import { ApiUrl } from '@/constants/apiUrl';
import { Field, Formik } from 'formik';
import { ContactUsFormSchema } from '@/ValidationSchema';
import { FormikTextArea } from '@/common/TextArea';

const ContactUs = () => {
  const { mutate, isLoading } = useMutation<any>({
    method: POST,
    url: ApiUrl.CONTACTUS,
  });

  const onSubmit = (value: any, { resetForm }: any) => {
    mutate(value, {
      onSuccess: () => {
        resetForm();
      },
    });
  };

  const initialValues = {
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    subject: '',
    message: '',
  };

  return (
    <>
      <div className="flex items-center justify-center bg-[url('https://dc3yp5a9dizw2.cloudfront.net/images/contactus.jpg')] bg-cover bg-center py-16 md:py-24 xl:h-[760px] xl:py-0">
        <div className="px-3 text-center sm:px-0">
          <h2 className="font-Jakarta text-3xl font-bold text-blue-50 sm:text-[56px]">
            We’re Here to Help
          </h2>
          <Text className="mt-4 max-w-[760px] font-Jakarta text-base font-normal !text-white sm:text-lg">
            Have questions, need support, or just want to chat about AI-powered
            development? Reach out to our team—we’d love to hear from you!
          </Text>
        </div>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={ContactUsFormSchema}
        onSubmit={onSubmit}
      >
        {({ isValid, dirty, touched, errors, handleSubmit }) => (
          <form className="flex flex-col gap-8" onSubmit={handleSubmit}>
            <div className="bg-footer-gradient">
              <div className="md:max-[720px] mx-auto mt-14 flex w-full flex-col items-center gap-10 px-5 pb-14 lg:mb-[186px] lg:mt-[130px] lg:max-w-5xl lg:flex-row 2xl:gap-8 2xl:pl-2 min-[1560px]:max-w-[1400px] min-[1620px]:max-w-[1600px]">
                <div className="w-full">
                  <h2 className="font-Jakarta text-4xl font-bold leading-none text-contactcolors-100 sm:text-6xl">
                    Let’s Create Progress{' '}
                    <span className="font-Jakarta font-medium text-contactcolors-100">
                      Together
                    </span>{' '}
                  </h2>

                  <div className="flex flex-col items-start justify-between gap-1 pt-9 sm:flex-row sm:gap-3 lg:gap-[26px] lg:pb-6">
                    <Field
                      component={FormikInput}
                      errorMessage={touched.firstName && errors?.firstName}
                      label="First Name"
                      name="firstName"
                      placeholder="Enter first name"
                      className="!text-authgray-200 placeholder:text-contactcolors-200"
                    />

                    <Field
                      component={FormikInput}
                      errorMessage={touched.lastName && errors?.lastName}
                      label="Last Name"
                      name="lastName"
                      placeholder="Enter name"
                      className="!text-authgray-200 placeholder:text-contactcolors-200"
                    />
                  </div>

                  <div className="flex flex-col items-center justify-between gap-1 sm:flex-row sm:gap-3 lg:gap-[26px] lg:pb-6">
                    <Field
                      component={FormikInput}
                      errorMessage={touched.email && errors?.email}
                      label="Email"
                      name="email"
                      placeholder="Enter your email"
                      className="!text-authgray-200 placeholder:text-contactcolors-200"
                    />
                    <Field
                      component={FormikInput}
                      errorMessage={touched.phone && errors?.phone}
                      label="Phone"
                      name="phone"
                      placeholder="Enter your phone"
                      className="!text-authgray-200 placeholder:text-contactcolors-200"
                    />
                  </div>

                  <Field
                    component={FormikInput}
                    errorMessage={touched.subject && errors?.subject}
                    label="Subject"
                    name="subject"
                    placeholder="Enter Subject"
                    className="!text-authgray-200 placeholder:text-contactcolors-200"
                  />
                  <Field
                    component={FormikTextArea}
                    errorMessage={touched.message && errors?.message}
                    label="Message"
                    name="message"
                    placeholder="Enter message"
                    labelPlacement="outside"
                    className="max-w-full"
                  />
                  <CButton
                    label="Submit Now"
                    variant="primary"
                    colorPrimary
                    isDisabled={isLoading || !(isValid && dirty)}
                    type="submit"
                    className="mt-9 h-[48px] w-full text-sm font-medium sm:w-auto sm:text-base lg:mt-[50px]"
                  />
                </div>

                <div className="relative flex w-full flex-col rounded-[16.05px] bg-contact-gradient p-5 sm:p-14 md:p-[64.21px] lg:max-w-[788px]">
                  <h2 className="font-Jakarta text-3xl font-semibold text-white sm:text-5xl">
                    Contact Information
                  </h2>
                  <Text className="mt-[27.06px] text-xl font-normal text-contactcolors-300 sm:text-2xl">
                    Say something to start a live chat!
                  </Text>

                  <div className="mt-8 flex items-center gap-3 sm:mt-14 sm:gap-7 md:gap-10 lg:mt-28">
                    <span className="size-8 lg:size-10">
                      <CellPhone />
                    </span>
                    <Text className="text-lg font-normal text-white sm:text-xl md:text-2xl">
                      1-800-123-4568
                    </Text>
                  </div>

                  <div className="my-8 flex items-center gap-3 text-wrap sm:gap-7 md:gap-10 lg:my-20">
                    <span className="size-8 lg:size-10">
                      <Envelope />
                    </span>
                    <Text className="text-wrap text-lg font-normal text-white sm:text-xl md:text-2xl">
                      aidev@gmail.com
                    </Text>
                  </div>

                  <div className="flex items-start gap-3 sm:items-center sm:gap-7 md:gap-10">
                    <span className="size-8 lg:size-10">
                      <Location />
                    </span>
                    <Text className="text-lg font-normal text-white sm:text-xl md:text-2xl">
                      132 Dartmouth Street Boston, Massachusetts 02156 United
                      States
                    </Text>
                  </div>
                  <div className="mt-14 flex items-center gap-[38.53px] lg:mt-[72px]">
                    {[
                      {
                        Icon: Twitterx,
                        bg: 'bg-white hover:bg-blue-500',
                        textColor: 'hover:text-white',
                      },
                      {
                        Icon: Insta,
                        bg: 'bg-white hover:bg-pink-500',
                        textColor: 'hover:text-white',
                      },
                      {
                        Icon: Discord,
                        bg: 'bg-white hover:bg-contactcolors-400',
                        textColor: 'hover:text-white',
                      },
                    ].map(({ Icon, bg, textColor }, idx) => (
                      <div
                        key={idx}
                        className={`${bg} text-black ${textColor} flex h-[48.16px] w-[48.16px] items-center justify-center rounded-full transition-colors duration-300`}
                      >
                        {' '}
                        <Icon />
                      </div>
                    ))}
                  </div>

                  <div className="absolute -bottom-72 -right-36 overflow-hidden">
                    <GenericImage
                      alt="shapes"
                      src="asstes/images/ShapeContact.png"
                      className="size-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default ContactUs;
