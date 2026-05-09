import { usePathname, useRouter } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { Animated, View } from 'react-native';
import { useTheme } from '../../../theme/themeContext';

import Content from './Content';
import Footer from './Footer';
import Header from './Header';
import Sidebar from './Sidebar';

export default function WebLayout({ children }: any) {
  const router = useRouter();
  const path = usePathname();
  const theme = useTheme();

  const sidebarWidth = 220;

  const [isSidebarOpen, setSidebarOpen] = useState(true);

  const anim = useRef(new Animated.Value(1)).current;

  const menu = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'Tab 1', path: '/tab1' },
    { name: 'Tab 2', path: '/tab2' },
  ];

  useEffect(() => {
    Animated.timing(anim, {
      toValue: isSidebarOpen ? 1 : 0,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [isSidebarOpen]);

  const sidebarTranslate = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [-sidebarWidth, 0],
  });

  const contentMargin = anim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, sidebarWidth],
  });

  return (
    <View style={{ flex: 1 }}>

      <Header onToggle={() => setSidebarOpen(!isSidebarOpen)}  theme={theme}/>

      <View style={{ flex: 1, flexDirection: 'row' }}>
        
        <Sidebar
          menu={menu}
          path={path}
          router={router}
          translateX={sidebarTranslate}
          onClose={() => setSidebarOpen(false)}
          theme={theme}
        />

        <Content marginLeft={contentMargin} theme={theme}>
          {children}
        </Content>

      </View>

      <Footer theme={theme} />
    </View>
  );
}