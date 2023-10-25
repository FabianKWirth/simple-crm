import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-system-message',
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.scss']
})
export class SystemMessageComponent {
  @Input() message: string;
  @Input() messageType: string;

  

}
