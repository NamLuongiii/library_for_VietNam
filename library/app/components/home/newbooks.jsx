"use client"

import { Button } from '@chakra-ui/react';
import React from 'react';
import { ScrollMenu, VisibilityContext, publicApiType } from 'react-horizontal-scrolling-menu';
import 'react-horizontal-scrolling-menu/dist/styles.css';

const getItems = () =>
  Array(20)
    .fill(0)
    .map((_, ind) => ({ id: `element-${ind}` }));

export default function DiscoveryBooks() {
  const [items, setItems] = React.useState(getItems);

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {items.map(({ id }) => (
        <Card
          itemId={id} // NOTE: itemId is required for track items
          title={id}
          key={id}
        />
      ))}
    </ScrollMenu>
  );
}

const LeftArrow = () => {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  return (
    <Button
      onClick={visibility.scrollPrev}
      className="left"
    >
      Left
    </Button>
  );
};

const RightArrow = () => {
  const visibility = React.useContext<publicApiType>(VisibilityContext);
  return (
    <Button
      onClick={visibility.scrollNext}
      className="right"
    >
      Right
    </Button>
  );
};

function Card({ title }) {
  return (
    <div
      style={{
        width: '160px',
      }}
    >
      <div className="card">
        <div>{title}</div>
      </div>
      <div
        style={{
          height: '200px',
        }}
      />
    </div>
  );
}
