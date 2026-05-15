import { Animated, Text, TouchableOpacity } from 'react-native';

export default function Sidebar({
  menu,
  path,
  router,
  translateX,
  onClose,
  theme,
}: any) {
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 0,
        width: 220,
        backgroundColor: theme.colors.surface,
        padding: 20,
        borderRightWidth: 1,
        borderColor: theme.colors.border,
        transform: [{ translateX }],
        zIndex: 5,
      }}
    >
      <TouchableOpacity onPress={onClose} style={{ marginBottom: 20 }}>
        <Text style={{ color: theme.colors.primary }}>Close ✕</Text>
      </TouchableOpacity>

      {menu.map((item: any) => (
        <TouchableOpacity
          key={item.path}
          onPress={() => router.replace(item.path)}
          style={{
            padding: 12,
            marginBottom: 8,
            borderRadius: 8,
            backgroundColor:
              path?.includes(item.path)
                ? theme.colors.primary
                : 'transparent',
          }}
        >
          <Text
            style={{
              color:
                path?.includes(item.path)
                  ? '#fff'
                  : theme.colors.textPrimary,
            }}
          >
            {item.name}
          </Text>
        </TouchableOpacity>
      ))}
    </Animated.View>
  );
}