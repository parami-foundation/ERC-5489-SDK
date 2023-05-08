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

export const Empty = Template.bind({});
Empty.args = {};

export const Bid = Template.bind({});
Bid.args = {
  imageUrl: 'url'
};
