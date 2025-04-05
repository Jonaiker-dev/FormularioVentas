import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  public FormVentas:FormGroup;
  private Webhook_URL="https://script.google.com/macros/s/AKfycbzMXhfWtfI1ze1Bl09zsP4Ey22raQoOiaV7MwxGJB8coTsHab58WZNfAiaOev3Vlu6ghg/exec"
  submissionStatus:String=''
  constructor(private fb:FormBuilder,private http:HttpClient){
    this.FormVentas=this.fb.group({
      categoria: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      precio: ['', Validators.required],
      metodo: ['', Validators.required],
      vendedor: ['', Validators.required]
    })

  }

  Enviar(){
    
    if (this.FormVentas.valid) {
      this.submissionStatus = 'Enviando datos...';
      this.http.post(this.Webhook_URL, this.FormVentas.value)
        .subscribe(
          (response: any) => {
            this.submissionStatus = 'Datos enviados correctamente';
            console.log('Respuesta del webhook:', response);
            this.FormVentas.reset(); // Opcional: Limpiar el formulario
          },
          (error) => {
            this.submissionStatus = 'Error al enviar los datos';
            console.error('Error del webhook:', error);
          }
        );
    } else {
      this.submissionStatus = 'Por favor, completa todos los campos correctamente.';
    }
    console.log(this.submissionStatus);
  }
  

}
