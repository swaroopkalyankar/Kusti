import {
  Pressable,
  View,
} from 'react-native';

import { HeatmapEvent } from '@/app/(app)/scoring';
import { useTheme } from '../../theme/themeContext';

type Props = {
  onZonePress: (
    zone: string
  ) => void;

  events: HeatmapEvent[];

  size?: number;
};

const GRID_SIZE = 12;

export default function HeatmapMat({
  events,
  onZonePress,
  size = 340,
}: Props) {
  const theme = useTheme();

  const matSize = size;

  const outerRing =
    matSize * 0.82;

  const innerRing =
    matSize * 0.52;

  const centerCircle =
    matSize * 0.12;

  const cellSize =
    matSize / GRID_SIZE;

  const markerSize =
    matSize * 0.035;

  const getMarkerColor = (
    event: HeatmapEvent
  ) => {
    if (
      event.action ===
      'WARNING'
    ) {
      return '#F59E0B';
    }

    if (
      event.action ===
      'PIN'
    ) {
      return '#111827';
    }

    return event.player ===
      'RED'
      ? '#DC2626'
      : '#2563EB';
  };

  return (
    <View
      style={{
        alignItems:
          'center',

        justifyContent:
          'center',
      }}>
      
      {/* MAT */}
      <View
        style={{
          width: matSize,

          height: matSize,

          borderRadius: 999,

          backgroundColor:
            '#E2E8F0',

          alignItems:
            'center',

          justifyContent:
            'center',

          overflow:
            'hidden',

          position:
            'relative',
        }}>
        
        {/* OUTER RING */}
        <View
          style={{
            width: outerRing,

            height:
              outerRing,

            borderRadius: 999,

            borderWidth: 8,

            borderColor:
              '#CBD5E1',

            position:
              'absolute',
          }}
        />

        {/* INNER RING */}
        <View
          style={{
            width: innerRing,

            height:
              innerRing,

            borderRadius: 999,

            borderWidth: 7,

            borderColor:
              '#94A3B8',

            position:
              'absolute',
          }}
        />

        {/* CENTER DOT */}
        <View
          style={{
            width:
              centerCircle,

            height:
              centerCircle,

            borderRadius: 999,

            backgroundColor:
              theme.colors
                .primary,

            opacity: 0.25,

            position:
              'absolute',
          }}
        />

        {/* TOUCH GRID */}
        {Array.from({
          length:
            GRID_SIZE,
        }).map((_, row) =>
          Array.from({
            length:
              GRID_SIZE,
          }).map((_, col) => {
            const left =
              col *
              cellSize;

            const top =
              row *
              cellSize;

            return (
              <Pressable
                key={`${row}-${col}`}
                onPress={() =>
                  onZonePress(
                    `${row}-${col}`
                  )
                }
                style={{
                  position:
                    'absolute',

                  left,

                  top,

                  width:
                    cellSize,

                  height:
                    cellSize,
                }}
              />
            );
          })
        )}

        {/* MARKERS */}
        {events.map(
          (event) => {
            const [
              row,
              col,
            ] =
              event.zone.split(
                '-'
              );

            const left =
              Number(col) *
                cellSize +
              cellSize / 2 -
              markerSize / 2;

            const top =
              Number(row) *
                cellSize +
              cellSize / 2 -
              markerSize / 2;

            return (
              <View
                key={event.id}
                style={{
                  position:
                    'absolute',

                  left,

                  top,

                  width:
                    markerSize,

                  height:
                    markerSize,

                  borderRadius: 999,

                  backgroundColor:
                    getMarkerColor(
                      event
                    ),

                  shadowColor:
                    getMarkerColor(
                      event
                    ),

                  shadowOpacity: 0.4,

                  shadowRadius: 4,

                  elevation: 3,
                }}
              />
            );
          }
        )}
      </View>
    </View>
  );
}