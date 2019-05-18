import {Component, OnInit} from '@angular/core';
import {MapsAPILoader} from '@agm/core';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  // Bochum center place
  lat = 51.4818111;
  lng = 7.2196635;
  zoom = 5;
  markers = [];
  result = [];
  filteredMarkers = [];
  detailForm: FormGroup;

  constructor(private mapsAPILoader: MapsAPILoader,
              private fb: FormBuilder, ) {
  }

  getLocations(): Array<{ country: string, city: string, zip_code: number, latitude: number, longitude: number }> {
    return [
      {'country': 'Germany', 'zip_code': 45127, 'city': 'Essen', 'latitude': 51.4582235, 'longitude': 7.0158171},
      {'country': 'Germany', 'zip_code': 58452, 'city': 'Witten', 'latitude': 51.4370171, 'longitude': 7.335124},
      {'country': 'Germany', 'zip_code': 44135, 'city': 'Dortmund', 'latitude': 51.5142273, 'longitude': 7.4652789},
      {'country': 'Germany', 'zip_code': 47055, 'city': 'Duisburg', 'latitude': 51.434999, 'longitude': 6.759562},
      {'country': 'Germany', 'zip_code': 50667, 'city': 'Köln', 'latitude': 50.938361, 'longitude': 6.959974},
      {'country': 'Germany', 'zip_code': 80331, 'city': 'Munih', 'latitude': 48.1371079, 'longitude': 11.5753822}
    ];
  }

  ngOnInit() {
    this.initializeForm();
    this.markers = this.getLocations(); // original list of markers data

    this.mapsAPILoader.load().then(() => {

      const center = new google.maps.LatLng(this.lat, this.lng);
      // markers located within 50 km distance from center are included
      this.filteredMarkers = this.markers.filter(m => {
        this.getLocation(m.zip_code + ' ' + m.country);

        const markerLoc = new google.maps.LatLng(m.latitude, m.longitude);
        const distanceInKm = google.maps.geometry.spherical.computeDistanceBetween(markerLoc, center) / 1000;
        if (distanceInKm < 50.0) {
          this.result.push(m);
          return m;
        }
      });

      console.log('count in distance: ' + this.result.length);
    });
  }

  initializeForm(){
    this.detailForm = this.fb.group({
      projectPlace: new FormControl(),
      lat: new FormControl(),
      lng: new FormControl(),
    });
  }

  getLocation(address) {
    const geocoder = new google.maps.Geocoder();

    let lat = '';
    let lng = '';
    geocoder.geocode({'address': address}, function (results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          lat = results[0].geometry.location.lat();
          lng = results[0].geometry.location.lng();
          console.log('latitude: ' + lat + ' long : ' + lng);
          console.log('zip code: ' + results[0].address_components[0].long_name + ' state: ' + results[0].address_components[1].long_name);
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      }
    );
  }

  public handleAddressChange(address: Address) {
    this.detailForm.patchValue({
      projectPlace: address.formatted_address
    });
    this.detailForm.patchValue({
      lat: address.geometry.location.lat()
    });
    this.detailForm.patchValue({
      lng: address.geometry.location.lng()
    });
  }

}
