import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent {
  
  mostrarprod=false
  mostrarventas=false
  mostrarreporte=false
  toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const toggleBtn = document.querySelector('.toggle-btn');
    sidebar?.classList.toggle('collapsed');
    toggleBtn?.classList.toggle('collapsed');
  }

 
 
  
}
