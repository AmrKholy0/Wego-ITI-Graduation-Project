import {
  Injectable,
  OnDestroy,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { HttpClient, HttpParams } from '@angular/common/http';
import { forkJoin, map, Observable, Subscription } from 'rxjs';
import { Flight } from '../_models/Flight/flight';
import { PostFlight } from '../_models/Flight/post-flight';
import { PutFlight } from '../_models/Flight/put-flight';
import { RoundTrip } from '../_models/Flight/round-trip';
import { FlightRequestParams } from '../_models/Flight/flight-request-params';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root',
})
export class FlightService implements OnInit, OnDestroy {
  isRoundTrip: boolean = true;
  private departFlights: Flight[] | null = null;
  private returnFlights: Flight[] | null = null;
  private baseUrl = environment.apiUrl + 'flights';

  public isFormError: boolean = false;

  public oneWayTrips: Flight[] | null = null;
  public roundTrips: RoundTrip[] | null = null;

  selectedFlight: WritableSignal<Flight | null> = signal(null);
  selectedRoundTrip: WritableSignal<RoundTrip | null> = signal(null);

  sub: Subscription | null = null;

  constructor(public http: HttpClient) {}

  ngOnInit(): void {}
  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  public getOneWayList(reqParamas: FlightRequestParams) {
    let params = new HttpParams()
      .set('departAirportId', reqParamas.departAirportId)
      .set('arrivalAirportId', reqParamas.arrivalAirportId)
      .set('departDate', reqParamas.departDate)
      .set('noOfSeats', reqParamas.noOfSeats)
      .set('seatClass', reqParamas.seatClass);

    return this.http.get<Flight[]>(this.baseUrl + '/SearchForTicket', { params });
  }

  public getRoundTripList(
    reqParamas: FlightRequestParams
  ): Observable<RoundTrip[] | null> {
    let departParams = new HttpParams()
      .set('departAirportId', reqParamas.departAirportId)
      .set('arrivalAirportId', reqParamas.arrivalAirportId)
      .set('departDate', reqParamas.departDate)
      .set('noOfSeats', reqParamas.noOfSeats)
      .set('seatClass', reqParamas.seatClass);

    let arrivalParams = new HttpParams()
      .set('departAirportId', reqParamas.arrivalAirportId)
      .set('arrivalAirportId', reqParamas.departAirportId)
      .set('departDate', reqParamas.returnDate!)
      .set('noOfSeats', reqParamas.noOfSeats)
      .set('seatClass', reqParamas.seatClass);

    return forkJoin([
      this.http.get<Flight[]>(this.baseUrl + '/searchForTicket', {
        params: departParams,
      }),
      this.http.get<Flight[]>(this.baseUrl + '/searchForTicket', {
        params: arrivalParams,
      }),
    ]).pipe(
      map(([departFlights, returnFlights]) => {
        this.departFlights = departFlights;
        this.returnFlights = returnFlights;

        this.roundTrips = this.createRoundTripList();

        return this.roundTrips;
      })
    );
  }

  private createRoundTripList(): RoundTrip[] | null {
    if (this.departFlights != null && this.returnFlights != null) {
      let trips: RoundTrip[] | null = [];

      this.departFlights.forEach((departFlight) => {
        this.returnFlights?.forEach((returnFlight) => {
          if (
            new Date(returnFlight.depart_date).getTime() >
            new Date(departFlight.arrival_date).getTime()
          )
            trips.push(new RoundTrip(departFlight, returnFlight));
        });
      });
      return trips;
    }
    return null;
  }

  private flightDetailsVisibility = new BehaviorSubject<boolean>(false);
  visibility$ = this.flightDetailsVisibility.asObservable();

  showOneWayDetails(flight: Flight) {
    this.selectedFlight.set(flight);
    this.showDetails();
  }
  showRoundTripDetails(roundTrip: RoundTrip) {
    this.selectedRoundTrip.set(roundTrip);
    this.showDetails();
  }
  private showDetails() {
    this.flightDetailsVisibility.next(true);
    document.body.classList.add('prevent-scroll');
  }

  hideFlightDetails() {
    this.flightDetailsVisibility.next(false);
    document.body.classList.remove('prevent-scroll');
  }

  convertMinutesToTime(minutes: number | undefined): string {
    const hours = Math.floor(minutes! / 60);
    const remainingMinutes = minutes! % 60;
    return `${this.pad(hours)}h ${this.pad(remainingMinutes)}m`;
  }
  pad(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  addNewFlight(formData: PostFlight) {
    return this.http.post<PostFlight>(this.baseUrl, formData);
  }
  updateFlight(id: number, formData: PutFlight) {
    return this.http.put<PutFlight>(this.baseUrl + '/' + id, formData);
  }
  getFlight(id: number) {
    return this.http.get<PutFlight>(this.baseUrl + '/' + id);
  }
  deleteFlight(id: number) {
    return this.http.delete<PutFlight>(this.baseUrl + '/' + id);
  }
  getAll() {
    return this.http.get<Flight[]>(this.baseUrl + '/all');
  }
}
