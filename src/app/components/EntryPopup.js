import { useEffect, useState, useRef } from "react";

export default function EntryPopup() {
    const [show, setShow] = useState(false);
    const [messages, setMessages] = useState([
        "Hey there! We're working behind the scenes.",
        "We’ll be back better than ever."
    ]);
    const closeTimerRef = useRef(null);

    useEffect(() => {
        const popupData = localStorage.getItem("entry_popup_closed");

        if (popupData) {
            const { timestamp } = JSON.parse(popupData);
            const oneHour = 60 * 60 * 1000;

            //if (Date.now() - timestamp < oneHour) return;
        }

        setShow(true);

        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
        }
        closeTimerRef.current = setTimeout(() => {
            setShow(false);
        }, 10000);

        return () => {
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
        }
    }, []);

    useEffect(() => {
        const handleOpen = (e) => {
            const detail = e?.detail || {};
            const nextMessages = Array.isArray(detail.messages) && detail.messages.length > 0
                ? detail.messages
                : undefined;
            if (nextMessages) {
                setMessages(nextMessages);
            }
            setShow(true);
            if (closeTimerRef.current) {
                clearTimeout(closeTimerRef.current);
            }
            closeTimerRef.current = setTimeout(() => {
                setShow(false);
            }, 10000);
        };
        window.addEventListener("open-entry-popup", handleOpen);
        return () => window.removeEventListener("open-entry-popup", handleOpen);
    }, []);

    const closePopup = () => {
        setShow(false);
        if (closeTimerRef.current) {
            clearTimeout(closeTimerRef.current);
        }

        localStorage.setItem(
            "entry_popup_closed",
            JSON.stringify({ timestamp: Date.now() })
        );

        document.body.classList.remove("blur-bg");
    };

    if (!show) return null;

    return (
        <div className="popup-overlay">
            <div className="noise-bg"></div>
            <div className="popup-box">

                {messages.map((line, idx) => (
                    <p key={idx} className="popup-message">
                        {line}
                    </p>
                ))}

                <button className="popup-close" onClick={closePopup}>Close</button>
            </div>
        </div>
    );
}
