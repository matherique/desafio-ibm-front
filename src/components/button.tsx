import styled from 'styled-components'

export default styled.button`
  width: 100px;
  height: 40px;
  color: #fff;
  font-size: 1.2rem;
  border-radius: 3px;
  background-color: #0a5aa2;
  border: 1px solid #042440;
  cursor: pointer;

  &:disabled {
    background-color: #6c9cc7;
    color: gray;
  }
`
