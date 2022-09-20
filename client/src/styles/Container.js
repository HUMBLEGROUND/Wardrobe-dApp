import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  left: 50%;
  top: ${props => props.top};
  transform: translate(-50%, -50%);
`;

export const Title = styled.div`
  position: relative;
  color: ${props => props.color};
  font-size: 3rem;
  font-weight: 600;
`;

export const Description = styled.div`
  color: ${props => props.color};
  max-width: 500px;
  font-size: 1.2rem;
  border-bottom: ${props => props.borderBottom};
`;

export const Label = styled.div`
  white-space: nowrap;
`;
