import { HttpHeaders } from '@angular/common/http';

export function apiHeaders() {
  return {headers: ('Authorization: Bearer' + localStorage.getItem('id_token'))};
}

export const apiUrl = 'http://api.dev2.koridor.ca:8080/api/v1/';
