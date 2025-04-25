export const encodeShareData = (data: {
  name: string;
  italianName: string;
  character: string;
  imageUrl: string;
}) => {
  const params = new URLSearchParams();
  Object.entries(data).forEach(([key, value]) => {
    params.append(key, encodeURIComponent(value));
  });
  return params.toString();
};

export const decodeShareData = (searchParams: URLSearchParams) => {
  const data = {
    name: '',
    italianName: '',
    character: '',
    imageUrl: '',
  };

  Object.keys(data).forEach((key) => {
    const value = searchParams.get(key);
    if (value) {
      data[key as keyof typeof data] = decodeURIComponent(value);
    }
  });

  return data;
};
