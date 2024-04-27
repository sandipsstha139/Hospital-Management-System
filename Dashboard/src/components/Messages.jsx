import { useContext, useEffect, useState } from "react";
import { Context } from "../context/Context";
import apiRequest from "../lib/apiRequest";
import { useNavigate } from "react-router-dom";

const Messages = () => {
  const [messages, setMessages] = useState([]);

  const { isAuthenticated } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const { data } = await apiRequest.get("/message/getall");
        setMessages(data.messages);
      } catch (err) {
        console.log(err);
      }
    };
    fetchMessages();
  }, []);

  
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);


  return (
    <section className="page messages">
      <h1>Messages</h1>
      <div className="banner">
        {messages && messages.length > 0 ? (
          messages.map((element, index) => (
            <div className="card" key={index}>
              <div className="details">
                <p>
                  First Name: <span>{element.firstName}</span>
                </p>
                <p>
                  Last Name: <span>{element.lastName}</span>
                </p>
                <p>
                  Email: <span>{element.email}</span>
                </p>
                <p>
                  Phone: <span>{element.phone}</span>
                </p>
                <p>
                  Message: <span>{element.message}</span>
                </p>
              </div>
            </div>
          ))
        ) : (
          <h1>No messages Available</h1>
        )}
      </div>
    </section>
  );
};

export default Messages;
