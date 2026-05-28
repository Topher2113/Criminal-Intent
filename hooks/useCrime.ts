import { useEffect, useState } from 'react';
import { getCrime } from '@/storage/crimes';

export function useCrime(id: string) {
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');
  const [date, setDate] = useState(new Date());
  const [solved, setSolved] = useState(false);
  const [photoUri, setPhotoUri] = useState<string | undefined>();

  useEffect(() => {
    if (!id) return;
    getCrime(id).then((crime) => {
      if (!crime) return;
      setTitle(crime.title);
      setDetails(crime.details);
      setDate(new Date(crime.date));
      setSolved(crime.solved);
      setPhotoUri(crime.photoUri);
    });
  }, [id]);

  return { title, setTitle, details, setDetails, date, setDate, solved, setSolved, photoUri, setPhotoUri };
}
