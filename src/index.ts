// @ts-ignore
import reactToWebComponent from 'react-to-webcomponent';
import { Button } from './components';
import React from 'react';
import * as ReactDOM from "react-dom/client"

const WebGreeting = reactToWebComponent(Button, React, ReactDOM)

if (!customElements.get('web-greeting')) {
  customElements.define('web-greeting', WebGreeting);
}
