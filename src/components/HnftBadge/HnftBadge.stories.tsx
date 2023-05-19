import { ComponentMeta, ComponentStory } from "@storybook/react";
import HnftBadge from "./HnftBadge";
import React from "react";

const nft = require('../../assets/5383.png');

export default {
  title: 'ERC5489/HnftBadge',
  component: HnftBadge,
} as ComponentMeta<typeof HnftBadge>;

const Template: ComponentStory<typeof HnftBadge> = (args) => <>
  <div style={{width: '200px', position: 'relative'}}>
    <img style={{width: '100%'}} src={nft}></img>
    <div style={{
      position: 'absolute',
      right: '4px',
      top: '4px',
      width: '30px',
      height: '30px'
    }}>
      <HnftBadge {...args} />
    </div>
  </div>
</>;

export const NotHNFT = Template.bind({});
NotHNFT.args = {
  hnftContractAddress: '0x94F25955e84682BbE5301537f29442Ce1D5b7584',
  hnftTokenId: 99999,
  hnftImageUrl: nft
};

export const NoAd = Template.bind({});
NoAd.args = {
  hnftContractAddress: '0x94F25955e84682BbE5301537f29442Ce1D5b7584',
  hnftTokenId: 1,
  hnftImageUrl: nft
};

export const HasAd = Template.bind({});
HasAd.args = {
  hnftContractAddress: '0x94F25955e84682BbE5301537f29442Ce1D5b7584',
  hnftTokenId: 140,
  hnftImageUrl: nft
};
