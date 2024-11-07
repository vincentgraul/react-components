import React from "react";
import styled from "styled-components";
import { InputType, InputColors, InputStatus } from "./input.types";

type Props = Exclude<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label: string;
  type: InputType;
  colors: InputColors;
  status?: InputStatus;
  message?: string;
  className?: string;
};

export const Input = (props: Props) => {
  const { className, label, message, colors, status, ...rest } = props;

  return (
    <Container className={`input ${className}`}>
      <InputContainer status={status} colors={colors} className="input-container">
        <InputStyled {...rest} />
        <Fieldset status={status} colors={colors} className="input-fieldset">
          <Legend className="input-fieldset-label">{label}</Legend>
        </Fieldset>
      </InputContainer>

      {message && (
        <MessageContainer className="message-container" status={status} colors={colors}>
          <Message className="message">{message}</Message>
        </MessageContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const InputStyled = styled.input`
  padding: 10px;
  width: 100%;
  border: 0;
  background-color: transparent;
  outline: none;
  z-index: 1;
  color: black;
`;

const Fieldset = styled.fieldset<{ status: InputStatus; colors: InputColors }>`
  border: 1px solid black;
  border-radius: 5px;
  position: absolute;
  inset: -8.5px 0 0;
  font-size: 15px;
  margin: 0;
  border-color: ${({ status, colors }) => colors[status]};
  color: ${({ status, colors }) => colors[status]};
  border-width: ${({ status }) =>
    status === "success" || status === "warning" || status === "error" ? "2px" : "1px"};
`;

const Legend = styled.legend`
  padding: 0 5px;
`;

const MessageContainer = styled.div<{ status: InputStatus; colors: InputColors }>`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-top: 5px;
  color: ${({ status, colors }) => colors[status]};
`;

const Message = styled.span`
  font-size: 14px;
`;

const InputContainer = styled.div<{ status: InputStatus; colors: InputColors }>`
  display: inline-flex;
  align-items: center;
  position: relative;

  ${InputStyled}:focus + ${Fieldset} {
    border-width: 2px;
    ${({ status, colors }) => !status && `border-color: ${colors.focus};`}
    ${({ status, colors }) => !status && `color: ${colors.focus};`}
  }
`;
