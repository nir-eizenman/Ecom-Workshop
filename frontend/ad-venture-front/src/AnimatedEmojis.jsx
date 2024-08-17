import React, { useEffect } from 'react';
import { Box, Typography, Link } from '@mui/material';
import { styled } from '@mui/system';

const All = styled(Box)({
  overflow: 'hidden',
  height: '100vh',
  width: '100%',
  position: 'fixed',
});

const Container = styled(Box)({
  left: '0px',
  top: '-100px',
  height: 'calc(100vh + 100px)',
  overflow: 'hidden',
  position: 'relative',
});

const Animate = styled(Box)({
  margin: '0 auto',
  width: '20px',
  overflow: 'visible',
  position: 'relative',
});

const Text = styled(Box)({
  display: 'flex',
  height: '100vh',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
});

const Footer = styled(Box)({
  color: '#808080',
  textDecoration: 'none',
  position: 'fixed',
  width: '752px',
  bottom: '20px',
  alignContent: 'center',
  marginLeft: 'calc(50% - 376px)',
  '& a, & p': {
    textDecoration: 'none',
    color: '#808080',
    letterSpacing: '6px',
    transition: 'all 0.5s ease-in-out',
    width: 'auto',
    float: 'left',
    margin: '0',
    marginRight: '9px',
    '&:hover': {
      color: '#fff',
      letterSpacing: '2px',
      transition: 'all 0.5s ease-in-out',
    },
  },
});

const AnimatedEmojis = () => {
  useEffect(() => {
    const container = document.getElementById('animate');
    const emoji = [
      "📷",
      "📸",
      "🎥",
      "🌟",
      "❤️",
      "🧡",
      "💛",
      "💚",
      "💙",
      "💜",
      "💖",
      "💬",
      "🗨️",
      "🔥",
      "💎",
      "🥳",
      "😎",
      "🎉",
      "🎁",
      "📱",
      "💻",
      "👀",
      "✨",
      "💅",
      "🖼️"
  ]
  
    const circles = [];

    for (let i = 0; i < 15; i++) {
      addCircle(i * 150, [10 + 0, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 0, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 200, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 200, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 400, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 400, 300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 - 600, -300], emoji[Math.floor(Math.random() * emoji.length)]);
      addCircle(i * 150, [10 + 600, 300], emoji[Math.floor(Math.random() * emoji.length)]);
    }

    function addCircle(delay, range, color) {
      setTimeout(function () {
        const c = new Circle(range[0] + Math.random() * range[1], 80 + Math.random() * 4, color, {
          x: -0.15 + Math.random() * 0.3,
          y: 1 + Math.random() * 1,
        }, range);
        circles.push(c);
      }, delay);
    }

    function Circle(x, y, c, v, range) {
      const _this = this;
      this.x = x;
      this.y = y;
      this.color = c;
      this.v = v;
      this.range = range;
      this.element = document.createElement('span');
      this.element.style.opacity = 0;
      this.element.style.position = 'absolute';
      this.element.style.fontSize = '26px';
      this.element.style.color = `hsl(${Math.random() * 360 | 0}, 80%, 50%)`;
      this.element.innerHTML = c;
      container.appendChild(this.element);

      this.update = function () {
        if (_this.y > 800) {
          _this.y = 80 + Math.random() * 4;
          _this.x = _this.range[0] + Math.random() * _this.range[1];
        }
        _this.y += _this.v.y;
        _this.x += _this.v.x;
        this.element.style.opacity = 1;
        this.element.style.transform = `translate3d(${_this.x}px, ${_this.y}px, 0px)`;
      };
    }

    function animate() {
      circles.forEach(circle => circle.update());
      requestAnimationFrame(animate);
    }

    animate();
  }, []);

  return (
    <All>
      <Container>
        <Animate id="animate" />
      </Container>
      <Text>
        <Typography variant="h2" color="white">Your Emoji Animation</Typography>
      </Text>
      <Footer>
        <Link href="#!" underline="none">Footer Link</Link>
        <Typography component="p">Some Footer Text</Typography>
      </Footer>
    </All>
  );
};

export default AnimatedEmojis;
