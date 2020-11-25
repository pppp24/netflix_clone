import React from 'react';
import {
  Container,
  Inner,
  Title,
  Frame,
  Item,
  Header,
  Body,
} from './styles/accordion';

const ToggleContext = React.createContext();

export default function Accordion({ children, ...restProps }) {
  return (
    <Container>
      <Inner>{children}</Inner>
    </Container>
  );
}

Accordion.Title = function AccordionTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Accordion.Frame = function AccordionFrame({ children, ...restProps }) {
  return <Frame {...restProps}>{children}</Frame>;
};

Accordion.Item = function AccordionItem({ children, ...restProps }) {
  const [toggleShow, setToggleShow] = React.useState(false);
  return (
    <ToggleContext.Provider value={{ toggleShow, setToggleShow }}>
      <Item {...restProps}>{children}</Item>
    </ToggleContext.Provider>
  );
};

Accordion.Header = function AccordionHeader({ children, ...restProps }) {
  // have access to this context as Header will be passed down as a child of Item
  const { toggleShow, setToggleShow } = React.useContext(ToggleContext);

  return (
    <Header
      onClick={() => setToggleShow((toggleShow) => !toggleShow)}
      {...restProps}
    >
      {children}
      {toggleShow ? (
        <img src="/images/icons/close-slim.png" alt="Close" />
      ) : (
        <img src="/images/icons/add.png" alt="Open" />
      )}
    </Header>
  );
};

Accordion.Body = function AccordionBody({ children, ...restProps }) {
  const { toggleShow } = React.useContext(ToggleContext);

  return toggleShow ? (
    <Body {...restProps} toggle={toggleShow}>
      {children}
    </Body>
  ) : null;
};
