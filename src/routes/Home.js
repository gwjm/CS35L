import React from "react";
import { Card } from 'antd';
import backgroundImage from "../styles/image1.jpg";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";
import { ConfigProvider , theme } from 'antd';

const { defaultAlgorithm, darkAlgorithm } = theme;

const Home = (props) => {
    const currentTheme = useTheme();
    const toggleTheme = useThemeUpdate();
    const divStyle = {
        background: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
    };

    return (
        <ConfigProvider
            theme={{
                algorithm: currentTheme === "dark" ? darkAlgorithm : defaultAlgorithm,
            }}>
            <Card>
                <div className="home" style={divStyle}>
                    <center>
                        <h1>
                            Project
                            <span>Hub</span>
                        </h1>
                        <p>I just picked a shade</p>
                    </center>
                </div>
            </Card>
        </ConfigProvider>
    );
}

export default Home;
