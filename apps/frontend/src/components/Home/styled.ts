import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNavBar = styled.div`
  height: 30px;
  margin-bottom: 16px;
  margin-top: 16px;
  line-height: 30px;
  background: #f8f8f8;
  display: flex;
  justify-content: space-between;
`;

export const StyledNavItem = styled(Link)`
  padding: 0 8px;
  line-height: 30px;
`;
