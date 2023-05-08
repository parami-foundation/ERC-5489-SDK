// @ts-ignore
import reactToWebComponent from 'react-to-webcomponent';
import React from 'react';
import * as ReactDOM from "react-dom/client"
import HnftBadge from './components/HnftBadge/HnftBadge';

const WebHnftBadge = reactToWebComponent(HnftBadge, React, ReactDOM);

if (!customElements.get('hnft-badge')) {
  customElements.define('hnft-badge', WebHnftBadge);
}
