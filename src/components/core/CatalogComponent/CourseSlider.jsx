import React from "react";
// we install the swiper by which we create the slider cards
// also we import swiper and swiper slider
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import CourseCard from "./CourseCard";
function CourseSlider({ courses }) {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8">
    {courses?.length ? (
      <Swiper
        slidesPerView={2}
        loop={true}
        spaceBetween={10}
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay, Navigation]}
        className="mySwiper"
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        navigation={true}
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 30,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
        }}
      >
        {courses.map((course, i) => (
          <SwiperSlide key={i}>
            <CourseCard course={course} height="h-[200px]" />
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <p className="text-xl text-richblack-5 text-center">No Course Found</p>
    )}
  </div>
  );
}

export default CourseSlider;
