const DateFormatter = (dateStyle, timeStyle) => {
  const formatDate = (date) => {
    const formatter = new Intl.DateTimeFormat('en-US', {
      dateStyle: dateStyle,
      timeStyle: timeStyle
    });
    return formatter.format(Date.parse(date));
  };

  return { formatDate };
};

export default DateFormatter;
