import { paymentEndpoints } from "../api";
import { toast } from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import rzpLogo from "../../assets/Logo/StudyAddaLogoLarge.png";
import { setPaymentLoading } from "../../slice/courseSlice";
import { resetCart } from "../../slice/cartSlice";
// below code make the
//  <script src="https://checkout.razorpay.com/v1/checkout.js"></script>
//  and load it run time
// step1
function loadScript(src) {
  // on the basis ko success our handler call otherwise not
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

// step-2
export async function buyCourse(
  token,
  courses,
  userDetails,
  navigate,
  dispatch
) {
  const toastId = toast.loading("loading");
  try {
    //   load the script first  so call loadScript() function
    // copy below url from razorpay
    const response = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    //   check valid or not
    if (!response) {
      toast.error("RazorPay SDK failed to load");
      return;
    }

    // initiate the order by capture function  which is in controller
    // order initialize capture payment karta hai
    const orderResponse = await apiConnector(
      "POST",
      paymentEndpoints.COURSE_PAYMENT_API,
      { courses },
      {
        Authorization: `Bearer ${token}`,
      }
    );
    if (!orderResponse?.data.success) {
      throw new Error(
        "Got error while create order",
        orderResponse?.data.message
      );
    }

    // console.log("PRINTING orderResponse", orderResponse);

    // make the options->go razorpay website there you can see
    // what parameter need to give inside options

    const options = {
      // sab .env file se mil jayga
      // try karo jo response aa rha use form se nikalo orderResponse.data.message
      // always cross check kis form me data return ho rha hai
      key: process.env.RAZORPAY_KEY_ID,
      currency: orderResponse.data.message.currency,
      amount: `${orderResponse.data.message.amount}`,
      order_id: orderResponse.data.message.id,
      name: "StudyAdda",
      description: "Thank You for Purchasing the Course",
      image: rzpLogo,
      prefill: {
        name: `${userDetails.firstName}`,
        email: userDetails.email,
      },
      handler: function (response) {
        //send successful wala mail
        sendPaymentSuccessEmail(
          response,
          orderResponse.data.message.amount,
          token
        );
        //verifyPayment
        verifyPayment({ ...response, courses }, token, navigate, dispatch);
      },
    };

    // create the razorpay window modal
    const paymentObject = new window.Razorpay(options);
    // open the diler box of rezorpay
    paymentObject.open();
    // give some info also by this
    paymentObject.on("payment.failed", function (response) {
      toast.error("Opps!!! Payment Failed");
      // console.log(response.error);
    });
  } catch (error) {
    // console.log("PAYMENT API ERROR.....", error);
    // console.log(error?.response);
    toast.error("Could not make payment because "+error?.response?.data?.message);
  }
  toast.dismiss(toastId);
}

// send the course buy successful email
// token use bcs we do authorization
async function sendPaymentSuccessEmail(response, amount, token) {
  try {
    // call the backend emailsend payment function/controller
    await apiConnector(
      "POST",
      paymentEndpoints.SEND_PAYMENT_SUCCESS_EMAIL_API,
      {
        orderId: response.razorpay_order_id,
        paymentId: response.razorpay_payment_id,
        amount,
      },
      {
        Authorization: `Bearer ${token}`,
      }
    );
  } catch (error) {
    // console.log("PAYMENT SUCCESS EMAIL ERROR....", error);
  }
}

// Verify the payment or matching the signature
//verify payment
async function verifyPayment(bodyData, token, navigate, dispatch) {
  const toastId = toast.loading("Verifying Payment....");
  //   slice ke setPayment loading vale flag ko true kar do
  dispatch(setPaymentLoading(true));
  try {
    const response = await apiConnector(
      "POST",
      paymentEndpoints.COURSE_VERIFY_API,
      bodyData,
      {
        Authorization: `Bearer ${token}`,
      }
    );

    if (!response.data.success) {
      throw new Error("Mismatch signature ", response.data.message);
    }
    toast.success("payment Successful, you are addded to the course");

    // goto your enrolled courses
    await navigate("/dashboard/enrolled-courses");
    // you did all things in card so reset the card so code is added
    dispatch(resetCart());
  } catch (error) {
    // console.log("PAYMENT VERIFY ERROR....", error);
    toast.error("Could not verify Payment");
  }
  toast.dismiss(toastId);
  //   mark the setPayment flag false bcs ya to payment ho gayi hai ya failed ho gai hai
  dispatch(setPaymentLoading(false));
}
