import { HttpHeaders } from '@angular/common/http';

export function apiHeaders() {
  return {headers: ('Authorization: Bearer' + localStorage.getItem('id_token'))};
}
