import { useEffect, useState } from 'react';
import api from '@/utils/api';
import { Concert, Location, Category } from '@/types';

export const useExplore = () => {
  const [concerts, setConcerts] = useState<Concert[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const fetchConcerts = async () => {
      try {
        const response = await api.get('api/concerts');
        console.log('Fetched concerts:', response.data);
        setConcerts(response.data);
      } catch (error) {
        console.error('Error fetching concerts:', error);
      }
    };

    const fetchLocations = async () => {
      try {
        const response = await api.get('api/locations');
        console.log('Fetched locations:', response.data);
        setLocations(response.data);
      } catch (error) {
        console.error('Error fetching locations:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await api.get('api/categories');
        console.log('Fetched categories:', response.data);
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchConcerts();
    fetchLocations();
    fetchCategories();
  }, []);

  const filteredConcerts = concerts.filter((concert) => {
    const matchesLocation = selectedLocation
      ? concert.location.name === selectedLocation
      : true;
    const matchesCategory = selectedCategory
      ? concert.category.name === selectedCategory
      : true;
    const matchesSearchQuery = concert.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesLocation && matchesCategory && matchesSearchQuery;
  });

  return {
    concerts: filteredConcerts,
    locations,
    categories,
    selectedLocation,
    setSelectedLocation,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery,
  };
};
