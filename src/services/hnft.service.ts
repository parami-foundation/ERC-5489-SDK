export interface AdMetaData {
  icon: string;
  poster: string;
  title: string;
  tag: string;
  url: string;
  rewardTokenIcon: string;
  rewardTokenUnit: string;
  rewardAmount?: string;
}

export interface AdData {
  bidId?: string;
  bidPageUrl: string;
  claimPageUrl: string;
  hnftContractAddress: string;
  hnftTokenId: number;
  hnftTokenUri?: unknown;
  adMetaData?: AdMetaData | null;
}

export const fetchAdDataByHnft = async (hnft: {
  hnftImageUrl?: string;
  hnftAddress?: string;
  tokenId?: number;
}) => {
  const data = JSON.stringify(hnft);
  const resp = await fetch(`https://staging.parami.io/airdrop/sdk/api/current/ad`, {
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
}
