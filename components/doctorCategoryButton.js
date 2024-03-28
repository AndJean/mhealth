import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

function DoctorCategoryButton({ category, iconSource }) {
  const navigation = useNavigation();
  const { t } = useTranslation();

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate('searchByCategories', { category: t(`home.category.${category}`) })}
      style={{ width: 100, alignItems: 'center' }}
    >
      <View style={{ height: 70, width: 70, borderRadius: 100, backgroundColor: '#f0f0f0', alignItems: 'center', justifyContent: 'center' }}>
        <Image source={iconSource} style={{ height: 50, width: 50 }} />
      </View>
      <View style={{ alignItems: 'center', marginTop: 12 }}>
        <Text style={{ textAlign: 'center' }}>{t(`home.category.${category}`)}</Text>
      </View>
    </TouchableOpacity>
  );
}

export default DoctorCategoryButton;