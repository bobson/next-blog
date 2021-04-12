import { useRef, useState, useEffect } from "react";
import Notification from "../ui/notification";
import classes from "./contact-form.module.css";

async function sentContentData(contactDetails) {
  const response = await fetch("/api/contact", {
    method: "POST",
    body: JSON.stringify(contactDetails),
    headers: {
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }
}

const ContactForm = () => {
  const [requestStatus, setRequestStatus] = useState();
  const [requestError, setRequestError] = useState();

  const emailRef = useRef();
  const nameRef = useRef();
  const messageRef = useRef();

  useEffect(() => {
    if (requestStatus === "success" || requestStatus === "error") {
      const timer = setTimeout(() => {
        setRequestStatus(null);
        setRequestError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [requestStatus]);

  async function sentMessageHandler(e) {
    e.preventDefault();

    setRequestStatus("pending");

    try {
      await sentContentData({
        email: emailRef.current.value,
        name: nameRef.current.value,
        message: messageRef.current.value,
      });
      setRequestStatus("success");
      emailRef.current.value = "";
      nameRef.current.value = "";
      messageRef.current.value = "";
    } catch (error) {
      setRequestStatus("error");
      setRequestError(error.message);
    }
  }

  let notification;

  if (requestStatus === "pending") {
    notification = {
      status: "pending",
      title: "Sending message",
      message: "Your message is on its way!",
    };
  }

  if (requestStatus === "success") {
    notification = {
      status: "success",
      title: "Success!",
      message: "Message successfully send!",
    };
  }

  if (requestStatus === "error") {
    notification = {
      status: "error",
      title: "Error",
      message: requestError,
    };
  }

  return (
    <section className={classes.contact}>
      <h1>How can I help you</h1>
      <form className={classes.form} onSubmit={sentMessageHandler}>
        <div className={classes.controls}>
          <div className={classes.control}>
            <label htmlFor="email">
              Your Email
              <input type="email" id="email" required ref={emailRef} />
            </label>
          </div>
          <div className={classes.control}>
            <label htmlFor="name">
              Your Name
              <input type="text" id="name" required ref={nameRef} />
            </label>
          </div>
        </div>
        <div className={classes.control}>
          <label htmlFor="message">
            Your Message
            <textarea id="message" rows="5" required ref={messageRef} />
          </label>
        </div>

        <div className={classes.actions}>
          <button>Send Message</button>
        </div>
      </form>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
    </section>
  );
};

export default ContactForm;
