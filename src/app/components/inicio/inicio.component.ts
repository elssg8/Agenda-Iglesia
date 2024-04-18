import { Component, OnInit } from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { FirestoreService } from 'src/app/services/firestore.service';




@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit{

  //Create a form group to add an event
  public addEventForm: FormGroup = new FormGroup({});
  public eventObj: any;
  public eventData: any;

  public eventClicked: boolean = false;
  public dateClicked: boolean = false;
  public eventAdded: boolean = false;

  constructor(private fb: FormBuilder, private firestore: FirestoreService) {
  }

  ngOnInit(): void {
    this.initAddEventForm();
    this.eventObj = {};

    //get the events from the firestore
    this.getEvents();
  }

  initAddEventForm() {
    this.addEventForm = this.fb.group({
      title: ['', Validators.required],
      /* date: ['', Validators.required], */
      start: [this.getTimeLocal(), Validators.required],
      end: [this.getTimeLocal(), Validators.required],
      personName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      place: ['', Validators.required],
      notes: ['', Validators.required]
    });
  }

  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, listPlugin, timeGridPlugin, interactionPlugin],
    initialView: 'dayGridMonth',
    height: '100%',
    locale: 'es',
    dateClick: () => {
      this.dateClicked = true;
    }, // now dateClick should be recognized
    eventColor: 'green',
    //eventClick: this.handleEventClick.bind(this) y pasarle el evento
    eventClick: (info) => {
      this.eventObj = info.event;
      this.eventClicked = true;
    },
    headerToolbar: {
      start: 'dayGridMonth listDay,listWeek,listMonth',
      center: 'title',
      end: 'prevYear,prev,next,nextYear'
    },
    views: {
      listDay: { buttonText: ' Eventos del Dia' },
      listWeek: { buttonText: 'Eventos de la Semana' },
      listMonth: { buttonText: ' Eventos del Mes' },
      dayGridMonth: { buttonText: 'Calendario' },
    },
  };

  //Los eventos deben llevar lo siguiente
  /*
  Nombre del evento
  fecha
  hora de inicio
  hora de fin
  nombre de la persona que lo agendo
  numero de telefono
  lugar
  notas
  */

  addEvent() {
    //armar el objeto para el calendario con los datos del formulario usando el eventCalendar
    this.eventData = {
      title: this.addEventForm.value.title,
      start: this.addEventForm.value.start,
      end: this.addEventForm.value.end,
      extendedProps: {
        personName: this.addEventForm.value.personName,
        phoneNumber: this.addEventForm.value.phoneNumber,
        place: this.addEventForm.value.place,
        notes: this.addEventForm.value.notes
      }
    };

    //usar el servivio firestore para agregar el evento
    this.firestore.addEvent('agenda', this.eventData);
    this.getEvents();
    this.eventAdded = true;

    // Reset the form
    this.addEventForm.reset();
  }

  //recuperar los eventos de la base de datos
  getEvents() {
  this.firestore.getAllEvents('agenda').subscribe(data => {
    //console.log(data);
    this.calendarOptions.events = data;
  });
  }

  //editar un evento
  editEvent(id: string) {
    //armar el objeto para el calendario con los datos del formulario usando el eventCalendar
    this.eventData = {

      title: this.addEventForm.value.title,
      start: this.addEventForm.value.start,
      end: this.addEventForm.value.end,
      extendedProps: {
        personName: this.addEventForm.value.personName,
        phoneNumber: this.addEventForm.value.phoneNumber,
        place: this.addEventForm.value.place,
        notes: this.addEventForm.value.notes
      }
    };

    //usar el servivio firestore para editar el evento
    this.firestore.editEvent('agenda', id, this.eventData);
    this.getEvents();
    this.eventAdded = true;

    // Reset the form
    this.addEventForm.reset();
  }

  //eliminar un evento
  deleteEvent() {
    //usar el servivio firestore para eliminar el evento
    this.firestore.deleteEvent('agenda', this.eventObj.id);
    this.getEvents();
    this.eventClicked = false;
    alert('Evento eliminado')
  }

  closeModal() {
    this.dateClicked = false;
    this.eventClicked = false;
  }

  getTimeLocal(){
    //Funcion para obtener la hora y fecha actual en el formato 2024-04-16T16:00 y pasarla al input
    let date = new Date();
    let datePipe = new DatePipe('en-US');

    let formattedDate = datePipe.transform(date, 'yyyy-MM-ddTHH:mm');
    console.log(formattedDate);
    return formattedDate;
  }
}


