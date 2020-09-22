import styled from 'styled-components/macro'
import { defaultTheme, typography } from '../styles'

const DefaulButtonStyle = styled.button`
  display: flex;
  min-height: 2.5rem;
  min-width: 10.5rem;
  font-family: ${typography.primaryFont};
  width: max-content;
  font-weight: 500;
  font-size: 0.875rem;
  letter-spacing: 0.2px;
  user-select: none;
  text-transform: capitalize;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: center;
  text-align: center;
  white-space: nowrap;
  position: relative;
  color: ${(props) => props.theme.btntextColor};
  background-color: ${(props) => props.theme.btnbackgroundColor};
  cursor: pointer;
  pointer-events: auto;
  box-shadow: none;
  padding: 0.75rem 2rem;
  border-radius: 5px;
  outline: none;
  transition: background-color 200ms ease 0ms, box-shadow 200ms ease 0ms,
    border 200ms ease 0ms, color 200ms ease 0ms;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;
  border-color: ${(props) => props.theme.borderColor};
  border-image: initial;

  &:hover {
    border-color: ${(props) => props.theme.borderHoverColor};
    color: ${(props) => props.theme.btntextHoverColor};
  }

  &.leadingicon,
  &.trailingicon {
    svg,
    i {
      height: 16px;
    }
  }
  &.leadingicon {
    svg,
    i {
      margin-right: 0.5rem;
    }
  }
  &.trailingicon {
    svg,
    i {
      margin-left: 0.5rem;
    }
  }

  &:disabled {
    user-select: none;
    color: rgb(204, 204, 204);
    background-color: ${(props) => props.theme.btndisabledbackgroundColor};
    cursor: not-allowed;
    pointer-events: auto;
  }

  &.shadow-btn: hover {
    cursor: pointer;
    pointer-events: auto;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 3px 8px;
    transform: translate3d(0px, -1px, 0px);
  }
`
DefaulButtonStyle.defaultProps = {
  theme: defaultTheme
}
export const ButtonStyle = styled(DefaulButtonStyle)`
  &.suprim-btn-size-auto {
    min-width: auto;
  }
  &.suprim-btn-size-small {
    min-width: auto;
    min-height: 1rem;
    padding: 0.5rem;
    font-size: 0.75rem;
  }
  &.suprim-btn-size-mid {
    min-width: auto;
    min-height: 1.5rem;
    padding: 0.65rem 1.2rem;
  }
  &.suprim-btn-size-large {
    font-size: 1rem;
    min-width: 12.5rem;
  }
  &.suprim-btn-size-fluid {
    font-size: 1rem;
    width: 100%;
    min-width: auto;
  }
  &.suprim-btn-primary {
    border-color: ${(props) => props.theme.primaryColor};
    background-color: ${(props) => props.theme.primaryColor};
    color: ${(props) => props.theme.primarybtntextColor};
    &:hover {
      border-color: ${(props) => props.theme.primaryColor};
      background-color: ${(props) => props.theme.primaryColor};
      color: #fff;
    }
    &.ghost {
      background-color: transparent;
      color: ${(props) => props.theme.primaryColor};
      &:hover {
        border-color: ${(props) => props.theme.primaryColor};
        background-color: ${(props) => props.theme.primaryColor};
        color: #fff;
      }
    }
  }
  &.suprim-btn-success {
    border-color: ${(props) => props.theme.successColor};
    background-color: ${(props) => props.theme.successColor};
    color: ${(props) => props.theme.primarybtntextColor};
    &:hover {
      border-color: ${(props) => props.theme.successdarkColor};
      background-color: ${(props) => props.theme.successdarkColor};
      color: #fff;
    }
    &.ghost {
      background-color: transparent;
      color: ${(props) => props.theme.successColor};
      &:hover {
        border-color: ${(props) => props.theme.successdarkColor};
        background-color: ${(props) => props.theme.successdarkColor};
        color: #fff;
      }
    }
  }
  &.suprim-btn-danger {
    border-color: ${(props) => props.theme.errorColor};
    background-color: ${(props) => props.theme.errorColor};
    color: ${(props) => props.theme.primarybtntextColor};
    &:hover {
      border-color: ${(props) => props.theme.errordarkColor};
      background-color: ${(props) => props.theme.errordarkColor};
      color: #fff;
    }
    &.ghost {
      background-color: transparent;
      color: ${(props) => props.theme.errorColor};
      &:hover {
        border-color: ${(props) => props.theme.errordarkColor};
        background-color: ${(props) => props.theme.errordarkColor};
        color: #fff;
      }
    }
  }

  &.suprim-btn-warning {
    border-color: ${(props) => props.theme.warningColor};
    background-color: ${(props) => props.theme.warningColor};
    color: ${(props) => props.theme.primarybtntextColor};
    &:hover {
      border-color: ${(props) => props.theme.warningdarkColor};
      background-color: ${(props) => props.theme.warningdarkColor};
      color: #fff;
    }
    &.ghost {
      background-color: transparent;
      color: ${(props) => props.theme.warningColor};
      &:hover {
        border-color: ${(props) => props.theme.warningdarkColor};
        background-color: ${(props) => props.theme.warningdarkColor};
        color: #fff;
      }
    }
  }
`
