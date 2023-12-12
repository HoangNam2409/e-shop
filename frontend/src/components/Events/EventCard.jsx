import React from "react";
import styles from "../../styles/styles.js";
import CountDown from './CountDown.jsx'

export default function EventCard() {
    return (
        <div className="w-full block bg-white rounded-lg lg:flex p-2 mb-12">
            <div className="w-full lg:-w[50%] m-auto">
                <img
                    src="https://m.media-amazon.com/images/I/31Vle5fVdaL.jpg"
                    alt="EventCard"
                />
            </div>
            <div className="w-full lg:[w-50%] flex flex-col justify-center">
                <h2 className={`${styles.productTitle}`}>
                    Iphone 14 Pro Max8/256GB
                </h2>
                <p>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Temporibus corrupti a libero quae debitis! Neque sunt
                    repellendus quae quisquam iste, ea eos, aut sint est fuga
                    sequi fugit sed consectetur?
                </p>

                <div className="flex py-2 justify-between">
                    <div className="flex">
                        <h5 className="font-[500] text-[18px] text-[#d55b45] pr-3 line-through">
                            1099$
                        </h5>

                        <h5 className="font-bold text-[20px] text-[#333] font-Roboto">
                            999$
                        </h5>
                    </div>

                    <span className="pr-3 font-[400] text-[17px] text-[#44a55e]">120 sold</span>
                </div>

                <CountDown />
            </div>
        </div>
    );
}
