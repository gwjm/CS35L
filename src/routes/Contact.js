import React from "react";
import { Card, ConfigProvider, theme } from "antd";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";

function Contact() {
    const currentTheme = useTheme();
    const toggleTheme = useThemeUpdate();
    const { defaultAlgorithm, darkAlgorithm } = theme;
  
    const textStyle = {
        color: "#ff9090",
        textAlign: "center",
        size: "12px",
        background: "linear-gradient(135deg, #FBF4EC, #ECD7C8, #EEA4BC, #BE88C4, #9186E7, #92C9F9, #C7F8FF)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        textShadow: "0px 0px 1px rgba(0, 0, 0, 0.3)",
      };
      
  
    return (
      <ConfigProvider
        theme={{
          algorithm: currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
        }}
      >
        <Card style={{ backgroundColor: "grey", height: "100vh" }}>
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
            <Card style={{ maxWidth: 600 }}>
              <h1 style={{ textAlign: "center" }}>Contact</h1>
              <p style={textStyle}>
                Introducing our company, where we take the phrase "no tech support" to a whole new level of excellence! We
                proudly present ourselves as the pioneers of avoiding any form of contact or assistance. Our website? Oh,
                it's a masterpiece of frustration, designed to test your patience and make you question your sanity. With its
                mind-boggling navigation and creative error messages, it's like a virtual obstacle course that even the most
                adventurous souls would dread. Need help? Sorry, we don't believe in such mundane concepts. We prefer to leave
                you hanging, struggling with your unanswered questions, and pondering life's mysteries. Join us on this hilarious
                journey of incompetence and enjoy the perplexing adventure of our terrible site!
              </p>
            </Card>
          </div>
        </Card>
      </ConfigProvider>
    );
  }

export default Contact;