import React, { useState, useMemo } from 'react';
import * as RNLocalize from 'react-native-localize';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, DateButton, DateText } from './styles';

export default function DateInput({ date, onChange }) {
  const timezone = RNLocalize.getTimeZone();
  const [opened, setOpened] = useState(false);

  const dateFormatted = useMemo(
    () =>
      format(date, "dd 'de' MMMM 'de' yyyy", {
        timeZone: timezone,
        locale: pt,
      }),
    [date]
  );

  async function setDate(event, value) {
    setOpened(false);
    if (value) {
      const selectedDate = new Date(value);
      onChange(selectedDate);
    }
  }

  return (
    <Container>
      <DateButton onPress={() => setOpened(!opened)}>
        <Icon name="event" color="#FFF" size={20} />
        <DateText>{dateFormatted}</DateText>
      </DateButton>
      {opened && (
        <DateTimePicker
          value={date}
          display="spinner"
          onChange={setDate}
          minimumDate={new Date()}
          minuteInterval={60}
          locale="pt"
          mode="date"
        />
      )}
    </Container>
  );
}
