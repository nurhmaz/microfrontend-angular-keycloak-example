import { createReducer, on } from '@ngrx/store';
import { KeycloakInfo } from '../model/keycloak-info';
import { update } from './token.actions';

export const initialState = new KeycloakInfo('','','');

export const keycloakInfoReducer = createReducer(
  initialState,
  on(update, (state, { keycloakInfo }) => state = keycloakInfo)
);
