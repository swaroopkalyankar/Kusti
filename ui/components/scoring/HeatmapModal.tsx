import {
  Modal,
  ScrollView,
  Text,
  View,
} from 'react-native';

import Button from '../ui/Button';
import Card from '../ui/Card';

import { useTheme } from '../../theme/themeContext';

import { HeatmapEvent } from '@/app/(app)/scoring';

type Props = {
  visible: boolean;

  zone: string | null;

  selectedPlayer:
    | 'RED'
    | 'BLUE'
    | null;

  onClose: () => void;

  onSave: (
    event: HeatmapEvent
  ) => void;
};

const actions = [
  {
    label: 'Takedown',
    points: 2,
  },
  {
    label: 'Escape',
    points: 1,
  },
  {
    label: 'Reversal',
    points: 2,
  },
  {
    label: 'Near Fall +2',
    points: 2,
  },
  {
    label: 'Near Fall +3',
    points: 3,
  },
  {
    label: 'Near Fall +4',
    points: 4,
  },
  {
    label: 'Warning',
    points: 0,
  },
  {
    label: 'Stalling',
    points: 0,
  },
  {
    label: 'Pin',
    points: 0,
  },
];

export default function HeatmapModal({
  visible,
  zone,
  selectedPlayer,
  onClose,
  onSave,
}: Props) {
  const theme = useTheme();

  const handleSave = (
  action: any
) => {
    const event: HeatmapEvent = {
      id: Date.now().toString(),
      zone: zone || '',
      action: action.label,
      points: action.points,
      player:
  selectedPlayer || 'RED',
      timestamp:
        new Date().toLocaleTimeString(),
    };

    onSave(event);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade">
      
      <View
  style={{
    flex: 1,

    justifyContent:
      'center',

    alignItems:
      'center',

    backgroundColor:
      'rgba(15,23,42,0.45)',
  }}>
        
        {/* SHEET */}
        <View
  style={{
    width: 620,

    maxHeight: '85%',

    borderRadius: 28,

    overflow: 'hidden',
  }}>
          
          <Card>
            <ScrollView
              showsVerticalScrollIndicator={false}>
              
              {/* HANDLE */}
              

              {/* TITLE */}
              <Text
                style={{
                  fontSize:
                    theme.typography.h2,

                  fontWeight: '700',

                  color:
                    theme.colors.textPrimary,

                  marginBottom:
                    theme.spacing.xs,
                }}>
                Add Wrestling Event
              </Text>

              <Text
                style={{
                  color:
                    theme.colors.textSecondary,

                  marginBottom:
                    theme.spacing.lg,
                }}>
                Selected Area: {zone}
              </Text>

              {/* RED */}
              <Card variant="outlined">
  
  <Text
    style={{
      color:
        selectedPlayer ===
        'RED'
          ? '#DC2626'
          : '#2563EB',

      fontWeight: '700',

      fontSize:
        theme.typography.body,

      marginBottom:
        theme.spacing.md,
    }}>
    {
      selectedPlayer
    }{' '}
    Wrestler
  </Text>

  <View
    style={{
      flexDirection: 'row',

      flexWrap: 'wrap',

      justifyContent:
        'space-between',
    }}>
    
    {actions.map((action) => (
      <View
        key={action.label}
        style={{
          width: '48%',

          marginBottom: 10,
        }}>
        
        <Button
          title={action.label}
          variant="outline"
          size="sm"
          onPress={() =>
            handleSave(
              action
            )
          }
        />
      </View>
    ))}
  </View>
</Card>

              <View
                style={{
                  height:
                    theme.spacing.md,
                }}
              />

              {/* BLUE */}
              

              {/* FOOTER */}
              <View
                style={{
                  marginTop:
                    theme.spacing.lg,

                  marginBottom:
                    theme.spacing.xl,
                }}>
                <Button
                  title="Close"
                  variant="ghost"
                  onPress={onClose}
                />
              </View>

            </ScrollView>
          </Card>
        </View>
      </View>
    </Modal>
  );
}