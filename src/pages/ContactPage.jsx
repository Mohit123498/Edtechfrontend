import React from "react";
import Footer from "../components/commonCodeandPage/Footer";
import ContactPageDetails from "../components/core/ContactPages/ContactPageDetails";
import ContactFormContectPage from "../components/core/ContactPages/ContactFormContectPage";
import ReviewSlider from "../components/commonCodeandPage/ReviewSlider";
function ContactPage() {
  return (
    <div>
      <div className="mx-auto mt-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">
        {/* Contact Details */}
        <div className="lg:w-[40%]">
          <ContactPageDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%] mb-14">
          <ContactFormContectPage />
        </div>
      </div>
      <h1 className="text-center text-4xl font-semibold mt-8 text-richblack-100">
        Reviews from our learners
      </h1>
      <ReviewSlider />
      <Footer />
    </div>
  );
}

export default ContactPage;
