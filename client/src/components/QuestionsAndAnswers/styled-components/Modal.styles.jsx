import styled from 'styled-components';

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  // Black color with 50% alpha/opacity
  background-color: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  // always on top
  z-index: 9999;
`;

export const ModalContainer = styled.div`
  width: 50%;
  background-color: ${({ $theme }) => ($theme === 'light' ? 'white' : '#303030')};
  padding: 30px;
  border-radius: 10px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: #fff;
  border: none;
  border-radius: 50%;
  padding: 5px 10px;
  cursor: pointer;
  &:hover {
    color: #f44336;
  }
`;
export const InputLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

export const TextInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`;

export const LargerTextarea = styled.textarea`
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  resize: vertical;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`;
export const ImageInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  &:focus {
    border-color: #007bff;
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0,123,255,.25);
  }
`;

export const InputWithButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const UrlButton = styled.button`
  background: none;
  border: none;
  border-radius: 4px;
  margin-bottom: 10px;
  cursor: pointer;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: white;
  &:hover {
    background-color: #bbb;
  }
  transition: background-color 0.3s;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding-top: 1rem;
`;

export const WarningMessageContainer = styled.div`
  background-color: #ffdddd;
  border: 1px solid #f44336;
  padding: 10px;
  margin: 10px;
  border-radius: 6px;
  color: #f44336;
  font-weight: bold;
  border-radius: 6px;
`;

export const CustomChooseFileInput = styled.input`
  display: none;
`;

export const CustomFileInputLabel = styled.label`
  display: inline-block;
  padding: 8px 16px;
  background: #2d87f0;
  color: #fff;
  border: none;
  border-radius: 10x;
  cursor: pointer;
  text-align: center;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.1);
  transition: background-color 0.3s;
  &:hover {
    background-color: #1a5bd8;
  }
`;

export const ImageModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0,0,0,0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalImage = styled.img`
  max-width: 80%;
  max-height: 80%;
`;

export const HighlightedH4 = styled.h4`
  font-size: 18px;
  margin: 20px 0;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: 0.5px;
`;