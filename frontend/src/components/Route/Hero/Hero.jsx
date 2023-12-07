import styles from "../../../styles/styles.js";
import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <div
            className={`relative min-h-[70vh] 800px:min-h[80vh] w-full bg-no-repeat ${styles.noramlFlex}`}
            style={{
                backgroundImage:
                    "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)",
            }}
        >
            <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1
                    className={`text-[35px] leading-[1.21] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}
                >
                    Best Best Collection for <br /> home Decoration
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptates incidunt veniam placeat itaque in adipisci
                    possimus a, quis rem. Ut laboriosam maxime odio, ratione
                    totam earum sint ipsam sit velit.
                </p>

                <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
}
