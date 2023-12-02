import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server.js";

export default function ActivationPage() {
    const { activation_token } = useParams();
    const [error, setError] = useState(false);

    useEffect(() => {
        if (activation_token) {
            const activationEmail = async () => {
                try {
                    const res = await axios.post(
                        `${server}/user/activation`,
                        {
                            activation_token,
                        },
                        { withCredentials: true }
                    );
                    console.log(res.data);
                } catch (error) {
                    console.log(error.response.data.message);
                    setError(true);
                }
            };

            activationEmail();
        }
    }, []);
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {error ? (
                <p>Your token is expired!</p>
            ) : (
                <p>Your account has been created successfully!</p>
            )}
        </div>
    );
}
