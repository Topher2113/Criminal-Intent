export type Crime = {
  id: string;
  title: string;
  details: string;
  date: string;
  solved: boolean;
  photoUri?: string;
};

export type Settings = {
  sortOrder: 'newest' | 'oldest' | 'title';
  dateFormat: 'short' | 'long';
};
