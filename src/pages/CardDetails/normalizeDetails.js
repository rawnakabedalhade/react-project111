const fromServer = (dataFromServer, likesArr) => {
  return {
    title: dataFromServer.title,
    subtitle: dataFromServer.subtitle,
    description: dataFromServer.description,
    phone: dataFromServer.phone,
    email: dataFromServer.email,
    web: dataFromServer.web,
    url: dataFromServer.image.url,
    address: dataFromServer.address,
    bizNumber: dataFromServer.bizNumber,
    likes: likesArr,
  };
};

export default fromServer;
