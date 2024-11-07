import React, { Fragment } from "react";
import styled from "styled-components";
import { useBreadcrumb } from "./use-breadcrumb";
import { Arrow } from "./icons";
import { BreadcrumbType, BreadcrumbElementType } from "./breadcrumb.types";

type Props = BreadcrumbType & {
  onClick: (element: BreadcrumbElementType) => void;
  className?: string;
};

export const Breadcrumb = (props: Props) => {
  const { className, url, mapping, onClick } = props;
  const elements: BreadcrumbElementType[] = useBreadcrumb({ url, mapping });

  return (
    <Container className={`breadcrumb ${className}`}>
      {elements.map((element: BreadcrumbElementType, index: number) => {
        return (
          <Fragment key={index}>
            <Link className="breadcrumb-link" onClick={() => onClick(element)}>
              {element.label}
            </Link>

            {index < elements.length - 1 ? <BreadcrumbArrow className="breadcrumb-arrow" /> : null}
          </Fragment>
        );
      })}
      ;
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin: 0 0 2rem 2rem;
`;

const Link = styled.a`
  color: white;
  font-size: 2rem;
  text-decoration: none;
`;

const BreadcrumbArrow = styled(Arrow)`
  margin: 0 1rem 0 1rem;
  width: 1rem;
`;
