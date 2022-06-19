import { createAction, props } from '@ngrx/store';
import { KeycloakInfo } from '../model/keycloak-info';

export const update = createAction('Update Keycloak Info', props<{ keycloakInfo: KeycloakInfo }>());
