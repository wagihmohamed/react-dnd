import styled from "@emotion/styled";

export const Container = styled.div<{
    gap?: number;
}>`
    display: flex;
    width: 100%;
    height: 100vh;
    gap: ${({ gap }) => gap}px;
    background-color: var(--bg-color);
`;

export const Column = styled.div<{
    flex: number;
    paddingTop?: string;
    paddingLeft?: string;
    paddingRight?: string;
}>`
    display: flex;
    flex-direction: column;
    flex: ${({ flex }) => flex};
    background-color: #fff;
    padding-top: ${({ paddingTop }) => paddingTop};
    padding-left: ${({ paddingLeft }) => paddingLeft};
    padding-right: ${({ paddingRight }) => paddingRight};
`;

export const AppContainer = styled.div`
  display: flex;
  background-color: var(--bg-color);
  width: 100%;
  padding: 10px;
  overflow: hidden;
`;

export const TaskItemContainer = styled.div<{
    flexDirection?: string;
    alignItems?: string;
    justifyContent?: string;
}>`
border: 1px solid #000;
padding: 1.6rem 2rem;
display: flex;
flex-direction: column;
align-items: ${({ alignItems }) => alignItems};
justify-content: ${({ justifyContent }) => justifyContent};
gap: 1rem;
`;

export const TaskItemTitle = styled.span<{
    cursor?: string;
}>`
font-size: 1.5rem;
font-weight: 400;
cursor: ${({ cursor }) => cursor};
width: max-content;
`;

export const TaskItemDescription = styled.span`
font-size: 0.9rem;
font-weight: 400;
cursor: pointer;
width: max-content;
`;

export const TaskList = styled.div`
  min-height: 100px;
  display: flex;
  flex-direction: column;
  background: #f3f3f3;
  min-width: 341px;
  border-radius: 5px;
  padding: 15px 15px;
  margin-right: 45px;
`;

export const ModalContainer = styled.div`
position: absolute;
top:50%;
left:50%;
transform: translate(-50%, -50%);
width: 25rem;
background-color: #fff;
border-radius: 5px;
padding: 1rem;
`

export const FormContainer = styled.form`
display: flex;
flex-direction: column;
gap: 1rem;
`

export const TextField = styled.input`
width: 100%;
padding: 0.5rem;
border: 1px solid #000;
border-radius: 5px;
outline: none;
`

export const Button = styled.button`
width: 100%;
padding: 0.5rem;
border: 1px solid #000;
border-radius: 5px;
outline: none;
`