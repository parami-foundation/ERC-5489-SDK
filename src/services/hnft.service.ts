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

export interface AdMetaData {
  icon: string;
  poster: string;
  title: string;
  tag: string;
  url: string;
  rewardTokenIcon: string;
  rewardTokenUnit: string;
  rewardAmount: string;
}

export interface AdData {
  bidPageUrl: string;
  hnftContractAddress: string;
  hnftTokenId: number;
  adMetaData?: AdMetaData;
}

export const fetchAdDataByImageUrl = async (hnft: {
  hnftImageUrl?: string;
  hnftContractAddress?: string;
  hnftTokenId?: number;
}) => {
  const data = JSON.stringify(hnft);
  const resp = await fetch(`https://staging.parami.io/airdrop/sdk/api/ad/current`, {
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    body: data
  });

  if (!resp.ok) {
    return null; // todo: handle error
  }

  const adData = await resp.json();
  return adData as AdData;

  // try {
  //   console.log('fetching ad data by image url', imageUrl);

  //   const config = await fetchConfig();
  //   return imageUrl
  //     ? { ...MOCK_AD_DATA, ...config }
  //     : { ...MOCK_AD_DATA_EMPTY, ...config };
  // } catch (error) {
  //   // return default empty ad data
  //   return MOCK_AD_DATA_EMPTY;
  // }
}

export const fetchConfig = async () => {
  return {
    bidPageUrl: 'https://gptminer.io/#/bid',
    ad3Icon: 'https://ipfs.parami.io/ipfs/Qmcjqx3Wu61Aw6AnrEJQKVDFSfSwQAsYJwCMUFsbTXPf3t'
  }
}
