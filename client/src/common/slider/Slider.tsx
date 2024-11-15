'use client';
import React, { useRef } from 'react';
import { Swiper as SwiperType } from 'swiper';
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Slide {
  id: number;
  content: React.ReactNode;
}

interface DemoSliderProps {
  data: Slide[];
  showNavigation?: boolean;
  className?: string;
}

const TestimonialsSlider: React.FC<DemoSliderProps> = ({
  data,
  showNavigation,
  className,
}) => {
  const swiperRef = useRef<SwiperType | null>(null);

  return (
    <Swiper
      loop={true}
      spaceBetween={60}
      autoplay={{
        delay: 5000,

        disableOnInteraction: false,
      }}
      navigation={showNavigation}
      onSwiper={(swiper: SwiperType) => {
        swiperRef.current = swiper;
      }}
      slidesPerView={3}
      modules={[Autoplay, Navigation]}
      breakpoints={{
        280: {
          slidesPerView: 1,
          spaceBetween: 16,
        },
        1020: {
          slidesPerView: 2,
          spaceBetween: 24,
        },
        1360: {
          slidesPerView: 3,
          spaceBetween: 25,
        },
      }}
    >
      {data.map(({ id, content }) => (
        <SwiperSlide className={className} key={id}>
          {content}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default TestimonialsSlider;
