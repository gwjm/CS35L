
import { Card } from 'antd';
import backgroundImage from "../styles/image1.jpg";
import { useTheme, useThemeUpdate } from "../contexts/ThemeContext";
import { ConfigProvider, theme, Typography, Layout } from 'antd';
import React, { useState, useEffect } from 'react';

const { Footer } = Layout;
const { Text , Link } = Typography;

const TypingAnimation = () => {
  const [text, setText] = useState('');
  const fullText = "TThis is Grace's favorite quote and color. Don't tell her I told you.";

  useEffect(() => {
    let isMounted = true;
    let currentIndex = 0;

    const typeText = () => {
      if (currentIndex < fullText.length - 1) {
        if (isMounted) {
          setText((prevText) => prevText + fullText[currentIndex]);
          currentIndex++;
          setTimeout(typeText, 100); // Adjust typing speed here (in milliseconds)
        } else {
          currentIndex = fullText.length; // Stop the animation if component is unmounted
        }
      }
    };
    typeText();

    return () => {
      isMounted = false;
    };
  }, []);

  return <Text strong>{text}</Text>;
};


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
            <TypingAnimation />
          </center>
        </div>
      </Card>
      <Footer style={{ textAlign: 'center' }}>
      Background Poro <Link href="https://www.wallpaperflare.com/white-and-brown-character-illustration-league-of-legends-poro-wallpaper-hbsnc">Wallpaper Flare</Link>
    </Footer>
    </ConfigProvider>
  );
}

export default Home;
