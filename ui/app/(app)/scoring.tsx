
import { useEffect, useState } from 'react';

import {
  Modal,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';

import Button from '@/components/ui/Button';
import Card from '@/components/ui/Card';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeatmapMat from '@/components/scoring/HeatmapMat';
import HeatmapModal from '@/components/scoring/HeatmapModal';

import { useTheme } from '@/theme/themeContext';

export type HeatmapEvent = {
  id: string;
  zone: string;
  action: string;
  points: number;
  player: 'RED' | 'BLUE';
  timestamp: string;
};

export default function ScoringScreen() {
  const theme = useTheme();

  const { width } =
    useWindowDimensions();

  const isDesktop =
    width >= 1024;

  const [selectedZone, setSelectedZone] =
    useState<string | null>(null);

  const [selectedWrestler, setSelectedWrestler] =
    useState<'RED' | 'BLUE' | null>(
      null
    );

  const [modalVisible, setModalVisible] =
    useState(false);

  const [showRoundModal, setShowRoundModal] =
    useState(false);

  const [events, setEvents] =
    useState<HeatmapEvent[]>([]);

  const [redScore, setRedScore] =
    useState(0);

  const [blueScore, setBlueScore] =
    useState(0);

  const [timeLeft, setTimeLeft] =
    useState(180);

  const [isRunning, setIsRunning] =
    useState(false);

  const [period, setPeriod] =
    useState(1);

  const [matchStatus, setMatchStatus] =
    useState<
      | 'NOT_STARTED'
      | 'RUNNING'
      | 'PAUSED'
      | 'ENDED'
    >('NOT_STARTED');

  useEffect(() => {
    let interval: any;

    if (
      isRunning &&
      timeLeft > 0
    ) {
      interval = setInterval(() => {
        setTimeLeft(
          (prev) => prev - 1
        );
      }, 1000);
    }

    if (timeLeft === 0) {
      setIsRunning(false);

      if (period < 3) {
        setShowRoundModal(
          true
        );
      } else {
        setMatchStatus(
          'ENDED'
        );
      }
    }

    return () =>
      clearInterval(interval);
  }, [
    isRunning,
    timeLeft,
    period,
  ]);

  const formatTime = (
    seconds: number
  ) => {
    const mins = Math.floor(
      seconds / 60
    );

    const secs = seconds % 60;

    return `${mins}:${
      secs < 10 ? '0' : ''
    }${secs}`;
  };

  const handleZonePress = (
    zone: string
  ) => {
    if (
      matchStatus === 'ENDED'
    )
      return;

    if (!selectedWrestler)
      return;

    setSelectedZone(zone);

    setModalVisible(true);
  };

  const handleSaveEvent = (
    event: HeatmapEvent
  ) => {
    setEvents((prev) => [
      ...prev,
      event,
    ]);

    if (event.player === 'RED') {
      setRedScore(
        (prev) =>
          prev + event.points
      );
    } else {
      setBlueScore(
        (prev) =>
          prev + event.points
      );
    }

    setModalVisible(false);

    setSelectedWrestler(
      null
    );
  };

  const startMatch = () => {
    setMatchStatus('RUNNING');

    setIsRunning(true);
  };

  const pauseMatch = () => {
    setMatchStatus('PAUSED');

    setIsRunning(false);
  };

  const resetMatch = () => {
    setIsRunning(false);

    setTimeLeft(180);

    setPeriod(1);

    setEvents([]);

    setRedScore(0);

    setBlueScore(0);

    setSelectedWrestler(
      null
    );

    setMatchStatus(
      'NOT_STARTED'
    );
  };

  const handleUndo = () => {
    if (events.length === 0)
      return;

    const lastEvent =
      events[events.length - 1];

    setEvents((prev) =>
      prev.slice(0, -1)
    );

    if (
      lastEvent.player === 'RED'
    ) {
      setRedScore((prev) =>
        Math.max(
          0,
          prev - lastEvent.points
        )
      );
    } else {
      setBlueScore((prev) =>
        Math.max(
          0,
          prev - lastEvent.points
        )
      );
    }
  };

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          theme.colors.background,
      }}>

      {/* TOP BAR */}
      <View
        style={{
          height: 130,

          backgroundColor:
            '#0B132B',

          justifyContent:
            'center',

          alignItems: 'center',

          paddingHorizontal: 20,
        }}>

        <View
          style={{
            flexDirection: 'row',

            alignItems: 'center',

            justifyContent:
              'center',

            width: '100%',
          }}>

          {/* RED */}
          <TouchableOpacity
            onPress={() =>
              setSelectedWrestler(
                'RED'
              )
            }
            style={{
              marginRight: 30,
            }}>

            <View
              style={{
                backgroundColor:
                  selectedWrestler ===
                  'RED'
                    ? '#7F1D1D'
                    : '#991B1B',

                width: 160,

                borderRadius: 20,

                alignItems:
                  'center',

                justifyContent:
                  'center',

                paddingVertical: 14,

                borderWidth:
                  selectedWrestler ===
                  'RED'
                    ? 3
                    : 0,

                borderColor:
                  'white',
              }}>

              <Text
                style={{
                  color: 'white',

                  fontSize: 20,

                  fontWeight: '700',
                }}>
                RED
              </Text>

              <Text
                style={{
                  color: 'white',

                  fontSize: 54,

                  fontWeight: '800',
                }}>
                {redScore}
              </Text>
            </View>
          </TouchableOpacity>

          {/* TIMER */}
          <View
            style={{
              alignItems: 'center',
            }}>

            <Text
              style={{
                color: 'white',

                fontSize: 18,

                fontWeight: '700',

                marginBottom: 10,
              }}>
              ROUND {period}
            </Text>

            <View
              style={{
                flexDirection: 'row',

                alignItems: 'center',
              }}>

              <Button
                title={
                  isRunning
                    ? 'Pause'
                    : 'Start'
                }
                onPress={
                  isRunning
                    ? pauseMatch
                    : startMatch
                }
              />

              <View
                style={{
                  backgroundColor:
                    'white',

                  marginHorizontal: 16,

                  paddingHorizontal: 34,

                  paddingVertical: 14,

                  borderRadius: 16,
                }}>

                <Text
                  style={{
                    fontSize: 42,

                    fontWeight: '800',
                  }}>
                  {formatTime(
                    timeLeft
                  )}
                </Text>
              </View>

              <Button
                title="Reset"
                variant="outline"
                onPress={
                  resetMatch
                }
              />
            </View>
          </View>

          {/* BLUE */}
          <TouchableOpacity
            onPress={() =>
              setSelectedWrestler(
                'BLUE'
              )
            }
            style={{
              marginLeft: 30,
            }}>

            <View
              style={{
                backgroundColor:
                  selectedWrestler ===
                  'BLUE'
                    ? '#1E3A8A'
                    : '#1D4ED8',

                width: 160,

                borderRadius: 20,

                alignItems:
                  'center',

                justifyContent:
                  'center',

                paddingVertical: 14,

                borderWidth:
                  selectedWrestler ===
                  'BLUE'
                    ? 3
                    : 0,

                borderColor:
                  'white',
              }}>

              <Text
                style={{
                  color: 'white',

                  fontSize: 20,

                  fontWeight: '700',
                }}>
                BLUE
              </Text>

              <Text
                style={{
                  color: 'white',

                  fontSize: 54,

                  fontWeight: '800',
                }}>
                {blueScore}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* MAIN AREA */}
      <View
        style={{
          flex: 1,

          flexDirection: 'row',
        }}>

        {/* LEFT PANEL */}
        <View
          style={{
            width: 170,

            backgroundColor:
              '#CBD5E1',

            padding: 16,
          }}>

          <Button
  title="Undo"
  variant="outline"
  onPress={handleUndo}
/>

<View style={{ height: 20 }} />

<Button
  title={
    period < 3
      ? `End Session ${period}`
      : 'End Match'
  }
  onPress={() => {
    setIsRunning(false);
    setShowRoundModal(true);
  }}
/>
        </View>

        {/* CENTER HEATMAP */}
        <View
          style={{
            flex: 1,

            justifyContent:
              'center',

            alignItems:
              'center',

            overflow: 'hidden',

            backgroundColor:
              '#F8FAFC',
          }}>

          {selectedWrestler && (
            <Text
              style={{
                fontSize: 22,

                fontWeight: '700',

                marginBottom: 24,

                color:
                  selectedWrestler ===
                  'RED'
                    ? '#DC2626'
                    : '#2563EB',
              }}>
              Please Select Area
            </Text>
          )}

          <HeatmapMat
            size={
              isDesktop
                ? 760
                : 320
            }
            onZonePress={
              handleZonePress
            }
            events={events}
          />
        </View>

        {/* RIGHT PANEL */}
        <View
          style={{
            width: 290,

            backgroundColor:
              '#CBD5E1',

            padding: 16,
          }}>

          <Card>
            <Text
              style={{
                fontSize: 26,

                fontWeight: '700',

                marginBottom: 16,

                color:
                  theme.colors
                    .textPrimary,
              }}>
              Recent Activity
            </Text>

            {[...events]
              .reverse()
              .slice(0, 8)
              .map((event) => (
                <View
                  key={event.id}
                  style={{
                    marginBottom: 14,

                    backgroundColor:
                      'white',

                    padding: 14,

                    borderRadius: 12,
                  }}>

                  <Text
                    style={{
                      fontWeight:
                        '700',

                      fontSize: 17,
                    }}>
                    {
                      event.player
                    }{' '}
                    •{' '}
                    {
                      event.action
                    }
                  </Text>

                  <Text
                    style={{
                      marginTop: 6,

                      fontSize: 15,
                    }}>
                    +
                    {
                      event.points
                    }{' '}
                    pts
                  </Text>

                  <Text
                    style={{
                      marginTop: 6,

                      fontSize: 13,

                      color:
                        '#64748B',
                    }}>
                    {
                      event.timestamp
                    }
                  </Text>
                </View>
              ))}

            {events.length === 0 && (
              <Text
                style={{
                  color:
                    '#64748B',
                }}>
                No events yet
              </Text>
            )}
          </Card>
        </View>
      </View>

      {/* ROUND MODAL */}
     <Modal
  visible={showRoundModal}
  transparent
  animationType="fade">
  
  <View
    style={{
      flex: 1,

      backgroundColor:
        'rgba(15,23,42,0.45)',

      justifyContent:
        'center',

      alignItems:
        'center',
    }}>
    
    <View
      style={{
        width: 520,

        backgroundColor:
          theme.colors.surface,

        borderRadius: 28,

        padding: 28,

        shadowColor: '#000',

        shadowOpacity: 0.15,

        shadowRadius: 20,

        elevation: 10,
      }}>
      
      {/* TITLE */}
      <View
        style={{
          alignItems: 'center',

          marginBottom: 28,
        }}>
        
        <Text
          style={{
            fontSize: 34,

            fontWeight: '800',

            color:
              theme.colors
                .textPrimary,
          }}>
          {period < 3
            ? `Session ${period} Over`
            : 'Match Finished'}
        </Text>

        <Text
          style={{
            marginTop: 8,

            fontSize: 16,

            color:
              theme.colors
                .textSecondary,
          }}>
          Official Match Summary
        </Text>
      </View>

      {/* SCORES */}
      <View
        style={{
          flexDirection: 'row',

          justifyContent:
            'space-between',

          marginBottom: 28,
        }}>
        
        {/* RED */}
        <View
          style={{
            flex: 1,

            marginRight: 10,

            backgroundColor:
              '#991B1B',

            borderRadius: 20,

            paddingVertical: 22,

            alignItems: 'center',
          }}>
          
          <Text
            style={{
              color: 'white',

              fontSize: 18,

              fontWeight: '700',
            }}>
            RED
          </Text>

          <Text
            style={{
              color: 'white',

              fontSize: 52,

              fontWeight: '800',

              marginTop: 6,
            }}>
            {redScore}
          </Text>
        </View>

        {/* BLUE */}
        <View
          style={{
            flex: 1,

            marginLeft: 10,

            backgroundColor:
              '#1D4ED8',

            borderRadius: 20,

            paddingVertical: 22,

            alignItems: 'center',
          }}>
          
          <Text
            style={{
              color: 'white',

              fontSize: 18,

              fontWeight: '700',
            }}>
            BLUE
          </Text>

          <Text
            style={{
              color: 'white',

              fontSize: 52,

              fontWeight: '800',

              marginTop: 6,
            }}>
            {blueScore}
          </Text>
        </View>
      </View>

      {/* LEADER */}
      <View
        style={{
          backgroundColor:
            redScore > blueScore
              ? '#FEE2E2'
              : blueScore >
                redScore
              ? '#DBEAFE'
              : '#FEF3C7',

          paddingVertical: 18,

          borderRadius: 18,

          alignItems: 'center',

          marginBottom: 30,
        }}>
        
        <Text
          style={{
            fontSize: 24,

            fontWeight: '800',

            color:
              redScore > blueScore
                ? '#B91C1C'
                : blueScore >
                  redScore
                ? '#1D4ED8'
                : '#D97706',
          }}>
          {redScore > blueScore
            ? 'RED Wrestler Leading'
            : blueScore >
              redScore
            ? 'BLUE Wrestler Leading'
            : 'Match Tied'}
        </Text>
      </View>

      {/* BUTTON */}
      <Button
        title={
          period < 3
            ? `Start Session ${
                period + 1
              }`
            : 'Close Match'
        }
        onPress={() => {
          setShowRoundModal(
            false
          );

          if (period < 3) {
            setPeriod(
              (prev) =>
                prev + 1
            );

            setTimeLeft(180);

            setIsRunning(
              true
            );
          } else {
            setMatchStatus(
              'ENDED'
            );
          }
        }}
      />
    </View>
  </View>
</Modal>

      {/* EVENT MODAL */}
      <HeatmapModal
        visible={modalVisible}
        zone={selectedZone}
        selectedPlayer={
          selectedWrestler
        }
        onClose={() =>
          setModalVisible(false)
        }
        onSave={
          handleSaveEvent
        }
      />
    </SafeAreaView>
  );
}

