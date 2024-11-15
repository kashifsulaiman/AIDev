import TestimonialsSlider from '@/common/slider/Slider';
import React from 'react';
import SectionHeading from '../SectionHeading/SectionHeading';
import TestimonialCard from './TestimonialCard';
// const sliderData = [
//   {
//     id: 1,
//     paragraph:
//       'AI DEV is a game-changer! It saves us hours by catching bugs and suggesting improvements. A must-have for any developer! Highly recommend it to any developer!',
//     profileName: 'Ronald Richards',
//     designation: 'Software Engineer',
//     avatar: 'https://dc3yp5a9dizw2.cloudfront.net/images/testimonial-logo.jpg',
//   },
//   {
//     id: 2,
//     paragraph:
//       'AI DEV doubled our team’s productivity with its smart code suggestions. It’s a great boost to our workflow. A must-have for any developer! Highly recommend it to any developer!',
//     profileName: 'Rebecca Richards',
//     designation: 'Lead Developer',
//     avatar: 'https://dc3yp5a9dizw2.cloudfront.net/images/testimonial-logo.jpg',
//   },
//   {
//     id: 3,
//     paragraph:
//       'As a freelancer, AI DEV is my go-to. Easy setup and major time savings. Plus, the support team is fantastic! A must-have for any developer! Highly recommend it to any developer!',
//     profileName: 'Alex J Doe.',
//     designation: 'Independent Developer',
//     avatar: 'https://dc3yp5a9dizw2.cloudfront.net/images/testimonial-logo.jpg',
//   },
//   {
//     id: 4,
//     paragraph:
//       'AI DEV is a game-changer! It saves us hours by catching bugs and suggesting improvements. A must-have for any developer! Highly recommend it to any developer!',
//     profileName: 'Ronald Richards',
//     designation: 'Software Engineer',
//     avatar: 'https://dc3yp5a9dizw2.cloudfront.net/images/testimonial-logo.jpg',
//   },
// ];
const data = [
  {
    id: 1,
    content: (
      <TestimonialCard
        paragraph="AI DEV has just launched, and we're already seeing its potential! Even in its early stages, it's helping our team streamline tasks and avoid repetitive bugs. I can already tell it will be a valuable asset as we build our project. Excited to see what's next!"
        profileName="Ronald Richards"
        designation="Software Engineer"
      />
    ),
  },
  {
    id: 2,
    content: (
      <TestimonialCard
        paragraph="Even in its initial phase, AI DEV is enhancing our productivity right from day one. The smart suggestions and user-friendly interface show a lot of promise. We’re eager to see its capabilities grow with each update!"
        profileName="Rebecca Richards"
        designation="Lead Developer"
      />
    ),
  },
  {
    id: 3,
    content: (
      <TestimonialCard
        paragraph="AI DEV has quickly become a valuable part of our workflow. From our early trials, it’s clear that the product is designed with developers’ needs in mind, providing practical support right from the start. I can't wait to see what the future holds!"
        profileName="Alex J Doe."
        designation="Independent Developer"
      />
    ),
  },
  {
    id: 4,
    content: (
      <TestimonialCard
        paragraph="As a freelancer, AI DEV is my go-to. Easy setup and major time savings. Plus, the support team is fantastic! A must-have for any developer! Highly recommend it to any developer!"
        profileName="Alex J Doe."
        designation="Independent Developer"
      />
    ),
  },
];

const Testimonials = () => {
  return (
    <div className="bg-[url('/asstes/images/bg-section.png')] bg-cover bg-center">
      <div className="mx-auto max-w-full px-4 pb-16 pt-10 md:max-w-[630px] lg:max-w-[924px] lg:pb-32 lg:pt-20 xl:max-w-[1230px] min-[1640px]:max-w-[1620px] min-[1640px]:px-0">
        <SectionHeading
          title="Client Good Words"
          // paragraphg="Trusted by millions of developer and thousand of companies"
        />
        <div className="flex justify-center gap-10">
          <TestimonialsSlider
            data={data}
            showNavigation={true}
            className="!mr-[25px]"
          />
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
