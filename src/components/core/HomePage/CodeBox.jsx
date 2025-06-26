import React from "react";
import CTAButton from "./ReUseButton";
import { ImArrowRight2 } from "react-icons/im";
import { TypeAnimation } from "react-type-animation";
const CodeBox = ({
    position,
    heading,
    subheading,
    codeBtn1,
    codeBtn2,
    codeContent,
    backgraoundGradiant,
    CodeColor,
}) => {
    return (
        <div
            className={`flex ${position} my-20 mx-16 justify-betweenn flex-col  lg:gap-10 gap-11`}
        >
            {/* section one  */}
            {/* Heading */}
            <div className=" lg:w-[50%] flex flex-col gap-8">
                {heading}
                {/* subheading */}
                <div className=" text-richblack-300 text-base font-bold w-[85%] -mt-3">
                    {subheading}
                </div>
                {/* Button Group  */}
                <div className="flex gap-7 mt-8">
                    <CTAButton active={codeBtn1.active} linkto={codeBtn1.link}>
                        <div className="flex gap-2 items-center">
                            {codeBtn1.btnText}
                            <ImArrowRight2 />
                        </div>
                    </CTAButton>

                    <CTAButton active={codeBtn2.active} linkto={codeBtn2.link}>
                        {codeBtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            {/* section two for our code animation  */}
            <div className="h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[14px] sm:leading-6 relative w-[100%] lg:w-[470px]">
                {/* background code gradient  */}
                {backgraoundGradiant}
                {/* counting */}
                <div className="text-center flex flex-col   w-[8%] select-none text-richblack-500 font-inter font-bold ">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                    <p>12</p>
                    <p>13</p>
                    <p>14</p>
                    <p>15</p>
                    <p>16</p>
                    <p>17</p>
                </div>
                <div className={`w-[92%] flex flex-col gap-2 font-mono ${CodeColor} pr-2
                   `}>
                    <TypeAnimation
                    
                        sequence={[codeContent,10000,]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace:"pre-line",
                            display:"block"
                        }}
                        omitDeletionAnimation={true}

                    >

                    </TypeAnimation>
                </div>


            </div>
        </div>
    );
};

export default CodeBox;
