import { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Entypo } from '@expo/vector-icons';

import { GameParams } from '../../@types/navigation';

import { Background } from '../../components/Background';
import { Heading } from '../../components/Heading';
import { DuoCard, DuoCardProps } from '../../components/DuoCard';

import logoImg from '../../assets/logo-nlw-esports.png';

import { styles } from './styles';
import { THEME } from '../../theme';

export function Game() {
  const [ads, setAds] = useState<DuoCardProps[]>([]);

  const route = useRoute();
  const game = route.params as GameParams;

  const navigation = useNavigation();
  const handleGoBack = () => {
    navigation.goBack();
  };

  useEffect(() => {
    fetch(`http://192.168.15.9:3333/games/${game.id}/ads`)
      .then((response) => response.json())
      .then((data) => {
        console.table(data);
        setAds(data);
      });
  }, []);

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={handleGoBack}>
            <Entypo
              name='chevron-thin-left'
              color={THEME.COLORS.CAPTION_300}
              size={20}
            />
          </TouchableOpacity>

          <Image source={logoImg} style={styles.logo} resizeMode='cover' />

          <View style={styles.headerGhostDiv} />
        </View>

        <Image source={{ uri: game.bannerUrl }} style={styles.cover} />

        <Heading title={game.title} subtitle='Conecte-se e comece a jogar!' />

        <FlatList
          data={ads}
          horizontal
          contentContainerStyle={styles.contentList}
          style={styles.containerList}
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <DuoCard data={item} />}
          ListEmptyComponent={() => (
            <Text style={styles.emptyListText}>
              Não há anúncios publicados para este jogo no momento
            </Text>
          )}
        />
      </SafeAreaView>
    </Background>
  );
}
