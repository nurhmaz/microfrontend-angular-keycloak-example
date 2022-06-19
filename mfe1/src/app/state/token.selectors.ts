import { createFeatureSelector } from '@ngrx/store';
import { KeycloakInfo } from '../model/keycloak-info';

export const selectToken = createFeatureSelector<KeycloakInfo>('keycloakInfoService');
