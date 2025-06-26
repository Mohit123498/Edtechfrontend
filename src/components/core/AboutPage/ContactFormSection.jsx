import React from "react";
import ContactForm from "../../commonCodeandPage/ContactPage/ContactForm";
function ContactFormSection() {
  return (
    <div className="mx-auto w-11/12 flex flex-col">
      <h1 className="text-4xl mx-auto text-center">Get in Touch</h1>
      <p className="mx-auto text-center text-[18px] mt-4 w-11/12 text-richblack-300 font-semibold opacity-85">We’d love to here for you, Please fill out this form.</p>
      <ContactForm/>
    </div>
  );
}

export default ContactFormSection;
