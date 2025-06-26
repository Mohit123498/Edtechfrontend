import React from "react";
import ContactForm from "../../commonCodeandPage/ContactPage/ContactForm";
const ContactFormContectPage = () => {
  return (
    <div className="border border-richblack-600 text-richblack-300 rounded-xl p-7 lg:p-14 flex gap-1 flex-col">
      <h1 className="text-4xl leading-10 font-semibold text-richblack-5">
        Got an Idea? We&apos;ve got the skills. Let&apos;s connect with us
      </h1>
      <p className="">
       Have any questions? &nbsp;We&apos;d love to hear from you.
      </p>

      <div className="mt-1">
        <ContactForm/>
      </div>
    </div>
  );
};

export default ContactFormContectPage;