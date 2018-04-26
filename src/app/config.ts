import { HttpHeaders } from '@angular/common/http';

export function apiHeaders() {
  return {headers: ('Authorization: Bearer' + localStorage.getItem('id_token'))};
}

export const apiUrl = 'http://ec2-35-183-72-80.ca-central-1.compute.amazonaws.com:8080/api/v1/';
