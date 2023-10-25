import { Component, Input, SimpleChange } from '@angular/core';

@Component({
  selector: 'app-system-message',
  templateUrl: './system-message.component.html',
  styleUrls: ['./system-message.component.scss']
})
export class SystemMessageComponent {
  @Input() message: string;
  @Input() messageType: string;

  ngOnChanges(changes: { [propName: string]: SimpleChange }) {
    if (changes['messageType']) {
      const newMessageType = changes['messageType'].currentValue;
      console.log('messageType changed to:', newMessageType);
    }
  }
}
