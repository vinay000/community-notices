import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = '@read_notice_ids';

export async function getStoredReadIds(): Promise<string[]> {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export async function storeReadId(id: string): Promise<void> {
  try {
    const ids = await getStoredReadIds();
    if (!ids.includes(id)) {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify([...ids, id]));
    }
  } catch {}
}
