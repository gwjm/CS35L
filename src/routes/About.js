import React from "react";
import { Card, ConfigProvider, theme, Row, Col } from "antd";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";

function About() {
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
                algorithm: currentTheme === 'dark' ? darkAlgorithm : defaultAlgorithm,
            }}
        >
            <Card style={{ backgroundColor: "grey", height: "100vh" }}>
                <Row justify="center" align="middle" style={{ height: '100vh' }} gutter={[12, 12]}>
                    <Col>
                        <Card style={{ maxWidth: 600 }}>
                            <h2 style={{ textAlign: 'center' }}>Our Philosophy: Embracing Chaos</h2>
                            <p style={textStyle}>
                                At our company, we firmly believe that chaos is the key to innovation. Why have a functional website when you can have a chaotic masterpiece that keeps you on your toes? Our philosophy embraces confusion, perplexity, and the occasional existential crisis. We are committed to providing you with an experience that defies logic and challenges your sanity. So buckle up, embrace the chaos, and get ready to question every life choice that led you to our terrible company.
                            </p>
                        </Card>
                    </Col>
                    <Col>
                        <Card style={{ maxWidth: 600 }}>
                            <h2 style={{ textAlign: 'center' }}>Customer Service: An Imaginary Concept</h2>
                            <p style={textStyle}>
                                We take great pride in our non-existent customer service department. It's like a mythical creature that legends speak of but no one has ever seen. Need assistance? Sorry, we are too busy sharpening our invisible pencils and perfecting our disappearing act. We believe in leaving our customers with a sense of wonder and a never-ending quest for answers. Who needs support when you can embark on an adventure of self-discovery and personal growth? Welcome to the world of no tech support and customer service that exists only in your dreams.
                            </p>
                        </Card>
                    </Col>
                </Row>
            </Card>
        </ConfigProvider>
    );
}

export default About;
