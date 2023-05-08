const MOCK_AD_DATA = {
  isEmpty: false,
  avatar: 'https://pbs.twimg.com/profile_images/1611305582367215616/4W9XpGpU.jpg',
  rewardAmount: '300.00',
  rewardTokenUnit: '$AD3',
  username: 'kai kang',
  posterUrl: 'https://pbs.twimg.com/media/FqlTSTOWYAA7yKN?format=jpg&name=small',
  title: 'Tweeting is Mining!',
}

const MOCK_AD_DATA_EMPTY = {
  isEmpty: true,
  avatar: 'https://pbs.twimg.com/profile_images/1611305582367215616/4W9XpGpU.jpg',
  rewardAmount: '300.00',
  rewardTokenUnit: '$AD3',
  username: 'kai kang'
}

export const fetchAdDataByImageUrl = async (imageUrl: string) => {
  try {
    console.log('fetching ad data by image url', imageUrl);

    const config = await fetchConfig();
    return imageUrl
      ? { ...MOCK_AD_DATA, ...config }
      : { ...MOCK_AD_DATA_EMPTY, ...config };
  } catch (error) {
    // return default empty ad data
    return MOCK_AD_DATA_EMPTY;
  }
}

export const fetchConfig = async () => {
  return {
    bidPageUrl: 'https://gptminer.io/#/bid',
    ad3Icon: 'https://ipfs.parami.io/ipfs/Qmcjqx3Wu61Aw6AnrEJQKVDFSfSwQAsYJwCMUFsbTXPf3t'
  }
}
